import {resolver} from 'aurelia-dependency-injection';
import {Config} from './config';

@resolver()
export class Endpoint {

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
   * @return {*}
   */
  get(container: Container): Endpoint {
    return container.get(Config).getEndpoint(this._key);
  }

  /**
   * Get a new resolver for `key`.
   *
   * @param {string} key
   *
   * @return {Endpoint}
   */
  static of(key: string): Endpoint {
    return new Endpoint(key);
  }
}
