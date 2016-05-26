import {ClientAdapter} from './client-adapters/client-adapter';
import {FetchClientAdapter} from './client-adapters/fetch-client-adapter';
import {Rest} from './rest';

/**
 * Config class. Configures and stores endpoints
 */
export class Config {
  /**
   * Collection of configures endpionts
   * @type {Object} Key: endpoint name, value: Rest client
   */
  endpoints       = {};

  /**
   * Current default endpoint if set
   * @type {[Rest]} Default Rest client
   */
  defaultEndpoint = null;
  defaultClientAdapter = FetchClientAdapter;

  /**
   * Set a new defaultClientAdapter
   *
   * @param {class}  clientAdapter  The ClientAdapter class
   *
   * @return {Config}
   */
  setDefaultClientAdapter(clientAdapter) {
    this.defaultClientAdapter = clientAdapter;

    return this;
  }

  /**
   * Register a new endpoint.
   *
   * @type {string}          name              The name of the new endpoint.
   * @type {function|string} [configureMethod] Configure method or endpoint.
   * @type {{}}              [defaults]        New defaults for the HttpClient
   *
   * @see http://aurelia.io/docs.html#/aurelia/fetch-client/latest/doc/api/class/HttpClientConfiguration
   * @return {Config}
   */
  registerEndpoint(name, configureMethod, defaults = {}, SelectedClientAdapter = this.defaultClientAdapter) {
    let clientAdapter    = new SelectedClientAdapter();
    if (!(clientAdapter instanceof ClientAdapter)) throw new TypeError('clientAdapter not of type ClientAdapter');

    this.endpoints[name] = new Rest(clientAdapter, name);

    // add custom defaults to clientAdapter
    clientAdapter.defaults = extend(true, {}, clientAdapter.defaults || {}, defaults);

    // Manual configure of client.
    if (typeof configureMethod === 'function') {
      clientAdapter.client.configure(configureMethod);

      return this;
    }

    // Base url is self.
    if (typeof configureMethod !== 'string') {
      return this;
    }

    // Base url is string. Configure.
    clientAdapter.client.configure(configure => {
      configure.withBaseUrl(configureMethod);
    });

    return this;
  }

  /**
   * Get a previously registered endpoint. Returns null when not found.
   *
   * @type {string} [name] Endpoint bame. Returns default endpoint when not set.
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
   * @type {string} name The endpoint name
   *
   * @return {boolean}
   */
  endpointExists(name) {
    return !!this.endpoints[name];
  }

  /**
   * Set a previously registered endpoint as the default.
   *
   * @type {string} name The endpoint name
   *
   * @return {Config}
   */
  setDefaultEndpoint(name) {
    this.defaultEndpoint = this.getEndpoint(name);

    return this;
  }
}
