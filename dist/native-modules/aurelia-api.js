var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _dec, _class2;



import extend from 'extend';
import { HttpClient } from 'aurelia-fetch-client';
import { resolver } from 'aurelia-dependency-injection';
import { buildQueryString } from 'aurelia-path';

export function configure(aurelia, configCallback) {
  var config = aurelia.container.get(Config);

  configCallback(config);
}

export var Config = function () {
  function Config() {
    

    this.endpoints = {};
    this.defaultEndpoint = null;
  }

  Config.prototype.registerEndpoint = function registerEndpoint(name, configureMethod, defaults) {
    var newClient = new HttpClient();
    this.endpoints[name] = new Rest(newClient, name);

    if (defaults !== undefined) this.endpoints[name].defaults = defaults;

    if (typeof configureMethod === 'function') {
      newClient.configure(configureMethod);

      return this;
    }

    if (typeof configureMethod !== 'string') {
      return this;
    }

    newClient.configure(function (configure) {
      configure.withBaseUrl(configureMethod);
    });

    return this;
  };

  Config.prototype.getEndpoint = function getEndpoint(name) {
    if (!name) {
      return this.defaultEndpoint || null;
    }

    return this.endpoints[name] || null;
  };

  Config.prototype.endpointExists = function endpointExists(name) {
    return !!this.endpoints[name];
  };

  Config.prototype.setDefaultEndpoint = function setDefaultEndpoint(name) {
    this.defaultEndpoint = this.getEndpoint(name);

    return this;
  };

  return Config;
}();

export var Endpoint = (_dec = resolver(), _dec(_class2 = function () {
  function Endpoint(key) {
    

    this._key = key;
  }

  Endpoint.prototype.get = function get(container) {
    return container.get(Config).getEndpoint(this._key);
  };

  Endpoint.of = function of(key) {
    return new Endpoint(key);
  };

  return Endpoint;
}()) || _class2);

export var Rest = function () {
  function Rest(httpClient, endpoint) {
    

    this.defaults = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };

    this.client = httpClient;
    this.endpoint = endpoint;
  }

  Rest.prototype.request = function request(method, path, body) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    var requestOptions = extend(true, { headers: {} }, this.defaults, options, { method: method, body: body });

    var contentType = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

    if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object' && contentType) {
      requestOptions.body = contentType.toLowerCase() === 'application/json' ? JSON.stringify(body) : buildQueryString(body);
    }

    return this.client.fetch(path, requestOptions).then(function (response) {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(function (error) {
          return null;
        });
      }

      throw response;
    });
  };

  Rest.prototype.find = function find(resource, criteria, options) {
    return this.request('GET', getRequestPath(resource, criteria), undefined, options);
  };

  Rest.prototype.post = function post(resource, body, options) {
    return this.request('POST', resource, body, options);
  };

  Rest.prototype.update = function update(resource, criteria, body, options) {
    return this.request('PUT', getRequestPath(resource, criteria), body, options);
  };

  Rest.prototype.patch = function patch(resource, criteria, body, options) {
    return this.request('PATCH', getRequestPath(resource, criteria), body, options);
  };

  Rest.prototype.destroy = function destroy(resource, criteria, options) {
    return this.request('DELETE', getRequestPath(resource, criteria), undefined, options);
  };

  Rest.prototype.create = function create(resource, body, options) {
    return this.post.apply(this, arguments);
  };

  return Rest;
}();

function getRequestPath(resource, criteria) {
  return criteria !== undefined && criteria !== null ? resource + ((typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + buildQueryString(criteria)) : resource;
}