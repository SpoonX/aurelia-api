import {configure} from '../src/aurelia-api';
import {Config} from '../src/config';
import {Container} from 'aurelia-dependency-injection';

describe('aurelia-api', function() {
  describe('configure()', function() {
    it('Should call callback with a config function', function(done) {
      configure(aurelia(), function(config) {
        expect(config).toBe(Config);

        done();
      });
    });

    it('Should call callback with a config instance', function() {
      let container = new Container();
      configure(aurelia(container), function(config) {
        expect(config instanceof Config).toBe(true);
      });

      expect(container.get(Config).configured).toBe(true);
    });
  });
});

function aurelia(container) {
  return {
    container: container || {
      get: function returnVal(val) {
        return val;
      }
    }
  };
}
