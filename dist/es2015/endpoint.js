var _dec, _class;

import { resolver } from 'aurelia-dependency-injection';
import { Config } from './config';

export let Endpoint = (_dec = resolver(), _dec(_class = class Endpoint {
  constructor(key) {
    this._key = key;
  }

  get(container) {
    return container.get(Config).getEndpoint(this._key);
  }

  static of(key) {
    return new Endpoint(key);
  }
}) || _class);