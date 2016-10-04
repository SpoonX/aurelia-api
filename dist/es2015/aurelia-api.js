var _dec, _class3;

import extend from 'extend';
import { buildQueryString, join } from 'aurelia-path';
import { HttpClient } from 'aurelia-fetch-client';
import { Container, resolver } from 'aurelia-dependency-injection';

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

  request(method, path, body, options) {
    let requestOptions = extend(true, { headers: {} }, this.defaults, options || {}, { method, body });
    let contentType = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

    if (typeof body === 'object' && body !== null && contentType) {
      requestOptions.body = contentType.toLowerCase() === 'application/json' ? JSON.stringify(body) : buildQueryString(body);
    }

    return this.client.fetch(path, requestOptions).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(() => null);
      }

      throw response;
    });
  }

  find(resource, criteria, options) {
    return this.request('GET', getRequestPath(resource, criteria), undefined, options);
  }

  findOne(resource, id, criteria, options) {
    return this.request('GET', getRequestPath(resource, id, criteria), undefined, options);
  }

  post(resource, body, options) {
    return this.request('POST', resource, body, options);
  }

  update(resource, criteria, body, options) {
    return this.request('PUT', getRequestPath(resource, criteria), body, options);
  }

  updateOne(resource, id, criteria, body, options) {
    return this.request('PUT', getRequestPath(resource, id, criteria), body, options);
  }

  patch(resource, criteria, body, options) {
    return this.request('PATCH', getRequestPath(resource, criteria), body, options);
  }

  patchOne(resource, id, criteria, body, options) {
    return this.request('PATCH', getRequestPath(resource, id, criteria), body, options);
  }

  destroy(resource, criteria, options) {
    return this.request('DELETE', getRequestPath(resource, criteria), undefined, options);
  }

  destroyOne(resource, id, criteria, options) {
    return this.request('DELETE', getRequestPath(resource, id, criteria), undefined, options);
  }

  create(resource, body, options) {
    return this.post(resource, body, options);
  }
};

function getRequestPath(resource, idOrCriteria, criteria) {
  let hasSlash = resource.slice(-1) === '/';

  if (typeof idOrCriteria === 'string' || typeof idOrCriteria === 'number') {
    resource = `${ join(resource, String(idOrCriteria)) }${ hasSlash ? '/' : '' }`;
  } else {
    criteria = idOrCriteria;
  }

  if (typeof criteria === 'object' && criteria !== null) {
    resource += `?${ buildQueryString(criteria) }`;
  } else if (criteria) {
    resource += `${ hasSlash ? '' : '/' }${ criteria }${ hasSlash ? '/' : '' }`;
  }

  return resource;
}

export let Config = class Config {
  constructor() {
    this.endpoints = {};
  }

  registerEndpoint(name, configureMethod, defaults) {
    let newClient = new HttpClient();

    this.endpoints[name] = new Rest(newClient, name);

    if (defaults !== undefined) {
      this.endpoints[name].defaults = defaults;
    }

    if (typeof configureMethod === 'function') {
      newClient.configure(configureMethod);

      return this;
    }

    if (typeof configureMethod !== 'string' && !this.defaultBaseUrl) {
      return this;
    }

    if (this.defaultBaseUrl && typeof configureMethod !== 'string' && typeof configureMethod !== 'function') {
      newClient.configure(configure => {
        configure.withBaseUrl(this.defaultBaseUrl);
      });

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

  setDefaultBaseUrl(baseUrl) {
    this.defaultBaseUrl = baseUrl;

    return this;
  }

  configure(config) {
    if (config.defaultBaseUrl) {
      this.defaultBaseUrl = config.defaultBaseUrl;
    }

    config.endpoints.forEach(endpoint => {
      this.registerEndpoint(endpoint.name, endpoint.endpoint, endpoint.config);

      if (endpoint.default) {
        this.setDefaultEndpoint(endpoint.name);
      }
    });

    if (config.defaultEndpoint) {
      this.setDefaultEndpoint(config.defaultEndpoint);
    }

    return this;
  }
};

export function configure(frameworkConfig, configOrConfigure) {
  let config = frameworkConfig.container.get(Config);

  if (typeof configOrConfigure === 'function') {
    configOrConfigure(config);

    return;
  }

  config.configure(configOrConfigure);
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