import {HttpClient as FetchClient} from 'aurelia-fetch-client';
import {ClientAdapter} from './client-adapter';
import extend from 'extend';

/**
* A fetch client adapter for the aurelia-fetch-client
*/
export class FetchClientAdapter extends ClientAdapter {
  /**
   * defaults for the fetch client
   * @type {Object}
   */
  defaults = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

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
   * @param {{}}     [options]
   *
   * @return {Promise<Object|Error>}
   */
  request(method, path, body, options) {
    let requestOptions = extend(true, {}, this.defaults, {method, body});

    if (typeof body === 'object'
    && !(typeof Blob === 'function' && body instanceof Blob)
    && !(typeof FormData === 'function' && body instanceof FormData)) {
      requestOptions.body = JSON.stringify(body);
    }

    extend(true, requestOptions, options);

    return this.client.fetch(path, requestOptions).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(error => null);
      }

      throw response;
    });
  }
}
