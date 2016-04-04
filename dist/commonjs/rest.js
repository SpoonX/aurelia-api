'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rest = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _aureliaFetchClient = require('aurelia-fetch-client');

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _extend = require('extend');

var _extend2 = _interopRequireDefault(_extend);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rest = exports.Rest = function () {
  function Rest(httpClient, endpoint) {
    _classCallCheck(this, Rest);

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

    var requestOptions = (0, _extend2.default)(true, {}, this.defaults, options);

    requestOptions.method = method;

    if ((typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object') {
      requestOptions.body = (0, _aureliaFetchClient.json)(body);
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
    var requestPath = resource;

    if (criteria) {
      requestPath += (typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + _qs2.default.stringify(criteria);
    }

    return this.request('get', requestPath, undefined, options);
  };

  Rest.prototype.post = function post(resource, body, options) {
    return this.request('post', resource, body, options);
  };

  Rest.prototype.update = function update(resource, criteria, body, options) {
    var requestPath = resource;

    if (criteria) {
      requestPath += (typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + _qs2.default.stringify(criteria);
    }

    return this.request('put', requestPath, body, options);
  };

  Rest.prototype.destroy = function destroy(resource, criteria, options) {
    var requestPath = resource;

    if (criteria) {
      requestPath += (typeof criteria === 'undefined' ? 'undefined' : _typeof(criteria)) !== 'object' ? '/' + criteria : '?' + _qs2.default.stringify(criteria);
    }

    return this.request('delete', requestPath, undefined, options);
  };

  Rest.prototype.create = function create(resource, body, options) {
    return this.post.apply(this, arguments);
  };

  return Rest;
}();