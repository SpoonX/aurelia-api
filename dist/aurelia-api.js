import extend from 'extend';
import {buildQueryString,join} from 'aurelia-path';
import {HttpClient} from 'aurelia-fetch-client';
import {Container,resolver} from 'aurelia-dependency-injection';


/**
 * Rest class. A simple rest client to fetch resources
 */
export class Rest {
  /**
   * The defaults to apply to any request
   *
   * @param {{}} defaults The default fetch request options
   */
  defaults: {} = {
    headers: {
      'Accept'      : 'application/json',
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
   * @param {string}     endpoint   The endpoint name
   */
  constructor(httpClient: HttpClient, endpoint: string) {
    this.client   = httpClient;
    this.endpoint = endpoint;
  }

  /**
   * Make a request to the server.
   *
   * @param {string}          method     The fetch method
   * @param {string}          path       Path to the resource
   * @param {{}}              [body]     The body to send if applicable
   * @param {{}}              [options]  Fetch request options overwrites
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  request(method: string, path: string, body?: {}, options?: {}): Promise<any|Error> {
    let requestOptions = extend(true, {headers: {}}, this.defaults, options || {}, {method, body});
    let contentType    = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

    if (typeof body === 'object' && body !== null && contentType) {
      requestOptions.body = (/^application\/json/).test(contentType.toLowerCase())
                          ? JSON.stringify(body)
                          : buildQueryString(body);
    }

    return this.client.fetch(path, requestOptions).then((response: Response) => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(() => null);
      }

      throw response;
    });
  }

  /**
   * Find a resource.
   *
   * @param {string}                    resource  Resource to find in
   * @param {{}|string|number}          criteria  Object for where clause, string / number for id.
   * @param {{}}                        [options] Extra request options.
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  find(resource: string, criteria?: {}|string|number, options?: {}): Promise<any|Error> {
    return this.request('GET', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Find a resource.
   *
   * @param {string}           resource    Resource to find in
   * @param {string|number}    id          String / number for id to be added to the path.
   * @param {{}}               [criteria]  Object for where clause
   * @param {{}}               [options]   Extra request options.
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  findOne(resource: string, id: string|number, criteria?: {}, options?: {}): Promise<any|Error> {
    return this.request('GET', getRequestPath(resource, id, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string}           resource  Resource to create
   * @param {{}}               [body]    The data to post (as Object)
   * @param {{}}               [options] Extra request options.
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  post(resource: string, body?: {}, options?: {}): Promise<any|Error> {
    return this.request('POST', resource, body, options);
  }

  /**
   * Update a resource.
   *
   * @param {string}           resource  Resource to update
   * @param {{}|string|number} criteria  Object for where clause, string / number for id.
   * @param {{}}               [body]    New data for provided criteria.
   * @param {{}}               [options] Extra request options.
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  update(resource: string, criteria?: {}|string|number, body?: {}, options?: {}): Promise<any|Error> {
    return this.request('PUT', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Update a resource.
   *
   * @param {string}           resource   Resource to update
   * @param {string|number}    id         String / number for id to be added to the path.
   * @param {{}}               [criteria] Object for where clause
   * @param {{}}               [body]     New data for provided criteria.
   * @param {{}}               [options]  Extra request options.
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  updateOne(resource: string, id: string|number, criteria?: {}, body?: {}, options?: {}): Promise<any|Error> {
    return this.request('PUT', getRequestPath(resource, id, criteria), body, options);
  }

  /**
   * Patch a resource.
  *
   * @param {string}           resource   Resource to patch
   * @param {{}|string|number} [criteria] Object for where clause, string / number for id.
   * @param {{}}               [body]     Data to patch for provided criteria.
   * @param {{}}               [options]  Extra request options.
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  patch(resource: string, criteria?: {}|string|number, body?: {}, options?: {}): Promise<any|Error> {
    return this.request('PATCH', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Patch a resource.
   *
   * @param {string}           resource   Resource to patch
   * @param {string|number}    id         String / number for id to be added to the path.
   * @param {{}}               [criteria] Object for where clause
   * @param {{}}               [body]     Data to patch for provided criteria.
   * @param {{}}               [options]  Extra request options.
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  patchOne(resource: string, id: string|number, criteria?: {}, body?: {}, options?: {}): Promise<any|Error> {
    return this.request('PATCH', getRequestPath(resource, id, criteria), body, options);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource   The resource to delete
   * @param {{}|string|number} [criteria] Object for where clause, string / number for id.
   * @param {{}}               [options]  Extra request options.
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  destroy(resource: string, criteria?: {}|string|number, options?: {}): Promise<any|Error> {
    return this.request('DELETE', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource   The resource to delete
   * @param {string|number}    id         String / number for id to be added to the path.
   * @param {{}}               [criteria] Object for where clause
   * @param {{}}               [options]  Extra request options.
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  destroyOne(resource: string, id: string|number, criteria?: {}, options?: {}): Promise<any|Error> {
    return this.request('DELETE', getRequestPath(resource, id, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string}           resource  The resource to create
   * @param {{}}               [body]    The data to post (as Object)
   * @param {{}}               [options] Extra request options.
   *
   * @return {Promise<*>} Server response as Object
   */
  create(resource: string, body?: {}, options?: {}): Promise<any|Error> {
    return this.post(resource, body, options);
  }
}

/**
 * getRequestPath
 *
 * @param {string} resource
 * @param {(string|number|{})} [idOrCriteria]
 * @param {{}} [criteria]
 * @returns {string}
 */
function getRequestPath(resource: string, idOrCriteria?: string|number|{}, criteria?: {}) {
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
   * Collection of configures endpoints
   *
   * @param {{}} Key: endpoint name; value: Rest client
   */
  endpoints: {[key: string]: Rest} = {};

  /**
   * Current default endpoint if set
   *
   * @param {Rest} defaultEndpoint The Rest client
   */
  defaultEndpoint: Rest;

   /**
    * Current default baseUrl if set
    *
    * @param {string} defaultBaseUrl The Rest client
    */
  defaultBaseUrl: string;

  /**
   * Register a new endpoint.
   *
   * @param {string}          name              The name of the new endpoint.
   * @param {Function|string} [configureMethod] Endpoint url or configure method for client.configure().
   * @param {{}}              [defaults]        New defaults for the HttpClient
   *
   * @see http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration
   * @return {Config} this Fluent interface
   * @chainable
   */
  registerEndpoint(name: string, configureMethod?: string|Function, defaults?: {}): Config {
    let newClient = new HttpClient();

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
   * @return {Config} this Fluent interface
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
   * @return {Config} this Fluent interface
   * @chainable
   */
  setDefaultBaseUrl(baseUrl: string): Config {
    this.defaultBaseUrl = baseUrl;

    return this;
  }

  /**
   * Configure with an object
   *
   * @param {{}} config The configuration object
   *
   * @return {Config} this Fluent interface
   * @chainable
   */
  configure(config: {defaultEndpoint: string, defaultBaseUrl: string, endpoints: Array<{name: string, endpoint: string, config: {}, default: boolean}>}): Config {
    if (config.defaultBaseUrl) {
      this.defaultBaseUrl = config.defaultBaseUrl;
    }

    config.endpoints.forEach(endpoint => {
      this.registerEndpoint(endpoint.name, endpoint.endpoint, endpoint.config);

      if (endpoint.default) {
        this.setDefaultEndpoint(endpoint.name);
      }
    });

    if (config.defaultEndpoint) {
      this.setDefaultEndpoint(config.defaultEndpoint);
    }

    return this;
  }
}

/**
 * Plugin configure
 *
 * @export
 * @param {{ container: Container}} frameworkConfig
 * @param {({defaultEndpoint: string, defaultBaseUrl: string, endpoints: Array<{name: string, endpoint: string, config: RequestInit, default: boolean}>} | function(config: Config): void)} configOrConfigure
 */
export function configure(
  frameworkConfig: {container: Container},
  configOrConfigure: {defaultEndpoint: string, defaultBaseUrl: string, endpoints: Array<{name: string, endpoint: string, config: RequestInit, default: boolean}>} | ((config: Config) => void)
) {
  let config = frameworkConfig.container.get(Config);

  if (typeof configOrConfigure === 'function') {
    configOrConfigure(config);

    return;
  }

  config.configure(configOrConfigure);
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
