import {ClientAdapter} from './client-adapter';
import {StorageClient} from './storage-client';

export class StorageClientAdapter extends ClientAdapter {
  /**
   * Inject the storageClient to use for requests.
   *
   * @param {StorageClient} StorageClient
   */
  constructor(client) {
    super(client ? client : new StorageClient());
  }

  /**
   * Make a request to the storage.
   *
   * @param {string} method
   * @param {string} path
   * @param {{}}     [body]
   * @param {{}}     [optionsCopy]
   *
   * @return {Promise}
   */
  request(method, path, body, optionsCopy) {
    return this.client.send(...arguments);
  }
}
