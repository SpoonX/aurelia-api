import extend from 'extend';
import {buildQueryString,join} from 'aurelia-path';
import {HttpClient} from 'aurelia-fetch-client';
import {Aurelia} from 'aurelia-framework';
import {Container,resolver} from 'aurelia-dependency-injection';

/**
 * Rest class. A simple rest client to fetch resources
 */
export class Rest {

  /**
   * The defaults to apply to any request
   *
   * @param {{}} defaults The fetch client options
   */
  defaults: {} = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };

  /**
   * The client for the rest adapter
   *
   * @param {HttpClient} client The fetch client
   *
   */
  client: HttpClient;

  /**
   * The name of the endpoint it was registered under
   *
   * @param {string} endpoint The endpoint name
   */
  endpoint: string;

  /**
   * Inject the httpClient to use for requests.
   *
   * @param {HttpClient} httpClient The httpClient to use
   * @param {string}     [endpoint] The endpoint name
   */
  constructor(httpClient: HttpClient, endpoint: string) {
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
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  request(method: string, path: string, body?: {}, options?: {}): Promise<any|Error> {
    let requestOptions = extend(true, {headers: {}}, this.defaults, options || {}, {method, body});

    let contentType = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

    if (typeof body === 'object' && body !== null && contentType) {
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
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  find(resource: string, criteria?: {}|string|Number, options?: {}): Promise<any|Error> {
    return this.request('GET', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Find a resource.
   *
   * @param {string}           resource  Resource to find in
   * @param {string|Number}    id        String / number for id to be added to the path.
   * @param {{}}               criteria  Object for where clause
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  findOne(resource: string, id: string|Number, criteria?: {}, options?: {}): Promise<any|Error> {
    return this.request('GET', getRequestPath(resource, id, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource  Resource to create
   * @param {{}}     body      The data to post (as Object)
   * @param {{}}     [options] Extra fetch options.
   *
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  post(resource: string, body?: {}, options?: {}): Promise<any|Error> {
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
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  update(resource: string, criteria?: {}|string|Number, body?: {}, options?: {}): Promise<any|Error> {
    return this.request('PUT', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Update a resource.
   *
   * @param {string}           resource  Resource to update
   * @param {string|Number}    id        String / number for id to be added to the path.
   * @param {{}}               criteria  Object for where clause
   * @param {object}           body      New data for provided criteria.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  updateOne(resource: string, id: string|number, criteria?: {}, body?: {}, options?: {}): Promise<any|Error> {
    return this.request('PUT', getRequestPath(resource, id, criteria), body, options);
  }

  /**
   * Patch a resource.
   *
   * @param {string}           resource  Resource to patch
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {object}           body      Data to patch for provided criteria.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  patch(resource: string, criteria?: {}|string|Number, body?: {}, options?: {}): Promise<any|Error> {
    return this.request('PATCH', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Patch a resource.
   *
   * @param {string}           resource  Resource to patch
   * @param {string|Number}    id        String / number for id to be added to the path.
   * @param {{}}               criteria  Object for where clause
   * @param {object}           body      Data to patch for provided criteria.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  patchOne(resource: string, id: string|Number, criteria?: {}, body?: {}, options?: {}): Promise<any|Error> {
    return this.request('PATCH', getRequestPath(resource, id, criteria), body, options);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource  The resource to delete
   * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  destroy(resource: string, criteria?: {}|string|Number, options?: {}): Promise<any|Error> {
    return this.request('DELETE', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource  The resource to delete
   * @param {string|Number}    id        String / number for id to be added to the path.
   * @param {{}}               criteria  Object for where clause
   * @param {{}}               [options] Extra fetch options.
   *
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  destroyOne(resource: string, id: string|Number, criteria?: {}, options?: {}): Promise<any|Error> {
    return this.request('DELETE', getRequestPath(resource, id, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string} resource  The resource to create
   * @param {{}}     body      The data to post (as Object)
   * @param {{}}     [options] Extra fetch options.
   *
   * @return {Promise<any>|Promise<Error>} Server response as Object
   */
  create(resource: string, body?: {}, options?: {}): Promise<any|Error> {
    return this.post(...arguments);
  }
}

function getRequestPath(resource: string, idOrCriteria: string|Number|{}, criteria?: {}) {
  let hasSlash = resource.slice(-1) === '/';

  if (typeof idOrCriteria === 'string' || typeof idOrCriteria === 'number') {
    resource = `${join(resource, String(idOrCriteria))}${hasSlash ? '/' : ''}`;
  } else {
    criteria = idOrCriteria;
  }

  if (typeof criteria === 'object' && criteria !== null) {
    resource += `?${buildQueryString(criteria)}`;
  } else if (criteria) {
    resource += `${hasSlash ? '' : '/'}${criteria}${hasSlash ? '/' : ''}`;
  }

  return resource;
}

/**
 * Config class. Configures and stores endpoints
 */
export class Config {
  /**
   * Collection of configures endpionts
   *
   * @param {{}} Key: endpoint name, value: Rest client
   */
  endpoints: {} = {};

  /**
   * Current default endpoint if set
   *
   * @param {Rest|null} defaultEndpoint The Rest client
   */
  defaultEndpoint: Rest = null;


   /**
    * Current default baseUrl if set
    *
    * @ param {string|null} defaultBaseUrl The Rest client
    */
  defaultBaseUrl: string = null;

  /**
   * Register a new endpoint.
   *
   * @param {string}          name              The name of the new endpoint.
   * @param {function|string} [configureMethod] Endpoint url or configure method for client.configure().
   * @param {{}}              [defaults]        New defaults for the HttpClient
   *
   * @see http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration
   * @return {Config}
   * @chainable
   */
  registerEndpoint(name: string, configureMethod?: string|Function, defaults?: {}): Config {
    let newClient        = new HttpClient();
    this.endpoints[name] = new Rest(newClient, name);

    // set custom defaults to Rest
    if (defaults !== undefined) {
      this.endpoints[name].defaults = defaults;
    }

    // Manual configure of client.
    if (typeof configureMethod === 'function') {
      newClient.configure(configureMethod);

      return this;
    }

    // Base url is self / current host.
    if (typeof configureMethod !== 'string' && !this.defaultBaseUrl) {
      return this;
    }

    if (this.defaultBaseUrl && typeof configureMethod !== 'string' && typeof configureMethod !== 'function') {
      newClient.configure(configure => {
        configure.withBaseUrl(this.defaultBaseUrl);
      });

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
   * @param {string} [name] The endpoint name. Returns default endpoint when not set.
   *
   * @return {Rest|null}
   */
  getEndpoint(name: string): Rest {
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
  endpointExists(name: string): boolean {
    return !!this.endpoints[name];
  }

  /**
   * Set a previously registered endpoint as the default.
   *
   * @param {string} name The endpoint name
   *
   * @return {Config}
   * @chainable
   */
  setDefaultEndpoint(name: string): Config {
    this.defaultEndpoint = this.getEndpoint(name);

    return this;
  }

  /**
   * Set a base url for all endpoints
   *
   * @param {string} baseUrl The url for endpoints to append
   *
   * @return {Config}
   * @chainable
   */
  setDefaultBaseUrl(baseUrl: string): Config {
    this.defaultBaseUrl = baseUrl;

    return this;
  }
}

export function configure(aurelia: Aurelia, configCallback: Function): void {
  let config = aurelia.container.get(Config);

  configCallback(config);
}

/**
 * Endpoint class. A resolver for endpoints which allows injection of the corresponding Rest client into a class
 */
@resolver()
export class Endpoint {

  _key: string;

  /**
   * Construct the resolver with the specified key.
   *
   * @param {string} key
   */
  constructor(key: string) {
    this._key = key;
  }

  /**
   * Resolve for key.
   *
   * @param {Container} container
   *
   * @return {Rest}
   */
  get(container: Container): Rest {
    return container.get(Config).getEndpoint(this._key);
  }

  /**
   * Get a new resolver for `key`.
   *
   * @param {string} key  The endpoint name
   *
   * @return {Endpoint}  Resolves to the Rest client for this endpoint
   */
  static of(key: string): Endpoint {
    return new Endpoint(key);
  }
}
