import {HttpClient} from 'aurelia-fetch-client';
import {Rest} from './rest';

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
   * @param {{}}              [options]         {trailingSlash: false}
   *
   * @see http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration
   * @return {Config}
   */
  registerEndpoint(name, configureMethod, defaults, options) {
    let newClient        = new HttpClient();
    this.endpoints[name] = new Rest(newClient, name);

    // set custom defaults to Rest
    if (defaults !== undefined) {
      this.endpoints[name].defaults = defaults;
    }

    // set custom optiions to Rest
    if (options !== undefined) {
      extend(this.endpoints[name].options, options);
    }

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
