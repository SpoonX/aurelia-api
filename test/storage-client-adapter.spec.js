import {Config, Rest} from '../src/aurelia-api';
import {StorageClientAdapter} from '../src/storage-client-adapter';
import {StorageClient} from '../src/storage-client';
import {Container} from 'aurelia-dependency-injection';
import {settings} from './resources/settings';

let container = new Container();
let config    = container.get(Config);

config.registerEndpoint('api-storage', settings.baseUrls.api, {}, StorageClientAdapter);
let endpoint = config.getEndpoint('api-storage');
let key = `${endpoint.clientAdapter.client.getStorageKey()}posts`;

describe('StorageClientAdapter', function() {
  beforeEach(function() {
    endpoint.clientAdapter.client.storage.setItem(key, JSON.stringify(settings.data));
  });

  describe('.find()', function() {
    it('Should find results with StorageClientAdapter.', function(done) {
      expect(endpoint instanceof Rest).toBe(true);
      expect(endpoint.clientAdapter instanceof StorageClientAdapter).toBe(true);
      expect(endpoint.clientAdapter.client instanceof StorageClient).toBe(true);

      Promise.all([
        endpoint.find('posts')
          .then(y => {
            expect(JSON.stringify(y)).toBe(JSON.stringify(settings.data));
          }),
        endpoint.find('posts', 0)
          .then(y => {
            expect(y.id).toBe(0);
          }),
        endpoint.find('posts', settings.criteria)
          .then(y => {
            expect(y.user).toBe(settings.criteria.user);
            expect(y.comment).toBe(settings.criteria.comment);
          }),
        endpoint.find('posts', {user: 'john'})
          .then(y => {
            expect(y[0].user).toBe('john');
            expect(y.length).toBe(2);
          })
      ]).then(done);
    });
  });

  describe('.update()', function() {
    it('Should update with body (as json), criteria.', function(done) {
      Promise.all([
        endpoint.update('posts', settings.criteria, settings.body)
          .then(y => {
            expect(y.length).toBe(1);
            expect(y[0].user).toBe(undefined);
            expect(y[0].comment).toBe(undefined);
            expect(y[0].message).toBe('some');

            let res = JSON.parse(endpoint.clientAdapter.client.storage.getItem(key));
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
    it('Should patch with body (as json), criteria.', function(done) {
      Promise.all([
        endpoint.patch('posts', settings.criteria, settings.body)
          .then(y => {
            expect(y.length).toBe(1);
            expect(y[0].user).toBe('john');
            expect(y[0].comment).toBe('last');
            expect(y[0].message).toBe('some');

            let res = JSON.parse(endpoint.clientAdapter.client.storage.getItem(key));
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
    it('Should destroy with id.', function(done) {
      Promise.all([
        endpoint.destroy('posts', 0)
          .then(y => {
            expect(y[0].id).toBe(0);
            expect(y[0].user).toBe('john');
            expect(y[0].comment).toBe('last');

            let res = JSON.parse(endpoint.clientAdapter.client.storage.getItem(key));
            expect(res.length).toBe(2);
            expect(res[0].id).toBe(1);
            expect(res[0].comment).toBe('first');
            expect(res[1].user).toBe('jane');
          })
      ]).then(done);
    });
  });

  describe('.create()', function() {
    it('Should create body (as json).', function(done) {
      Promise.all([
        endpoint.create('posts', {user: 'jim'})
          .then(y => {
            expect(y.id).toBe(3);
            expect(y.user).toBe('jim');

            let res = JSON.parse(endpoint.clientAdapter.client.storage.getItem(key));
            expect(res.length).toBe(4);
            expect(res[3].id).toBe(3);
            expect(res[3].user).toBe('jim');
          })
      ]).then(done);
    });
  });
});
