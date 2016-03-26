import {Config, Rest, Endpoint} from '../src/aurelia-api';
import {Container} from 'aurelia-dependency-injection';
import {InjectTest} from './resources/inject-test';

let container = new Container();
let config    = container.get(Config);
let baseUrls  = {
  github: 'https://api.github.com',
  api   : 'http://jsonplaceholder.typicode.com'
};

config.registerEndpoint('api', baseUrls.api);
config.registerEndpoint('github', baseUrls.github);

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
      expect(injectTest.githubEndpoint instanceof Rest).toBe(true);
    });
  });
});
