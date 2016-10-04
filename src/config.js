import {HttpClient} from 'aurelia-fetch-client';
import {Rest} from './rest';

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
