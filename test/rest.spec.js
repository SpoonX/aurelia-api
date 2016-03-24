import {Config, Rest} from '../src/aurelia-api';
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

let criteria = {user: 'john', comment: 'last'};
let body = {message: 'some'};
let options = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Bearer aToken'
  }
};

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
            expect(y.method).toBe('GET');
          }),
        injectTest.apiEndpoint.find('posts')
          .then(y => {
            expect(y.path).toBe('/posts');
          }),
        injectTest.apiEndpoint.find('posts', 'id')
          .then(y => {
            expect(y.path).toBe('/posts/id');
            expect(JSON.stringify(y.query)).toBe('{}');
          }),
        injectTest.apiEndpoint.find('posts', criteria)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(JSON.stringify(y.query)).toBe(JSON.stringify(criteria));
          }),
        injectTest.apiEndpoint.find('posts', undefined, options)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.contentType).toBe(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          })
      ]).then(x => {
        done();
      });
    });
  });

  describe('.update()', function() {
    it('Should update with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.update('posts', criteria, body, options)
        .then(y => {
          expect(y.method).toBe('PUT');
          expect(y.path).toBe('/posts');
          expect(JSON.stringify(y.query)).toBe(JSON.stringify(criteria));
          expect(y.contentType).toBe('application/json');
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });
  });

  describe('.destroy()', function() {
    it('Should destroy with id and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.destroy('posts', 'id', options)
        .then(y => {
          expect(y.method).toBe('DELETE');
          expect(y.path).toBe('/posts/id');
          expect(JSON.stringify(y.query)).toBe('{}');
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });
  });

  describe('.create()', function() {
    it('Should create body (as json) and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.create('posts', body, options)
        .then(y => {
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toBe('application/json');
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });
  });
});
