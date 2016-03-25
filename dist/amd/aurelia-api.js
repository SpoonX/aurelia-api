define(['exports', './config', './rest', './endpoint'], function (exports, _config, _rest, _endpoint) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Endpoint = exports.Rest = exports.Config = exports.configure = undefined;


  function configure(aurelia, configCallback) {
    var config = aurelia.container.get(_config.Config);

    configCallback(config);
  }

  exports.configure = configure;
  exports.Config = _config.Config;
  exports.Rest = _rest.Rest;
  exports.Endpoint = _endpoint.Endpoint;
});