import {ClientAdapter} from './client-adapter';
import {FileClient} from './file-client';

export class FileClientAdapter extends ClientAdapter {
  /**
   * Inject the storageClient to use for requests.
   *
   * @param {FileClient} FileClient
   */
  constructor() {
    super(new FileClient());
  }

  /**
   * Make a request to the file system.
   *
   * @param {string} method        -> not used, fixed to json/loadJson
   * @param {string} path
   * @param {{}}     [body]        -> not used
   * @param {{}}     [optionsCopy] -> not used
   *
   * @return {Promise}
   */
  request(method, path, body, optionsCopy) {
    return this.client.loadJson(path);
  }
}
