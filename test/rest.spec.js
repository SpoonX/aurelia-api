import {Config, Rest} from '../src/aurelia-api';
import {Container} from 'aurelia-dependency-injection';
import {InjectTest} from './resources/inject-test';
import {HttpClientAdapter} from '../src/http-client-adapter';
import {FetchClientAdapter} from '../src/fetch-client-adapter';
import {JSONPClientAdapter} from '../src/jsonp-client-adapter';
import {StorageClientAdapter} from '../src/storage-client-adapter';
import {FileClientAdapter} from '../src/file-client-adapter';

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
config.registerEndpoint('api-storage', baseUrls.api, {}, StorageClientAdapter);
config.registerEndpoint('api-file', './test/resources/', {}, FileClientAdapter);

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
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
          }),
        injectTest.apiEndpoint.find('posts', undefined, options)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.contentType).toBe(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          })
      ]).then(done);
    });

    it('Should find results with HttpClientAdapter).', function(done) {
      let injectTest = container.get(InjectTest);

      expect(injectTest.apiHttpEndpoint instanceof Rest).toBe(true);
      expect(injectTest.apiHttpEndpoint.clientAdapter instanceof HttpClientAdapter).toBe(true);

      Promise.all([
        injectTest.apiHttpEndpoint.find('posts')
          .then(y => {
            expect(y.method).toBe('GET');
          }),
        injectTest.apiHttpEndpoint.find('posts')
          .then(y => {
            expect(y.path).toBe('/posts');
          }),
        injectTest.apiHttpEndpoint.find('posts', 'id')
          .then(y => {
            expect(y.path).toBe('/posts/id');
            expect(JSON.stringify(y.query)).toBe('{}');
          }),
        injectTest.apiHttpEndpoint.find('posts', criteria)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
          }),
        injectTest.apiHttpEndpoint.find('posts', undefined, options)
          .then(y => {
            expect(y.path).toBe('/posts');
            expect(y.contentType).toBe(options.headers['Content-Type']);
            expect(y.Authorization).toBe(options.headers['Authorization']);
          })
      ]).then(done);
    });

    it('Should find results with JSONPClientAdapter).', function(done) {
      let injectTest = container.get(InjectTest);

      expect(injectTest.apiJSONPEndpoint instanceof Rest).toBe(true);
      expect(injectTest.apiJSONPEndpoint.clientAdapter instanceof JSONPClientAdapter).toBe(true);

      Promise.all([
        injectTest.apiJSONPEndpoint.find('posts')
          .then(y => {
            expect(y.method).toBe('GET');
          }),
        injectTest.apiJSONPEndpoint.find('posts')
          .then(y => {
            expect(y.path).toBe('/jsonp/posts');
          }),
        injectTest.apiJSONPEndpoint.find('posts', 'id')
          .then(y => {
            expect(y.path).toBe('/jsonp/posts/id');
          }),
        injectTest.apiJSONPEndpoint.find('posts', criteria)
          .then(y => {
            expect(y.path).toBe('/jsonp/posts');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
          })
      ]).then(done);
    });

    it('Should find results with StorageClientAdapter).', function(done) {
      let injectTest = container.get(InjectTest);

      expect(injectTest.apiStorageEndpoint instanceof Rest).toBe(true);
      expect(injectTest.apiStorageEndpoint.clientAdapter instanceof StorageClientAdapter).toBe(true);

      let data = [{id: 0, user: 'john', comment: 'last'},
                  {id: 1, user: 'john', comment: 'first'},
                  {id: 2, user: 'jane'}];
      let key = `${injectTest.apiStorageEndpoint.clientAdapter.client.storageKey}posts`;
      injectTest.apiStorageEndpoint.clientAdapter.client.storage.setItem(key, JSON.stringify(data));

      Promise.all([
        injectTest.apiStorageEndpoint.find('posts')
          .then(y => {
            expect(JSON.stringify(y)).toBe(JSON.stringify(data));
          }),
        injectTest.apiStorageEndpoint.find('posts', 0)
          .then(y => {
            expect(y.id).toBe(0);
          }),
        injectTest.apiStorageEndpoint.find('posts', criteria)
          .then(y => {
            expect(y.user).toBe(criteria.user);
            expect(y.comment).toBe(criteria.comment);
          }),
        injectTest.apiStorageEndpoint.find('posts', {user: 'john'})
          .then(y => {
            expect(y[0].user).toBe('john');
            expect(y.length).toBe(2);
          })
      ]).then(done);
    });

    it('Should find results with FileClientAdapter).', function(done) {
      let injectTest = container.get(InjectTest);
      let data = [{id: 0, user: 'john', comment: 'last'},
                  {id: 1, user: 'john', comment: 'first'},
                  {id: 2, user: 'jane'}];

      expect(injectTest.apiFileEndpoint instanceof Rest).toBe(true);
      expect(injectTest.apiFileEndpoint.clientAdapter instanceof FileClientAdapter).toBe(true);

      Promise.all([
        injectTest.apiFileEndpoint.find('posts')
          .then(y => {
            expect(JSON.stringify(y)).toBe(JSON.stringify(data));
          }),
        injectTest.apiFileEndpoint.find('posts', '0')
          .then(y => {
            expect(JSON.stringify(y[0])).toBe(JSON.stringify(data[0]));
          }),
        injectTest.apiFileEndpoint.find('posts', criteria)
          .then(y => {
            expect(JSON.stringify(y[0])).toBe(JSON.stringify(data[0]));
          })
      ]).then(done);
    });
  });

  describe('.update()', function() {
    it('Should update with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      let data = [{id: 0, user: 'john', comment: 'last'},
                  {id: 1, user: 'john', comment: 'first'},
                  {id: 2, user: 'jane'}];
      let key = `${injectTest.apiStorageEndpoint.clientAdapter.client.storageKey}posts`;
      injectTest.apiStorageEndpoint.clientAdapter.client.storage.setItem(key, JSON.stringify(data));

      Promise.all([
        injectTest.apiEndpoint.update('posts', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PUT');
            expect(y.path).toBe('/posts');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch('application/json');
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiHttpEndpoint.update('posts', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PUT');
            expect(y.path).toBe('/posts');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch('application/json');
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiStorageEndpoint.update('posts', criteria, body, options)
          .then(y => {
            expect(y.length).toBe(1);
            expect(y[0].user).toBe(undefined);
            expect(y[0].comment).toBe(undefined);
            expect(y[0].message).toBe('some');

            let res = JSON.parse(injectTest.apiStorageEndpoint.clientAdapter.client.storage.getItem(key));
            expect(res.length).toBe(3);
            expect(res[0].id).toBe(0);
            expect(res[0].message).toBe('some');
            expect(res[0].user).toBe(undefined);
            expect(res[0].comment).toBe(undefined);
            expect(res[1].message).toBeUndefined();
            expect(res[2].message).toBeUndefined();
          })
      ]).then(done);
    });
  });

  describe('.patch()', function() {
    it('Should patch with body (as json), criteria and options.', function(done) {
      let injectTest = container.get(InjectTest);

      let data = [{id: 0, user: 'john', comment: 'last'},
                  {id: 1, user: 'john', comment: 'first'},
                  {id: 2, user: 'jane'}];
      let key = `${injectTest.apiStorageEndpoint.clientAdapter.client.storageKey}posts`;
      injectTest.apiStorageEndpoint.clientAdapter.client.storage.setItem(key, JSON.stringify(data));

      Promise.all([
        injectTest.apiEndpoint.patch('post', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch('application/json');
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiHttpEndpoint.patch('post', criteria, body, options)
          .then(y => {
            expect(y.method).toBe('PATCH');
            expect(y.path).toBe('/post');
            expect(y.query.user).toBe(criteria.user);
            expect(y.query.comment).toBe(criteria.comment);
            expect(y.contentType).toMatch('application/json');
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiStorageEndpoint.patch('posts', criteria, body, options)
          .then(y => {
            expect(y.length).toBe(1);
            expect(y[0].user).toBe('john');
            expect(y[0].comment).toBe('last');
            expect(y[0].message).toBe('some');

            let res = JSON.parse(injectTest.apiStorageEndpoint.clientAdapter.client.storage.getItem(key));
            expect(res.length).toBe(3);
            expect(res[0].id).toBe(0);
            expect(res[0].message).toBe('some');
            expect(res[0].user).toBe('john');
            expect(res[0].comment).toBe('last');
            expect(res[1].message).toBeUndefined();
            expect(res[2].message).toBeUndefined();
          })
      ]).then(done);
    });
  });

  describe('.destroy()', function() {
    it('Should destroy with id and options .', function(done) {
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
    it('Should destroy with id and options.', function(done) {
      let injectTest = container.get(InjectTest);

      let data = [{id: 0, user: 'john', comment: 'last'},
                  {id: 1, user: 'john', comment: 'first'},
                  {id: 2, user: 'jane'}];

      let key = `${injectTest.apiStorageEndpoint.clientAdapter.client.storageKey}posts`;
      injectTest.apiStorageEndpoint.clientAdapter.client.storage.setItem(key, JSON.stringify(data));

      Promise.all([
        injectTest.apiHttpEndpoint.destroy('posts', 'id', options)
          .then(y => {
            expect(y.method).toBe('DELETE');
            expect(y.path).toBe('/posts/id');
            expect(JSON.stringify(y.query)).toBe('{}');
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiStorageEndpoint.destroy('posts', 0, options)
          .then(y => {
            expect(y[0].id).toBe(0);
            expect(y[0].user).toBe('john');
            expect(y[0].comment).toBe('last');

            let res = JSON.parse(injectTest.apiStorageEndpoint.clientAdapter.client.storage.getItem(key));
            expect(res.length).toBe(2);
            expect(res[0].id).toBe(1);
            expect(res[0].comment).toBe('first');
            expect(res[1].user).toBe('jane');
          })
      ]).then(done);
    });
  });

  describe('.create()', function() {
    it('Should create body (as json) and options.', function(done) {
      let injectTest = container.get(InjectTest);

      let data = [{id: 0, user: 'john', comment: 'last'},
                  {id: 1, user: 'john', comment: 'first'},
                  {id: 2, user: 'jane'}];

      let key = `${injectTest.apiStorageEndpoint.clientAdapter.client.storageKey}posts`;
      injectTest.apiStorageEndpoint.clientAdapter.client.storage.setItem(key, JSON.stringify(data));

      Promise.all([
        injectTest.apiEndpoint.create('posts', body, options)
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toMatch('application/json');
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiHttpEndpoint.create('posts', body, options)
          .then(y => {
            expect(y.method).toBe('POST');
            expect(y.path).toBe('/posts');
            expect(y.contentType).toMatch('application/json');
            expect(y.Authorization).toBe(options.headers['Authorization']);
          }),
        injectTest.apiStorageEndpoint.create('posts', {user: 'jim'}, options)
          .then(y => {
            expect(y.id).toBe(3);
            expect(y.user).toBe('jim');

            let res = JSON.parse(injectTest.apiStorageEndpoint.clientAdapter.client.storage.getItem(key));
            expect(res.length).toBe(4);
            expect(res[3].id).toBe(3);
            expect(res[3].user).toBe('jim');
          })
      ]).then(done);
    });
  });
});
