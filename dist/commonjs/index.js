'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

var _aureliaFetchClient = require('aurelia-fetch-client');

var _rest = require('./rest');

Object.defineProperty(exports, 'Rest', {
  enumerable: true,
  get: function get() {
    return _rest.Rest;
  }
});

function configure(aurelia, configCallback) {
  aurelia.container.get(_aureliaFetchClient.HttpClient).configure(configCallback);
}