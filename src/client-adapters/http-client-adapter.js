import {HttpClient, HttpRequestMessage, Headers} from 'aurelia-http-client';
import {ClientAdapter} from './client-adapter';
import extend from 'extend';

/**
* A http client adapter for the aurelia-http-client
*/
export class HttpClientAdapter extends ClientAdapter {
  /**
   * defaults for the http client
   * @type {Object}
   */
  defaults = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }

  /**
   * Creates an instance of HttphClientAdapter.
   *
   * @param {HttpClient} httpClient from aurelia-http-client
   */
  constructor(client = new HttpClientAdapter.Client) {
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

    let msg = new HttpRequestMessage(method, path, body, new Headers(requestOptions.headers));

    return this.client.send(msg)
      .then(response => {
        if (response.statusCode >= 200 && response.statusCode < 400) {
          return JSON.parse(response.response);
        }

        throw response;
      });
  }

  static Client = HttpClient;
}
