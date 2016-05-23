import {HttpClient} from 'aurelia-fetch-client';
import {ClientAdapter} from './client-adapter';

export class FetchClientAdapter extends ClientAdapter {

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
