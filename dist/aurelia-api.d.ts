import extend from 'extend';
import {
  HttpClient
} from 'aurelia-fetch-client';
import {
  resolver
} from 'aurelia-dependency-injection';
import {
  buildQueryString
} from 'aurelia-path';
export declare function configure(aurelia?: any, configCallback?: any): any;

/**
 * Config class. Configures and stores endpoints
 */
export declare class Config {
  
  /**
     * Collection of configures endpionts
     * @param {Object} Key: endpoint name, value: Rest client
     */
  endpoints: any;
  
  /**
     * Current default endpoint if set
     * @param {[Rest]} Default Rest client
     */
  defaultEndpoint: any;
  
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
  registerEndpoint(name?: any, configureMethod?: any, defaults?: any): any;
  
  /**
     * Get a previously registered endpoint. Returns null when not found.
     *
     * @param {string} [name] Endpoint bame. Returns default endpoint when not set.
     *
     * @return {Rest|null}
     */
  getEndpoint(name?: any): any;
  
  /**
     * Check if an endpoint has been registered.
     *
     * @param {string} name The endpoint name
     *
     * @return {boolean}
     */
  endpointExists(name?: any): any;
  
  /**
     * Set a previously registered endpoint as the default.
     *
     * @param {string} name The endpoint name
     *
     * @return {Config}
     */
  setDefaultEndpoint(name?: any): any;
}

/**
 * Endpoint class. A resolver for endpoints which allows injection of the corresponding Rest client into a class
 */
export declare class Endpoint {
  
  /**
     * Construct the resolver with the specified key.
     *
     * @param {string} key
     */
  constructor(key?: any);
  
  /**
     * Resolve for key.
     *
     * @param {Container} container
     *
     * @return {Rest}
     */
  get(container?: any): any;
  
  /**
     * Get a new resolver for `key`.
     *
     * @param {string} key  The endpoint name
     *
     * @return {Endpoint}  Resolves to the Rest client for this endpoint
     */
  static of(key?: any): any;
}

/**
 * Rest class. A simple rest client to fetch resources
 */
export declare class Rest {
  defaults: any;
  
  /**
     * Inject the httpClient to use for requests.
     *
     * @param {HttpClient} httpClient The httpClient to use
     * @param {string}     [endpoint] The endpoint name
     */
  constructor(httpClient?: any, endpoint?: any);
  
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
  request(method?: any, path?: any, body?: any, options?: any): any;
  
  /**
     * Find a resource.
     *
     * @param {string}           resource  Resource to find in
     * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
     * @param {{}}               [options] Extra fetch options.
     *
     * @return {Promise<Object>|Promise<Error>} Server response as Object
     */
  find(resource?: any, criteria?: any, options?: any): any;
  
  /**
     * Create a new instance for resource.
     *
     * @param {string} resource  Resource to create
     * @param {{}}     body      The data to post (as Object)
     * @param {{}}     [options] Extra fetch options.
     *
     * @return {Promise<Object>|Promise<Error>} Server response as Object
     */
  post(resource?: any, body?: any, options?: any): any;
  
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
  update(resource?: any, criteria?: any, body?: any, options?: any): any;
  
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
  patch(resource?: any, criteria?: any, body?: any, options?: any): any;
  
  /**
     * Delete a resource.
     *
     * @param {string}           resource  The resource to delete
     * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
     * @param {{}}               [options] Extra fetch options.
     *
     * @return {Promise<Object>|Promise<Error>} Server response as Object
     */
  destroy(resource?: any, criteria?: any, options?: any): any;
  
  /**
     * Create a new instance for resource.
     *
     * @param {string} resource  The resource to create
     * @param {{}}     body      The data to post (as Object)
     * @param {{}}     [options] Extra fetch options.
     *
     * @return {Promise<Object>|Promise<Error>} Server response as Object
     */
  create(resource?: any, body?: any, options?: any): any;
}