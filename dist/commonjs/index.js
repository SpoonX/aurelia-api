'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaApi = require('./aurelia-api');

Object.keys(_aureliaApi).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaApi[key];
    }
  });
});