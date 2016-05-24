import {ClientAdapter} from './client-adapter';
import {FileClient} from './file-client';

/**
* A file client adapter for the fetch-client
*/
export class FileClientAdapter extends ClientAdapter {
  /**
   * Creates an instance of FileClientAdapter.
   *
   * @param {FileClient} fileClient
   */
   constructor(client = new FileClient()) {
     super(client);
   }

  /**
   * Make a request to the file system.
   *
   * @param {string} method        -> not used, fixed to json/loadJson
   * @param {string} path
   * @param {{}}     [body]        -> not used
   * @param {{}}     [optionsCopy] -> not used
   *
   * @return {Promise<Object|Error>}
   */
  request(method, path, body, optionsCopy) {
    return this.client.loadJson(path);
  }
}
