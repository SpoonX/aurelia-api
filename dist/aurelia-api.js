import qs from 'qs';
import extend from 'extend';
import {HttpClient} from 'aurelia-fetch-client';
import {resolver} from 'aurelia-dependency-injection';

export class Rest {

  defaults = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  /**
   * Inject the httpClient to use for requests.
   *
   * @param {HttpClient} httpClient
   * @param {string}     [endpoint]
   */
  constructor(httpClient, endpoint) {
    this.client   = httpClient;
    this.endpoint = endpoint;
  }

  /**
   * Make a request to the server.
   *
   * @param {string} method
   * @param {string} path
   * @param {{}}     [body]
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  request(method, path, body, options = {}) {
    let requestOptions = extend(true, {headers: {}}, this.defaults, options, {method, body});

    let contentType = requestOptions.headers['Content-Type'];

    if (typeof body === 'object' && contentType) {
      requestOptions.body = contentType.toLowerCase() === 'application/json'
                          ? JSON.stringify(body)
                          : qs.stringify(body);
    }

    return this.client.fetch(path, requestOptions).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(error => null);
      }

      throw response;
    });
  }

  /**
   * Find a resource.
   *
   * @param {string}           resource Resource to find in
   * @param {{}|string|Number} criteria Object for where clause, string / number for id.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise}
   */
  find(resource, criteria, options) {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${criteria}` : '?' + qs.stringify(criteria);
    }

    return this.request('GET', requestPath, undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource
   * @param {{}}     body
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  post(resource, body, options) {
    return this.request('POST', resource, body, options);
  }

  /**
   * Update a resource.
   *
   * @param {string}           resource  Resource to update
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {object}           body      New data for provided criteria.
   * @param {{}}               [options]
   *
   * @return {Promise}
   */
  update(resource, criteria, body, options) {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${criteria}` : '?' + qs.stringify(criteria);
    }

    return this.request('PUT', requestPath, body, options);
  }

  /**
   * Patch a resource.
   *
   * @param {string}           resource  Resource to patch
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {object}           body      Data to patch for provided criteria.
   * @param {{}}               [options]
   *
   * @return {Promise}
   */
  patch(resource, criteria, body, options) {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${criteria}` : '?' + qs.stringify(criteria);
    }

    return this.request('PATCH', requestPath, body, options);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource  The resource to delete in
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {{}}               [options]
   *
   * @return {Promise}
   */
  destroy(resource, criteria, options) {
    let requestPath = resource;

    if (criteria) {
      requestPath += typeof criteria !== 'object' ? `/${criteria}` : '?' + qs.stringify(criteria);
    }

    return this.request('DELETE', requestPath, undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource
   * @param {{}}     body
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  create(resource, body, options) {
    return this.post(...arguments);
  }
}

export class Config {
  endpoints       = {};
  defaultEndpoint = null;

  /**
   * Register a new endpoint.
   *
   * @param {string}          name              The name of the new endpoint.
   * @param {function|string} [configureMethod] Configure method or endpoint.
   * @param {{}}              [defaults]        New defaults for the HttpClient
   *
   * @see http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration
   * @return {Config}
   */
  registerEndpoint(name, configureMethod, defaults) {
    let newClient        = new HttpClient();
    this.endpoints[name] = new Rest(newClient, name);

    // set custom defaults to Rest
    if (defaults !== undefined) this.endpoints[name].defaults = defaults;

    // Manual configure of client.
    if (typeof configureMethod === 'function') {
      newClient.configure(configureMethod);

      return this;
    }

    // Base url is self.
    if (typeof configureMethod !== 'string') {
      return this;
    }

    // Base url is string. Configure.
    newClient.configure(configure => {
      configure.withBaseUrl(configureMethod);
    });

    return this;
  }

  /**
   * Get a previously registered endpoint. Returns null when not found.
   *
   * @param {string} [name] Returns default endpoint when not set.
   *
   * @return {Rest|null}
   */
  getEndpoint(name) {
    if (!name) {
      return this.defaultEndpoint || null;
    }

    return this.endpoints[name] || null;
  }

  /**
   * Check if an endpoint has been registered.
   *
   * @param {string} name
   *
   * @return {boolean}
   */
  endpointExists(name) {
    return !!this.endpoints[name];
  }

  /**
   * Set a previously registered endpoint as the default.
   *
   * @param {string} name
   *
   * @return {Config}
   */
  setDefaultEndpoint(name) {
    this.defaultEndpoint = this.getEndpoint(name);

    return this;
  }
}

@resolver()
export class Endpoint {

  /**
   * Construct the resolver with the specified key.
   *
   * @param {string} key
   */
  constructor(key) {
    this._key = key;
  }

  /**
   * Resolve for key.
   *
   * @param {Container} container
   *
   * @return {*}
   */
  get(container) {
    return container.get(Config).getEndpoint(this._key);
  }

  /**
   * Get a new resolver for `key`.
   *
   * @param {string} key
   *
   * @return {Endpoint}
   */
  static of(key) {
    return new Endpoint(key);
  }
}

function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config);

  configCallback(config);
}

export {
  configure,
  Config,
  Rest,
  Endpoint
};
