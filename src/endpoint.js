import {resolver} from 'aurelia-dependency-injection';
import {Config} from './config';

@resolver()
export class Endpoint {

  /**
   * Construct the resolver with the specified key and optional ...rest.
   *
   * @param {string} key
   * @param {[args]} ...rest
   */
  constructor(key, ...rest) {
    this._key = key;
    this._rest = rest;
  }

  /**
   * Resolve for key. If no endpoint is found, create new one with config.registerEndpoint(key, ...rest)
   *
   * @param {Container} container
   *
   * @return {*}
   */
  get(container) {
    let config = container.get(Config);
    let endpoint = config.getEndpoint(this._key);

    if (endpoint) return endpoint;

    config.registerEndpoint(this._key, ...this._rest);
    return config.getEndpoint(this._key);
  }

  /**
   * Get a new resolver for `key` and optional '...rest' parameters for optional dynamic endpoint registration with config.registerEndpoint(key, ...rest)
   *
   * @param {string} key
   * @param {[args]} ...rest
   *
   * @return {Endpoint}
   */
  static of(key, ...rest) {
    return new Endpoint(key, ...rest);
  }
}
