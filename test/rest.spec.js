import {HttpClient} from 'aurelia-fetch-client';
import {Config, Rest, Endpoint} from '../src/index';
import {Container} from 'aurelia-dependency-injection';
import {InjectTest} from './resource/inject-test';

let container = new Container();
let config    = container.get(Config);
let baseUrls  = {
  github: 'https://api.github.com/',
  api   : 'http://127.0.0.1:1927/'
};

config.registerEndpoint('api', baseUrls.api);
config.registerEndpoint('github', baseUrls.github);

describe('Rest', function() {
  describe('.find()', function() {
    it('Should find results for multiple endpoints.', function(done) {
      let injectTest = container.get(InjectTest);

      expect(injectTest.apiEndpoint instanceof Rest).toBe(true);
      expect(injectTest.githubEndpoint instanceof Rest).toBe(true);

      Promise.all([
        injectTest.githubEndpoint.find('repos/spoonx/aurelia-orm/contributors')
          .then(x => {
            expect(x[0].login).toBe('RWOverdijk');
          }),
        injectTest.apiEndpoint.find('posts')
          .then(y => {
            expect(y.path).toBe('/posts');
          })
      ]).then(x => {
        done();
      });
    });
  });
});
