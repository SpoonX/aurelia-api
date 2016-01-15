System.register(['./config', './endpoint'], function (_export) {
  'use strict';

  var Config;

  _export('configure', configure);

  function configure(aurelia, configCallback) {
    var config = aurelia.container.get(Config);

    configCallback(config);
  }

  return {
    setters: [function (_config) {
      Config = _config.Config;

      _export('Config', _config.Config);
    }, function (_endpoint) {
      _export('Endpoint', _endpoint.Endpoint);
    }],
    execute: function () {}
  };
});