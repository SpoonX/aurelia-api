declare module 'aurelia-api' {
  import qs from 'qs';
  import extend from 'extend';
  import {
    json,
    HttpClient
  } from 'aurelia-fetch-client';
  import {
    resolver
  } from 'aurelia-dependency-injection';
  export class Rest {
    defaults: any;
    
    /**
       * Inject the httpClient to use for requests.
       *
       * @param {HttpClient} httpClient
       */
    constructor(httpClient: any);
    
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
    request(method: any, path: any, body: any, options?: any): any;
    
    /**
       * Find a resource.
       *
       * @param {string}           resource Resource to find in
       * @param {{}|string|Number} criteria Object for where clause, string / number for id.
       * @param {{}}               [options] Extra fetch options.
       *
       * @return {Promise}
       */
    find(resource: any, criteria: any, options: any): any;
    
    /**
       * Create a new instance for resource.
       *
       * @param {string} resource
       * @param {{}}     body
       * @param {{}}     [options]
       *
       * @return {Promise}
       */
    post(resource: any, body: any, options: any): any;
    
    /**
       * Update a resource.
       *
       * @param {string}        resource  Resource to update
       * @param {string|Number} criteria  String / number of the id to update.
       * @param {object}        body      New data for provided criteria.
       * @param {{}}            [options]
       *
       * @return {Promise}
       */
    update(resource: any, criteria: any, body: any, options: any): any;
    
    /**
       * Delete a resource.
       *
       * @param {string}        resource  The resource to delete in
       * @param {string|Number} criteria  String / number of the id to delete.
       * @param {{}}            [options]
       *
       * @return {Promise}
       */
    destroy(resource: any, criteria: any, options: any): any;
    
    /**
       * Create a new instance for resource.
       *
       * @param {string} resource
       * @param {{}}     body
       * @param {{}}     [options]
       *
       * @return {Promise}
       */
    create(resource: any, body: any, options: any): any;
  }
  export class Config {
    endpoints: any;
    defaultEndpoint: any;
    
    /**
       * Register a new endpoint.
       *
       * @param {string}          name              The name of the new endpoint.
       * @param {function|string} [configureMethod] Configure method or endpoint.
       * @param {{}}              [defaults]        Defaults for the HttpClient
       *
       * @see http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration
       * @return {Config}
       */
    registerEndpoint(name: any, configureMethod: any, defaults?: any): any;
    
    /**
       * Get a previously registered endpoint. Returns null when not found.
       *
       * @param {string} [name] Returns default endpoint when not set.
       *
       * @return {Rest|null}
       */
    getEndpoint(name: any): any;
    
    /**
       * Check if an endpoint has been registered.
       *
       * @param {string} name
       *
       * @return {boolean}
       */
    endpointExists(name: any): any;
    
    /**
       * Set a previously registered endpoint as the default.
       *
       * @param {string} name
       *
       * @return {Config}
       */
    setDefaultEndpoint(name: any): any;
  }
  export class Endpoint {
    
    /**
       * Construct the resolver with the specified key.
       *
       * @param {string} key
       */
    constructor(key: any);
    
    /**
       * Resolve for key.
       *
       * @param {Container} container
       *
       * @return {*}
       */
    get(container: any): any;
    
    /**
       * Get a new resolver for `key`.
       *
       * @param {string} key
       *
       * @return {Endpoint}
       */
    static of(key: any): any;
  }
}