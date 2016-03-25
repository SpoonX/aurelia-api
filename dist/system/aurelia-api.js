'use strict';

System.register(['./config', './rest', './endpoint'], function (_export, _context) {
  var Config, Rest, Endpoint;


  function configure(aurelia, configCallback) {
    var config = aurelia.container.get(Config);

    configCallback(config);
  }

  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_rest) {
      Rest = _rest.Rest;
    }, function (_endpoint) {
      Endpoint = _endpoint.Endpoint;
    }],
    execute: function () {
      _export('configure', configure);

      _export('Config', Config);

      _export('Rest', Rest);

      _export('Endpoint', Endpoint);
    }
  };
});