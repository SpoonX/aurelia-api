import {Container, resolver} from 'aurelia-dependency-injection';
import {Config} from './config';
import {Rest} from './rest';

/**
 * Endpoint class. A resolver for endpoints which allows injection of the corresponding Rest client into a class
 */
@resolver()
export class Endpoint {

  _key: string;

  /**
   * Construct the resolver with the specified key.
   *
   * @param {string} key
   */
  constructor(key: string) {
    this._key = key;
  }

  /**
   * Resolve for key.
   *
   * @param {Container} container
   *
   * @return {Rest}
   */
  get(container: Container): Rest {
    return container.get(Config).getEndpoint(this._key);
  }

  /**
   * Get a new resolver for `key`.
   *
   * @param {string} key  The endpoint name
   *
   * @return {Endpoint}  Resolves to the Rest client for this endpoint
   */
  static of(key: string): Endpoint {
    return new Endpoint(key);
  }
}
