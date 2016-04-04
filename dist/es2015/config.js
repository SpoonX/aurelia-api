import { HttpClient } from 'aurelia-fetch-client';
import { Rest } from './rest';
import extend from 'extend';

export let Config = class Config {
  constructor() {
    this.endpoints = {};
    this.defaultEndpoint = null;
  }

  registerEndpoint(name, configureMethod, defaults = {}) {
    let newClient = new HttpClient();
    this.endpoints[name] = new Rest(newClient, name);

    extend(true, this.endpoints[name].defaults, defaults);

    if (typeof configureMethod === 'function') {
      newClient.configure(configureMethod);

      return this;
    }

    if (typeof configureMethod !== 'string') {
      return this;
    }

    newClient.configure(configure => {
      configure.withBaseUrl(configureMethod);
    });

    return this;
  }

  getEndpoint(name) {
    if (!name) {
      return this.defaultEndpoint || null;
    }

    return this.endpoints[name] || null;
  }

  endpointExists(name) {
    return !!this.endpoints[name];
  }

  setDefaultEndpoint(name) {
    this.defaultEndpoint = this.getEndpoint(name);

    return this;
  }
};