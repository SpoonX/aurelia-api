import {HttpClient, HttpRequestMessage, Headers} from 'aurelia-http-client';
import {ClientAdapter} from './client-adapter';

export class HttpClientAdapter extends ClientAdapter {

  /**
   * Inject the httpClient to use for requests.
   *
   * @param {HttpClient} httpClient
   */
  constructor(client) {
    super(client ? client : new HttpClient());
  }

  /**
   * Make a request to the server.
   *
   * @param {string} method
   * @param {string} path
   * @param {{}}     [body]
   * @param {{}}     [optionsCopy]
   *
   * @return {Promise}
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
