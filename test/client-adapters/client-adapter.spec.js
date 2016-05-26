import {
  TestClientAdapter,
  ClientAdapterNoClient,
  FaultyClientAdapterNoClientConfigure,
  FaultyClientAdapterNoClientBuilder
} from '../resources/test-client-adapters';

describe('Client-Adapter', function() {
  describe('.constructor()', function() {
    it('Should not fail for a compliant client adapter.', function() {
      let properAdapter = () => new TestClientAdapter();
      expect(properAdapter).not.toThrow();
    });

    it('Should fail for a non-compliant client adapter.', function() {
      let noClient = () => new ClientAdapterNoClient();
      expect(noClient).toThrow();

      let clientWithoutConfigure = () => new FaultyClientAdapterNoClientConfigure();
      expect(clientWithoutConfigure).toThrow();

      let noClientBuilder = () => new FaultyClientAdapterNoClientBuilder();
      expect(noClientBuilder).toThrow();
    });
  });
});
