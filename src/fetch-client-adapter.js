import {HttpClient as FetchClient} from 'aurelia-fetch-client';
import {ClientAdapter} from './client-adapter';

/**
* A fetch client adapter for the aurelia-fetch-client
*/
export class FetchClientAdapter extends ClientAdapter {
  /**
   * Creates an instance of FetchClientAdapter.
   *
   * @param {HttpClient} httpClient from aurelia-fetch-client
   */
  constructor(client = new FetchClient()) {
    super(client);
  }

  /**
   * Make a request to the server.
   *
   * @param {string} method
   * @param {string} path
   * @param {{}}     [body]
   * @param {{}}     [optionsCopy]
   *
   * @return {Promise<Object|Error>}
   */
  request(method, path, body, optionsCopy) {
    optionsCopy.method = method;

    if (typeof body === 'object') {
      optionsCopy.body = JSON.stringify(body);
      optionsCopy.headers['Content-Type'] = 'application/json';
    }

    return this.client.fetch(path, optionsCopy).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(error => null);
      }

      throw response;
    });
  }
}
