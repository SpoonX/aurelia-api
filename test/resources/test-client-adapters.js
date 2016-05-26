import {ClientAdapter} from '../../src/client-adapters/client-adapter';
import {TestClient, ClientNoBuilder} from './test-client';

export class TestClientAdapter extends ClientAdapter {
  constructor(client = new TestClient()) {
    super(client);
  }

  request(method, path, body, optionsCopy = {}) {
    return this.client.send(method, path, body, optionsCopy);
  }
}

export class ClientAdapterNoClient extends ClientAdapter {
  constructor() {
    super();
  }
}

export class FaultyClientAdapterNoClientConfigure extends ClientAdapter {
  constructor(client = {}) {
    super(client);
  }
}

export class FaultyClientAdapterNoClientBuilder extends ClientAdapter {
  constructor(client = new ClientNoBuilder()) {
    super(client);
  }
}
