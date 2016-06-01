import {resolver} from 'aurelia-dependency-injection';
import {Config} from './config';

/**
 * Endpoint class. A resolver for endpoints which allows injection of the corresponding Rest client into a class
 */
@resolver()
export class Endpoint {

  /**
   * Construct the resolver with the specified key.
   *
   * @type {string} key
   */
  constructor(key, ...rest) {
    this._key = key;
    this._rest = rest;
  }

  /**
   * Resolve for key.
   *
   * @type {Container} container
   *
   * @return {Rest}
   */
  get(container) {
    let config = container.get(Config);
    let endpoint = config.getEndpoint(this._key);

    if (endpoint) return endpoint;

    config.registerEndpoint(this._key, ...this._rest);
    return config.getEndpoint(this._key);
  }

  /**
   * Get a new resolver for `key`.
   *
   * @type {string} key  The endpoint name
   *
   * @return {Endpoint}  Resolves to the Rest client for this endpoint
   */
  static of(key, ...rest) {
    return new Endpoint(key, ...rest);
  }
}
