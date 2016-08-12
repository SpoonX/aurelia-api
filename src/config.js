import {HttpClient} from 'aurelia-fetch-client';
import {Rest} from './rest';
import extend from 'extend';

/**
 * Config class. Configures and stores endpoints
 */
export class Config {
  /**
   * Collection of configures endpionts
   *
   * @param {{}} Key: endpoint name, value: Rest client
   */
  endpoints = {};

  /**
   * Current default endpoint if set
   *
   * @param {Rest|null} defaultEndpoint The Rest client
   */
  defaultEndpoint = null;

  /**
   * Fetch request defaults applied to all endpoints
   *
   * @param {{}|null} defaults The defaults opject
   */
  defaults = null;

  /**
   * The plugin's configured status. Set on plugin('aurelia-api', ...)
   *
   * @param {boolean} configured The plugin's configured status
   */
  configured = false;

  /**
   * Register a new endpoint.
   *
   * @param {string}          name              The name of the new endpoint.
   * @param {function|string} [configureMethod] Configure method or endpoint.
   * @param {{}}              [defaults]        New defaults for the HttpClient
   *
   * @see http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration
   * @return {Config}
   * @chainable
   */
  registerEndpoint(name, configureMethod, defaults) {
    let newClient        = new HttpClient();
    this.endpoints[name] = new Rest(newClient, name);

    // get global defaults
    if (this.defaults) {
      defaults = extend(true, {}, this.defaults, defaults);
    }

    // set custom defaults to Rest
    if (defaults !== undefined) {
      this.endpoints[name].defaults = defaults;
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
   * @param {string} [name] The endpoint name. Returns default endpoint when not set.
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
   * @chainable
   */
  setDefaultEndpoint(name) {
    this.defaultEndpoint = this.getEndpoint(name);

    return this;
  }

  /**
   * Set defaults for all endpoints.
   * Can only be called at plugin configuration
   *
   * @param {{}} defaults The defaults object
   *
   * @return {Config}
   * @chainable
   */
  setDefaults(defaults) {
    if (this.configured) {
      throw new Error('setDefaults() can only be called at plugin configuration');
    }

    this.defaults = defaults;

    return this;
  }
}
