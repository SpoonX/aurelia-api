import {buildQueryString,join} from 'aurelia-path';
import {HttpClient} from 'aurelia-fetch-client';
import {Aurelia} from 'aurelia-framework';
import {Container,resolver} from 'aurelia-dependency-injection';

/**
 * Rest class. A simple rest client to fetch resources
 */
export declare class Rest {
  
  /**
     * The defaults to apply to any request
     *
     * @param {{}} defaults The fetch client options
     */
  defaults: {};
  
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
  constructor(httpClient: HttpClient, endpoint: string);
  
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
  request(method: string, path: string, body?: {}, options?: {}): Promise<any | Error>;
  
  /**
     * Find a resource.
     *
     * @param {string}           resource  Resource to find in
     * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
     * @param {{}}               [options] Extra fetch options.
     *
     * @return {Promise<any>|Promise<Error>} Server response as Object
     */
  find(resource: string, criteria?: {} | string | Number, options?: {}): Promise<any | Error>;
  
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
  findOne(resource: string, id: string | Number, criteria?: {}, options?: {}): Promise<any | Error>;
  
  /**
     * Create a new instance for resource.
     *
     * @param {string} resource  Resource to create
     * @param {{}}     body      The data to post (as Object)
     * @param {{}}     [options] Extra fetch options.
     *
     * @return {Promise<any>|Promise<Error>} Server response as Object
     */
  post(resource: string, body?: {}, options?: {}): Promise<any | Error>;
  
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
  update(resource: string, criteria?: {} | string | Number, body?: {}, options?: {}): Promise<any | Error>;
  
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
  updateOne(resource: string, id: string | number, criteria?: {}, body?: {}, options?: {}): Promise<any | Error>;
  
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
  patch(resource: string, criteria?: {} | string | Number, body?: {}, options?: {}): Promise<any | Error>;
  
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
  patchOne(resource: string, id: string | Number, criteria?: {}, body?: {}, options?: {}): Promise<any | Error>;
  
  /**
     * Delete a resource.
     *
     * @param {string}           resource  The resource to delete
     * @param {{}|string|Number} criteria  Object for where clause, string / number for id.
     * @param {{}}               [options] Extra fetch options.
     *
     * @return {Promise<any>|Promise<Error>} Server response as Object
     */
  destroy(resource: string, criteria?: {} | string | Number, options?: {}): Promise<any | Error>;
  
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
  destroyOne(resource: string, id: string | Number, criteria?: {}, options?: {}): Promise<any | Error>;
  
  /**
     * Create a new instance for resource.
     *
     * @param {string} resource  The resource to create
     * @param {{}}     body      The data to post (as Object)
     * @param {{}}     [options] Extra fetch options.
     *
     * @return {Promise<any>|Promise<Error>} Server response as Object
     */
  create(resource: string, body?: {}, options?: {}): Promise<any | Error>;
}

/**
 * Config class. Configures and stores endpoints
 */
export declare class Config {
  
  /**
     * Collection of configures endpionts
     *
     * @param {{}} Key: endpoint name, value: Rest client
     */
  endpoints: {};
  
  /**
     * Current default endpoint if set
     *
     * @param {Rest|null} defaultEndpoint The Rest client
     */
  defaultEndpoint: Rest;
  
  /**
      * Current default baseUrl if set
      *
      * @ param {string|null} defaultBaseUrl The Rest client
      */
  defaultBaseUrl: string;
  
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
  registerEndpoint(name: string, configureMethod?: string | Function, defaults?: {}): Config;
  
  /**
     * Get a previously registered endpoint. Returns null when not found.
     *
     * @param {string} [name] The endpoint name. Returns default endpoint when not set.
     *
     * @return {Rest|null}
     */
  getEndpoint(name: string): Rest;
  
  /**
     * Check if an endpoint has been registered.
     *
     * @param {string} name The endpoint name
     *
     * @return {boolean}
     */
  endpointExists(name: string): boolean;
  
  /**
     * Set a previously registered endpoint as the default.
     *
     * @param {string} name The endpoint name
     *
     * @return {Config}
     * @chainable
     */
  setDefaultEndpoint(name: string): Config;
  
  /**
     * Set a base url for all endpoints
     *
     * @param {string} baseUrl The url for endpoints to append
     *
     * @return {Config}
     * @chainable
     */
  setDefaultBaseUrl(baseUrl: string): Config;
}
export declare function configure(aurelia: Aurelia, configCallback: Function): void;

/**
 * Endpoint class. A resolver for endpoints which allows injection of the corresponding Rest client into a class
 */
export declare class Endpoint {
  
  /**
     * Construct the resolver with the specified key.
     *
     * @param {string} key
     */
  constructor(key: string);
  
  /**
     * Resolve for key.
     *
     * @param {Container} container
     *
     * @return {Rest}
     */
  get(container: Container): Rest;
  
  /**
     * Get a new resolver for `key`.
     *
     * @param {string} key  The endpoint name
     *
     * @return {Endpoint}  Resolves to the Rest client for this endpoint
     */
  static of(key: string): Endpoint;
}