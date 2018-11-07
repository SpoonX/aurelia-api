import {buildQueryString,join} from 'aurelia-path';
import {HttpClient,HttpClientConfiguration} from 'aurelia-fetch-client';
import {Container,resolver} from 'aurelia-dependency-injection';

/**
 * Represents the options to use when constructing a `Rest` instance.
 */
export declare interface RestOptions {
  
  /**
     * `true` to use the traditional URI template standard (RFC6570) when building
     * query strings from criteria objects, `false` otherwise. Default is `false`.
     * NOTE: maps to `useTraditionalUriTemplates` parameter on `Rest` constructor.
     *
     * @type {boolean}
     */
  useTraditionalUriTemplates?: boolean;
}

/**
 * Rest class. A simple rest client to fetch resources
 */
export declare class Rest {
  
  /**
     * The defaults to apply to any request
     *
     * @param {{}} defaults The default fetch request options
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
     * true to use the traditional URI template standard (RFC6570) when building
     * query strings from criteria objects, false otherwise. Default is false.
     *
     * @param {boolean} useTraditionalUriTemplates The flag that enables RFC6570 URI templates.
     */
  useTraditionalUriTemplates: boolean;
  
  /**
     * Inject the httpClient to use for requests.
     *
     * @param {HttpClient} httpClient                    The httpClient to use
     * @param {string}     endpoint                      The endpoint name
     * @param {boolean}    [useTraditionalUriTemplates]  true to use the traditional URI
     *                                                   template standard (RFC6570) when building
     *                                                   query strings from criteria objects, false
     *                                                   otherwise. Default is false.
     */
  constructor(httpClient: HttpClient, endpoint: string, useTraditionalUriTemplates?: boolean);
  
  /**
     * Make a request to the server.
     *
     * @param {string}          method     The fetch method
     * @param {string}          path       Path to the resource
     * @param {{}}              [body]     The body to send if applicable
     * @param {{}}              [options]  Fetch request options overwrites
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  request(method: string, path: string, body?: {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Find a resource.
     *
     * @param {string}                    resource  Resource to find in
     * @param {string|number|{}}          idOrCriteria  Object for where clause, string / number for id.
     * @param {{}}                        [options] Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  find(resource: string, idOrCriteria?: string | number | {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Find a resource.
     *
     * @param {string}           resource    Resource to find in
     * @param {string|number}    id          String / number for id to be added to the path.
     * @param {{}}               [criteria]  Object for where clause
     * @param {{}}               [options]   Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  findOne(resource: string, id: string | number, criteria?: {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Create a new instance for resource.
     *
     * @param {string}           resource  Resource to create
     * @param {{}}               [body]    The data to post (as Object)
     * @param {{}}               [options] Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  post(resource: string, body?: {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Update a resource.
     *
     * @param {string}           resource  Resource to update
     * @param {string|number|{}} idOrCriteria  Object for where clause, string / number for id.
     * @param {{}}               [body]    New data for provided idOrCriteria.
     * @param {{}}               [options] Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  update(resource: string, idOrCriteria?: string | number | {}, body?: {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Update a resource.
     *
     * @param {string}           resource   Resource to update
     * @param {string|number}    id         String / number for id to be added to the path.
     * @param {{}}               [criteria] Object for where clause
     * @param {{}}               [body]     New data for provided criteria.
     * @param {{}}               [options]  Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  updateOne(resource: string, id: string | number, criteria?: {}, body?: {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Patch a resource.
    *
     * @param {string}           resource   Resource to patch
     * @param {string|number|{}} [idOrCriteria] Object for where clause, string / number for id.
     * @param {{}}               [body]     Data to patch for provided idOrCriteria.
     * @param {{}}               [options]  Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  patch(resource: string, idOrCriteria?: string | number | {}, body?: {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Patch a resource.
     *
     * @param {string}           resource   Resource to patch
     * @param {string|number}    id         String / number for id to be added to the path.
     * @param {{}}               [criteria] Object for where clause
     * @param {{}}               [body]     Data to patch for provided criteria.
     * @param {{}}               [options]  Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  patchOne(resource: string, id: string | number, criteria?: {}, body?: {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Delete a resource.
     *
     * @param {string}           resource   The resource to delete
     * @param {string|number|{}} [idOrCriteria] Object for where clause, string / number for id.
     * @param {{}}               [options]  Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  destroy(resource: string, idOrCriteria?: string | number | {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Delete a resource.
     *
     * @param {string}           resource   The resource to delete
     * @param {string|number}    id         String / number for id to be added to the path.
     * @param {{}}               [criteria] Object for where clause
     * @param {{}}               [options]  Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>|Promise<Error>} Server response as Object
     */
  destroyOne(resource: string, id: string | number, criteria?: {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
  
  /**
     * Create a new instance for resource.
     *
     * @param {string}           resource  The resource to create
     * @param {{}}               [body]    The data to post (as Object)
     * @param {{}}               [options] Extra request options.
     * @param {{ response: Response}}              [responseOutput]  reference output for Response object
     *
     * @return {Promise<*>} Server response as Object
     */
  create(resource: string, body?: {}, options?: {}, responseOutput?: { response: Response }): Promise<any | Error>;
}

/**
 * Config class. Configures and stores endpoints
 */
/**
 * Config class. Configures and stores endpoints
 */
export declare class Config {
  
  /**
     * Collection of configures endpoints
     *
     * @param {{}} Key: endpoint name; value: Rest client
     */
  endpoints: { [key: string]: Rest };
  
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
     * @param {RestOptions}     [restOptions]     Options to pass when constructing the Rest instance.
     *
     * @see http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration
     * @return {Config} this Fluent interface
     * @chainable
     */
  registerEndpoint(name: string, configureMethod?: string | Function, defaults?: {}, restOptions?: RestOptions): Config;
  
  /**
     * Get a previously registered endpoint. Returns null when not found.
     *
     * @param {string} [name] The endpoint name. Returns default endpoint when not set.
     *
     * @return {Rest|null}
     */
  getEndpoint(name?: string): Rest;
  
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
     * @return {Config} this Fluent interface
     * @chainable
     */
  setDefaultEndpoint(name: string): Config;
  
  /**
     * Set a base url for all endpoints
     *
     * @param {string} baseUrl The url for endpoints to append
     *
     * @return {Config} this Fluent interface
     * @chainable
     */
  setDefaultBaseUrl(baseUrl: string): Config;
  
  /**
     * Configure with an object
     *
     * @param {{}} config The configuration object
     *
     * @return {Config} this Fluent interface
     * @chainable
     */
  configure(config: { defaultEndpoint: string, defaultBaseUrl: string, endpoints: Array<{ name: string, endpoint: string, config: {}, default: boolean }> }): Config;
}

/**
 * Plugin configure
 *
 * @export
 * @param {{ container: Container}} frameworkConfig
 * @param {({defaultEndpoint: string, defaultBaseUrl: string, endpoints: Array<{name: string, endpoint: string, config: RequestInit, default: boolean}>} | function(config: Config): void)} configOrConfigure
 */
export declare function configure(frameworkConfig: { container: Container }, configOrConfigure: { defaultEndpoint: string, defaultBaseUrl: string, endpoints: Array<{ name: string, endpoint: string, config: RequestInit, default: boolean }> } | ((config: Config) => void)): any;

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
     * @param {string} [key]  The endpoint name
     *
     * @return {Endpoint}  Resolves to the Rest client for this endpoint
     */
  static of(key?: string): Rest;
}