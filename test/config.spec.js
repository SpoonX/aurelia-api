import {HttpClient} from 'aurelia-fetch-client';
import {Config} from '../src/config';
import {Rest} from '../src/rest';

describe('Config', function() {
  describe('.registerEndpoint()', function() {
    it('Should properly register an endpoint when providing a config callback.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('github', function(configure) {
        configure.withBaseUrl(baseUrls.github);
        configure.withDefaults(userOptions);
      });
      expect(config.endpoints.github.defaults).toEqual(defaultOptions);
      expect(config.endpoints.github.client.defaults).toEqual(userOptions);
      expect(config.endpoints.github.client.baseUrl).toEqual(baseUrls.github);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint when providing an endpoint string.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('api', baseUrls.api);

      expect(config.endpoints.api.defaults).toEqual(defaultOptions);
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint with no arguments.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('boring');

      expect(config.endpoints.boring.defaults).toEqual(defaultOptions);
      expect(config.endpoints.boring.client.baseUrl).toEqual('');
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint when providing an endpoint string and defaults.', function() {
      let config   = new Config;
      let returned = config.registerEndpoint('api', baseUrls.api, userOptions);

      expect(config.endpoints.api.defaults).toEqual(userOptions);
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);
      expect(returned).toBe(config);
    });
  });

  describe('.getEndpoint()', function() {
    it('Should return the registered endpoint, or null.', function() {
      let config = new Config;

      config.registerEndpoint('api', baseUrls.api);

      let endpoint            = config.getEndpoint('api');
      let nullEndpoint        = config.getEndpoint('no');
      let defaultNullEndpoint = config.getEndpoint();

      expect(endpoint instanceof Rest).toBe(true);
      expect(endpoint.client instanceof HttpClient).toBe(true);
      expect(nullEndpoint instanceof Rest).toBe(false);
      expect(nullEndpoint).toBe(null);
      expect(defaultNullEndpoint instanceof Rest).toBe(false);
      expect(defaultNullEndpoint).toBe(null);

      config.setDefaultEndpoint('api');

      let defaultEndpoint = config.getEndpoint();

      expect(defaultEndpoint instanceof Rest).toBe(true);
      expect(defaultEndpoint.client instanceof HttpClient).toBe(true);
    });
  });

  describe('.endpointExists()', function() {
    it('Should return if given name is a registered endpoint.', function() {
      let config = new Config;

      config.registerEndpoint('api', baseUrls.api);

      expect(config.endpointExists('api')).toBe(true);
      expect(config.endpointExists('cake')).toBe(false);
      expect(config.endpointExists()).toBe(false);
    });
  });

  describe('.setDefaultEndpoint()', function() {
    it('Should set the default endpoint.', function() {
      let config = new Config;

      config.registerEndpoint('api', baseUrls.api);
      expect(config.getEndpoint()).toBe(null);
      config.setDefaultEndpoint('api');
      expect(config.getEndpoint() instanceof Rest).toBe(true);
    });
  });

  describe('.setDefaults()', function() {
    it('Should have standard default prior.', function() {
      let config = new Config;

      config.registerEndpoint('no-defaults', baseUrls.api);
      expect(!config.defaults).toBe(true);
      expect(JSON.stringify(config.getEndpoint('no-defaults').defaults)).toBe(JSON.stringify(defaultOptions));
    });

    it('Should set defaults for all endpoints.', function() {
      let config = new Config;

      let defaults = {parseError: true};
      config.setDefaults(defaults);

      config.registerEndpoint('with-defaults', baseUrls.api);
      expect(config.defaults).toBe(defaults);
      expect(JSON.stringify(config.getEndpoint('with-defaults').defaults)).toBe(JSON.stringify(defaults));
    });

    it('Should throw when calling after configuration.', function() {
      let config = new Config;
      config.configured = true;

      let fail = () => config.setDefaults({parseError: true});

      expect(fail).toThrow();
    });
  });
});

let baseUrls = {
  github: 'https://api.github.com',
  api   : 'http://jsonplaceholder.typicode.com'
};

let defaultOptions = {
  'headers': {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  parseError: false
};

let userOptions = {
  'headers': {
    'x-scope': 'Tests'
  }};
