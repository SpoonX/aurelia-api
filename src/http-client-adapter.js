import {HttpClient, HttpRequestMessage, Headers} from 'aurelia-http-client';
import {ClientAdapter} from './client-adapter';

/**
* A http client adapter for the aurelia-http-client
*/
export class HttpClientAdapter extends ClientAdapter {
  /**
   * Creates an instance of HttphClientAdapter.
   *
   * @param {HttpClient} httpClient from aurelia-http-client
   */
  constructor(client = new HttpClient()) {
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
    if (typeof body === 'object') {
      optionsCopy.body = JSON.stringify(body);
      optionsCopy.headers['Content-Type'] = 'application/json';
    }

    let msg = new HttpRequestMessage(method, path, body, new Headers(optionsCopy.headers));

    return this.client.send(msg)
      .then(response => {
        if (response.statusCode >= 200 && response.statusCode < 400) {
          return JSON.parse(response.response);
        }

        throw response;
      });
  }
}
