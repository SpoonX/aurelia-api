import {HttpClient} from 'aurelia-fetch-client';
import {Config, Rest} from '../src/index';
import {Container} from 'aurelia-dependency-injection';

describe('Config', function() {
  describe('.registerEndpoint()', function() {
    it('Should properly register an endpoint when providing a config callback.', function() {
      var config   = new Config;
      var returned = config.registerEndpoint('github', function(configure) {
        configure.withBaseUrl(baseUrls.github);
      });

      expect(config.endpoints.github.client.defaults).toEqual({});
      expect(config.endpoints.github.client.baseUrl).toEqual(baseUrls.github);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint when providing an endpoint string.', function() {
      var config   = new Config;
      var returned = config.registerEndpoint('api', baseUrls.api);

      expect(config.endpoints.api.client.defaults).toEqual({});
      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint with no arguments.', function() {
      var config   = new Config;
      var returned = config.registerEndpoint('boring');

      expect(config.endpoints.boring.client.defaults).toEqual(null);
      expect(config.endpoints.boring.client.baseUrl).toEqual('');
      expect(returned).toBe(config);
    });

    it('Should properly register an endpoint when providing an endpoint string and defaults.', function() {
      var config   = new Config;
      var returned = config.registerEndpoint('api', baseUrls.api, {headers: {'x-scope': 'Tests'}});

      expect(config.endpoints.api.client.baseUrl).toEqual(baseUrls.api);
      expect(config.endpoints.api.client.defaults).toEqual({headers: {'x-scope': 'Tests'}});
      expect(returned).toBe(config);
    });
  });

  describe('.getEndpoint()', function() {
    it('Should return the registered endpoint, or null.', function() {
      var config = new Config;

      config.registerEndpoint('api', baseUrls.api);

      var endpoint            = config.getEndpoint('api');
      var nullEndpoint        = config.getEndpoint('no');
      var defaultNullEndpoint = config.getEndpoint();

      expect(endpoint instanceof Rest).toBe(true);
      expect(endpoint.client instanceof HttpClient).toBe(true);
      expect(nullEndpoint instanceof Rest).toBe(false);
      expect(nullEndpoint).toBe(null);
      expect(defaultNullEndpoint instanceof Rest).toBe(false);
      expect(defaultNullEndpoint).toBe(null);

      config.setDefaultEndpoint('api');

      var defaultEndpoint = config.getEndpoint();

      expect(defaultEndpoint instanceof Rest).toBe(true);
      expect(defaultEndpoint.client instanceof HttpClient).toBe(true);
    });
  });

  describe('.endpointExists()', function() {
    it('Should return if given name is a registered endpoint.', function() {
      var config = new Config;

      config.registerEndpoint('api', baseUrls.api);

      expect(config.endpointExists('api')).toBe(true);
      expect(config.endpointExists('cake')).toBe(false);
      expect(config.endpointExists()).toBe(false);
    });
  });

  describe('.setDefaultEndpoint()', function() {
    it('Should set the default endpoint.', function() {
      var config = new Config;

      config.registerEndpoint('api', baseUrls.api);
      expect(config.getEndpoint()).toBe(null);
      config.setDefaultEndpoint('api');
      expect(config.getEndpoint() instanceof Rest).toBe(true);
    });
  });
});

var baseUrls = {
  github: 'https://api.github.com',
  api   : 'http://jsonplaceholder.typicode.com'
};
