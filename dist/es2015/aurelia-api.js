var _dec, _class3;

import extend from 'extend';
import { buildQueryString } from 'aurelia-path';
import { HttpClient } from 'aurelia-fetch-client';
import { resolver } from 'aurelia-dependency-injection';

export let Rest = class Rest {
  constructor(httpClient, endpoint) {
    this.defaults = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    this.client = httpClient;
    this.endpoint = endpoint;
  }

  request(method, path, body, options = {}) {
    let requestOptions = extend(true, { headers: {} }, this.defaults, options, { method, body });

    let contentType = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

    if (typeof body === 'object' && contentType) {
      requestOptions.body = contentType.toLowerCase() === 'application/json' ? JSON.stringify(body) : buildQueryString(body);
    }

    return this.client.fetch(path, requestOptions).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(error => null);
      }

      throw response;
    });
  }

  find(resource, criteria, options) {
    return this.request('GET', getRequestPath(resource, criteria), undefined, options);
  }

  post(resource, body, options) {
    return this.request('POST', resource, body, options);
  }

  update(resource, criteria, body, options) {
    return this.request('PUT', getRequestPath(resource, criteria), body, options);
  }

  patch(resource, criteria, body, options) {
    return this.request('PATCH', getRequestPath(resource, criteria), body, options);
  }

  destroy(resource, criteria, options) {
    return this.request('DELETE', getRequestPath(resource, criteria), undefined, options);
  }

  create(resource, body, options) {
    return this.post(...arguments);
  }
};

function getRequestPath(resource, criteria) {
  return criteria !== undefined && criteria !== null ? resource + (typeof criteria !== 'object' ? `/${ criteria }` : '?' + buildQueryString(criteria)) : resource;
}

export let Config = class Config {
  constructor() {
    this.endpoints = {};
    this.defaultEndpoint = null;
  }

  registerEndpoint(name, configureMethod, defaults) {
    let newClient = new HttpClient();
    this.endpoints[name] = new Rest(newClient, name);

    if (defaults !== undefined) this.endpoints[name].defaults = defaults;

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

export function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config);

  configCallback(config);
}

export let Endpoint = (_dec = resolver(), _dec(_class3 = class Endpoint {
  constructor(key) {
    this._key = key;
  }

  get(container) {
    return container.get(Config).getEndpoint(this._key);
  }

  static of(key) {
    return new Endpoint(key);
  }
}) || _class3);