var _dec, _class3;

import extend from 'extend';
import { buildQueryString, join } from 'aurelia-path';
import { HttpClient } from 'aurelia-fetch-client';
import { Container, resolver } from 'aurelia-dependency-injection';

export let Rest = class Rest {
  constructor(httpClient, endpoint, useTraditionalUriTemplates) {
    this.defaults = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    this.client = httpClient;
    this.endpoint = endpoint;
    this.useTraditionalUriTemplates = !!useTraditionalUriTemplates;
  }

  request(method, path, body, options, responseOutput) {
    let requestOptions = extend(true, { headers: {} }, this.defaults, options || {}, { method, body });
    let contentType = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

    if (typeof body === 'object' && body !== null && contentType) {
      requestOptions.body = /^application\/(.+\+)?json/.test(contentType.toLowerCase()) ? JSON.stringify(body) : buildQueryString(body);
    }

    return this.client.fetch(path, requestOptions).then(response => {
      if (response.status >= 200 && response.status < 400) {
        if (responseOutput) {
          responseOutput.response = response;
        }

        return response.json().catch(() => null);
      }

      throw response;
    });
  }

  find(resource, idOrCriteria, options, responseOutput) {
    return this.request('GET', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), undefined, options, responseOutput);
  }

  findOne(resource, id, criteria, options, responseOutput) {
    return this.request('GET', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), undefined, options, responseOutput);
  }

  post(resource, body, options, responseOutput) {
    return this.request('POST', resource, body, options, responseOutput);
  }

  update(resource, idOrCriteria, body, options, responseOutput) {
    return this.request('PUT', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), body, options, responseOutput);
  }

  updateOne(resource, id, criteria, body, options, responseOutput) {
    return this.request('PUT', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), body, options, responseOutput);
  }

  patch(resource, idOrCriteria, body, options, responseOutput) {
    return this.request('PATCH', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), body, options, responseOutput);
  }

  patchOne(resource, id, criteria, body, options, responseOutput) {
    return this.request('PATCH', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), body, options, responseOutput);
  }

  destroy(resource, idOrCriteria, options, responseOutput) {
    return this.request('DELETE', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), undefined, options, responseOutput);
  }

  destroyOne(resource, id, criteria, options, responseOutput) {
    return this.request('DELETE', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), undefined, options, responseOutput);
  }

  create(resource, body, options, responseOutput) {
    return this.post(resource, body, options, responseOutput);
  }
};

function getRequestPath(resource, traditional, idOrCriteria, criteria) {
  let hasSlash = resource.slice(-1) === '/';

  if (typeof idOrCriteria === 'string' || typeof idOrCriteria === 'number') {
    resource = `${join(resource, String(idOrCriteria))}${hasSlash ? '/' : ''}`;
  } else {
    criteria = idOrCriteria;
  }

  if (typeof criteria === 'object' && criteria !== null) {
    resource += `?${buildQueryString(criteria, traditional)}`;
  } else if (criteria) {
    resource += `${hasSlash ? '' : '/'}${criteria}${hasSlash ? '/' : ''}`;
  }

  return resource;
}

export let Config = class Config {
  constructor() {
    this.endpoints = {};
  }

  registerEndpoint(name, configureMethod, defaults, restOptions) {
    let newClient = new HttpClient();
    let useTraditionalUriTemplates;

    if (restOptions !== undefined) {
      useTraditionalUriTemplates = restOptions.useTraditionalUriTemplates;
    }
    this.endpoints[name] = new Rest(newClient, name, useTraditionalUriTemplates);

    if (defaults !== undefined) {
      this.endpoints[name].defaults = defaults;
    }

    if (typeof configureMethod === 'function') {
      newClient.configure(configureMethod);

      if (typeof newClient.defaults === 'object' && newClient.defaults !== null) {
        this.endpoints[name].defaults = newClient.defaults;
      }

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