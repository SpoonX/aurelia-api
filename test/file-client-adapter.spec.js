import {Config, Rest} from '../src/aurelia-api';
import {FileClientAdapter} from '../src/file-client-adapter';
import {FileClient} from '../src/file-client';
import {Container} from 'aurelia-dependency-injection';
import {settings} from './resources/settings';

let container = new Container();
let config    = container.get(Config);

config.registerEndpoint('api-file', settings.baseUrls.file, {}, FileClientAdapter);
let endpoint = config.getEndpoint('api-file');

describe('FileClientAdapter', function() {
  describe('.find()', function() {
    it('Should find results.', function(done) {
      expect(endpoint instanceof Rest).toBe(true);
      expect(endpoint.clientAdapter instanceof FileClientAdapter).toBe(true);
      expect(endpoint.clientAdapter.client instanceof FileClient).toBe(true);

      Promise.all([
        endpoint.find('posts')
          .then(y => {
            expect(JSON.stringify(y)).toBe(JSON.stringify(settings.data));
          }),
        endpoint.find('posts', '0')
          .then(y => {
            expect(JSON.stringify(y[0])).toBe(JSON.stringify(settings.data[0]));
          }),
        endpoint.find('posts', settings.criteria)
          .then(y => {
            expect(JSON.stringify(y[0])).toBe(JSON.stringify(settings.data[0]));
          })
      ]).then(done);
    });
  });
});
