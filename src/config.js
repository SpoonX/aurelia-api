import {HttpClient} from 'aurelia-fetch-client';
import {Rest} from './rest';

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


  /**
   * Configure with an object
   *
   * @param {{}} config The configuration obejct
   *
   * @return {Config}
   * @chainable
   */
  configure(config: {}): Config {
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
