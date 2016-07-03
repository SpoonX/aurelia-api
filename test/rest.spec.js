import {Config} from '../src/config';
import {Rest} from '../src/rest';
import {Container} from 'aurelia-dependency-injection';
import {InjectTest} from './resources/inject-test';

let container = new Container();
let config    = container.get(Config);
let baseUrls  = {
  jsonplaceholder: 'http://jsonplaceholder.typicode.com/',
  api            : 'http://127.0.0.1:1927/'
};

config.registerEndpoint('api', baseUrls.api);
config.registerEndpoint('jsonplaceholder', baseUrls.jsonplaceholder);
config.registerEndpoint('form', baseUrls.api, null);

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
      expect(injectTest.jsonplaceholderEndpoint instanceof Rest).toBe(true);

      Promise.all([
        injectTest.jsonplaceholderEndpoint.find('posts/1')
          .then(x => {
            expect(x.userId).toBe(1);
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
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
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
    it('Should update with body (as json).', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.update('posts', null, body)
        .then(y => {
          expect(y.method).toBe('PUT');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toMatch('application/json');
          done();
        });
    });

    it('Should update with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.update('posts', criteria, body, options)
        .then(y => {
          expect(y.method).toBe('PUT');
          expect(y.path).toBe('/posts');
          expect(y.query.user).toBe(criteria.user);
          expect(y.query.comment).toBe(criteria.comment);
          expect(y.contentType).toMatch(options.headers['Content-Type']);
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });
  });

  describe('.patch()', function() {
    it('Should patch with body (as json).', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.patch('post', null, body)
        .then(y => {
          expect(y.method).toBe('PATCH');
          expect(y.path).toBe('/post');
          expect(y.contentType).toMatch('application/json');
          done();
        });
    });

    it('Should patch with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.patch('post', criteria, body, options)
        .then(y => {
          expect(y.method).toBe('PATCH');
          expect(y.path).toBe('/post');
          expect(y.query.user).toBe(criteria.user);
          expect(y.query.comment).toBe(criteria.comment);
          expect(y.contentType).toMatch(options.headers['Content-Type']);
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
    it('Should create body (as json).', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.create('posts', body)
        .then(y => {
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toMatch('application/json');
          done();
        });
    });

    it('Should create body (as json) and options.', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.create('posts', body, options)
        .then(y => {
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toMatch(options.headers['Content-Type']);
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });
  });

  describe('.post()', function() {
    it('Should post body (as urlencoded).', function(done) {
      let injectTest = container.get(InjectTest);

      injectTest.apiEndpoint.post('posts', body, options)
        .then(y => {
          expect(JSON.stringify(y.body)).toBe(JSON.stringify(y.body));
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/posts');
          expect(y.contentType).toMatch(options.headers['Content-Type']);
          expect(y.Authorization).toBe(options.headers['Authorization']);
          done();
        });
    });

    it('Should post body (as FormData) and options.', function(done) {
      let injectTest = container.get(InjectTest);

      let data = new FormData();
      data.append('message', 'some');

      injectTest.formEndpoint.post('uploads', data, {headers: {'Authorization': 'Bearer aToken'}})
        .then(y => {
          expect(y.method).toBe('POST');
          expect(y.path).toBe('/uploads');
          expect(y.contentType).toMatch('multipart/form-data');
          expect(y.Authorization).toBe('Bearer aToken');
          expect(y.body.message).toBe('some');
          done();
        });
    });
  });
});
