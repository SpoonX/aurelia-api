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
   constructor(client = new FileClientAdapter.Client) {
     super(client);
   }

  /**
   * Make a request to the file system.
   *
   * @param {string} method        -> not used, fixed to json/loadJson
   * @param {string} path
   *
   * @return {Promise<Object|Error>}
   */
  request(method, path) {
    return this.client.loadJson(path);
  }

   static Client = FileClient;
}
