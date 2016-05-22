import {Config, Rest} from '../src/aurelia-api';
import {Container} from 'aurelia-dependency-injection';
import {InjectTest} from './resources/inject-test';
import {HttpClientAdapter} from '../src/http-client-adapter';
import {FetchClientAdapter} from '../src/fetch-client-adapter';
import {JSONPClientAdapter} from '../src/jsonp-client-adapter';

let container = new Container();
let config    = container.get(Config);
let baseUrls  = {
  github: 'https://api.github.com/',
  api   : 'http://127.0.0.1:1927/'
};

config.registerEndpoint('api', baseUrls.api);
config.registerEndpoint('github', baseUrls.github);
config.registerEndpoint('api-http', baseUrls.api, {}, HttpClientAdapter);
config.registerEndpoint('api-jsonp', baseUrls.api + 'jsonp/', {}, JSONPClientAdapter);

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
    it('Should find results for multiple endpoints (with default ClientAdapter).', function(done) {
      let injectTest = container.get(InjectTest);

      expect(injectTest.apiEndpoint instanceof Rest).toBe(true);
      expect(injectTest.githubEndpoint instanceof Rest).toBe(true);

      expect(injectTest.apiEndpoint.clientAdapter instanceof FetchClientAdapter).toBe(true);
      expect(injectTest.githubEndpoint.clientAdapter instanceof FetchClientAdapter).toBe(true);

      injectTest.githubEndpoint.find('repos/spoonx/aurelia-orm/contributors')
        .then(x => {
          expect(x[0].login).toBe('RWOverdijk');
          done();
        });

      injectTest.apiEndpoint.find('posts')
        .then(y => {
          expect(y.method).toBe('GET');
          done();
        });

      injectTest.apiEndpoint.find('posts')
        .then(y => {
          expect(y.path).toBe('/posts');
          done();
        });

      injectTest.apiEndpoint.find('posts', 'id')
        .then(y => {
          expect(y.path).toBe('/posts/id');
          expect(JSON.stringify(y.query)).toBe('{}');
          done();
        });

      injectTest.apiEndpoint.find('posts', criteria)
        .then(y => {
          expect(y.path).toBe('/posts');
          expect(JSON.stringify(y.query)).toBe(JSON.stringify(criteria));
          done();
        });

      injectTest.apiEndpoint.find('posts', undefined, options)
        .then(y => {
          expect(y.path).toBe('/posts');
          expect(y.contentType).toBe(options.headers['Content-Type']);
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });

    it('Should find results with HttpClientAdapter).', function(done) {
      let injectTest = container.get(InjectTest);

      expect(injectTest.apiHttpEndpoint instanceof Rest).toBe(true);
      expect(injectTest.apiHttpEndpoint.clientAdapter instanceof HttpClientAdapter).toBe(true);

      injectTest.apiHttpEndpoint.find('posts')
        .then(y => {
          expect(y.method).toBe('GET');
          done();
        });

      injectTest.apiHttpEndpoint.find('posts')
        .then(y => {
          expect(y.path).toBe('/posts');
          done();
        });

      injectTest.apiHttpEndpoint.find('posts', 'id')
        .then(y => {
          expect(y.path).toBe('/posts/id');
          expect(JSON.stringify(y.query)).toBe('{}');
          done();
        });

      injectTest.apiHttpEndpoint.find('posts', criteria)
        .then(y => {
          expect(y.path).toBe('/posts');
          expect(JSON.stringify(y.query)).toBe(JSON.stringify(criteria));
          done();
        });

      injectTest.apiHttpEndpoint.find('posts', undefined, options)
        .then(y => {
          expect(y.path).toBe('/posts');
          expect(y.contentType).toBe(options.headers['Content-Type']);
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });

    it('Should find results with JSONPClientAdapter).', function(done) {
      let injectTest = container.get(InjectTest);

      expect(injectTest.apiJSONPEndpoint instanceof Rest).toBe(true);
      expect(injectTest.apiJSONPEndpoint.clientAdapter instanceof JSONPClientAdapter).toBe(true);

      injectTest.apiJSONPEndpoint.find('posts')
        .then(y => {
          expect(y.method).toBe('GET');
          done();
        });

      injectTest.apiJSONPEndpoint.find('posts')
        .then(y => {
          expect(y.path).toBe('/jsonp/posts');
          done();
        });

      injectTest.apiJSONPEndpoint.find('posts', 'id')
        .then(y => {
          expect(y.path).toBe('/jsonp/posts/id');
          done();
        });

      injectTest.apiJSONPEndpoint.find('posts', criteria)
        .then(y => {
          expect(y.path).toBe('/jsonp/posts');
          expect(criteria.user).toBe(y.query.user);
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
          expect(y.contentType).toMatch('application/json');
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });

      injectTest.apiHttpEndpoint.update('posts', criteria, body, options)
        .then(y => {
          expect(y.method).toBe('PUT');
          expect(y.path).toBe('/posts');
          expect(JSON.stringify(y.query)).toBe(JSON.stringify(criteria));
          expect(y.contentType).toMatch('application/json');
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });
  });

  describe('.patch()', function() {
    it('Should patch with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.patch('post', criteria, body, options)
        .then(y => {
          expect(y.method).toBe('PATCH');
          expect(y.path).toBe('/post');
          expect(JSON.stringify(y.query)).toBe(JSON.stringify(criteria));
          expect(y.contentType).toMatch('application/json');
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });

      injectTest.apiHttpEndpoint.patch('post', criteria, body, options)
        .then(y => {
          expect(y.method).toBe('PATCH');
          expect(y.path).toBe('/post');
          expect(JSON.stringify(y.query)).toBe(JSON.stringify(criteria));
          expect(y.contentType).toMatch('application/json');
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

      injectTest.apiHttpEndpoint.destroy('posts', 'id', options)
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
          expect(y.contentType).toMatch('application/json');
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });

      injectTest.apiHttpEndpoint.create('posts', body, options)
        .then(y => {
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toMatch('application/json');
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });
  });
});
