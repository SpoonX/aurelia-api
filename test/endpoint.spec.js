import {Config} from '../src/config';
import {Rest} from '../src/rest';
import {Endpoint} from '../src/endpoint';
import {Container} from 'aurelia-dependency-injection';
import {InjectTest} from './resources/inject-test';

let container = new Container();
let config    = container.get(Config);
let baseUrls  = {
  jsonplaceholder: 'http://jsonplaceholder.typicode.com',
  api            : 'http://127.0.0.1:1927/'
};

config.registerEndpoint('api', baseUrls.api);
config.registerEndpoint('jsonplaceholder', baseUrls.jsonplaceholder);

describe('Endpoint', function() {
  describe('static .of()', function() {
    it('Should return a new instance of self.', function() {
      let endpoint = Endpoint.of('foo');

      expect(endpoint instanceof Endpoint).toBe(true);
      expect(endpoint._key).toBe('foo');
    });

    it('Should return a new instance of Rest.', function() {
      let injectTest = container.get(InjectTest);

      expect(injectTest.apiEndpoint instanceof Rest).toBe(true);
      expect(injectTest.jsonplaceholderEndpoint instanceof Rest).toBe(true);
    });
  });
});
