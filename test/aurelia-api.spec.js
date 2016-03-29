import {configure, Config, Rest, Endpoint} from '../src/aurelia-api';
import {Container} from 'aurelia-dependency-injection';

describe('aurelia-api', function() {
  describe('export', function() {
    it('Should export configure', function() {
      expect(configure).toBeDefined();
    });

    it('Should export Config', function() {
      expect(Config).toBeDefined();
    });

    it('Should export Rest', function() {
      expect(Rest).toBeDefined();
    });

    it('Should export Endpoint', function() {
      expect(Endpoint).toBeDefined();
    });
  });

  describe('configure()', function() {
    it('Should call callback with a config function', function(done) {
      configure(aurelia(), function(config) {
        expect(config).toBe(Config);

        done();
      });
    });

    it('Should call callback with a config instance', function(done) {
      configure(aurelia(new Container()), function(config) {
        expect(config instanceof Config).toBe(true);

        done();
      });
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
