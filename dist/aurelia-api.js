import extend from 'extend';
import {HttpClient} from 'aurelia-fetch-client';
import {resolver} from 'aurelia-dependency-injection';
import {buildQueryString} from 'aurelia-path';

export function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config);

  configCallback(config);
}

/**
 * Config class. Configures and stores endpoints
 */
export class Config {
  /**
   * Collection of configures endpionts
   * @param {Object} Key: endpoint name, value: Rest client
   */
  endpoints       = {};

  /**
   * Current default endpoint if set
   * @param {[Rest]} Default Rest client
   */
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
   * @param {string} [name] Endpoint bame. Returns default endpoint when not set.
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
   * @param {string} name The endpoint name
   *
   * @return {boolean}
   */
  endpointExists(name) {
    return !!this.endpoints[name];
  }

  /**
   * Set a previously registered endpoint as the default.
   *
   * @param {string} name The endpoint name
   *
   * @return {Config}
   */
  setDefaultEndpoint(name) {
    this.defaultEndpoint = this.getEndpoint(name);

    return this;
  }
}

/**
 * Endpoint class. A resolver for endpoints which allows injection of the corresponding Rest client into a class
 */
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
   * @return {Rest}
   */
  get(container) {
    return container.get(Config).getEndpoint(this._key);
  }

  /**
   * Get a new resolver for `key`.
   *
   * @param {string} key  The endpoint name
   *
   * @return {Endpoint}  Resolves to the Rest client for this endpoint
   */
  static of(key) {
    return new Endpoint(key);
  }
}

/**
 * Rest class. A simple rest client to fetch resources
 */
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
   * @param {HttpClient} httpClient The httpClient to use
   * @param {string}     [endpoint] The endpoint name
   */
  constructor(httpClient, endpoint) {
    this.client   = httpClient;
    this.endpoint = endpoint;
  }

  /**
   * Make a request to the server.
   *
   * @param {string} method     The fetch method
   * @param {string} path       Path to the resource
   * @param {{}}     [body]     The body to send if applicable
   * @param {{}}     [options]  Fetch options overwrites
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  request(method, path, body, options = {}) {
    let requestOptions = extend(true, {headers: {}}, this.defaults, options, {method, body});

    let contentType = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

    if (typeof body === 'object' && contentType) {
      requestOptions.body = contentType.toLowerCase() === 'application/json'
                          ? JSON.stringify(body)
                          : buildQueryString(body);
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
   * @param {string}           resource  Resource to find in
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  find(resource, criteria, options) {
    return this.request('GET', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource  Resource to create
   * @param {{}}     body      The data to post (as Object)
   * @param {{}}     [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
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
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  update(resource, criteria, body, options) {
    return this.request('PUT', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Patch a resource.
   *
   * @param {string}           resource  Resource to patch
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {object}           body      Data to patch for provided criteria.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  patch(resource, criteria, body, options) {
    return this.request('PATCH', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource  The resource to delete
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  destroy(resource, criteria, options) {
    return this.request('DELETE', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource  The resource to create
   * @param {{}}     body      The data to post (as Object)
   * @param {{}}     [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  create(resource, body, options) {
    return this.post(...arguments);
  }
}

function getRequestPath(resource, criteria) {
  return (criteria !== undefined && criteria !== null
    ? resource + (typeof criteria !== 'object' ? `/${criteria}` : '?' + buildQueryString(criteria))
    : resource);
}
