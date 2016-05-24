import {ClientAdapter} from './client-adapter';
import {StorageClient} from './storage-client';

/**
* A storage client adapter for the storage-client
*/
export class StorageClientAdapter extends ClientAdapter {
  /**
  * Creates an instance of StorageClientAdapter.
   *
   * @param {StorageClient} StorageClient
   */
  constructor(client = new StorageClient()) {
    super(client);
  }

  /**
   * Make a request to the storage.
   *
   * @param {string} method
   * @param {string} path
   * @param {{}}     [body]
   *
   * @return {Promise<Object|Error>}
   */
  request(method, path, body) {
    return this.client.send(...arguments);
  }
}
