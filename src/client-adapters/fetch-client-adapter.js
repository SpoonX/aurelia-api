import {buildQueryString} from 'aurelia-path';
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
  constructor(client = new FetchClientAdapter.Client) {
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
    let requestOptions = extend(true, {headers: {}}, this.defaults, options, {method, body});

    let contentType = requestOptions.headers && (requestOptions.headers['Content-Type'] || requestOptions.headers['content-type']);

    if (typeof body === 'object' && contentType) {
      requestOptions.body = contentType.toLowerCase() === 'application/json'
                          ? JSON.stringify(body)
                          : buildQueryString(body);
    }

    extend(true, requestOptions, options);
    if (!requestOptions.headers) delete requestOptions.headers;

    return this.client.fetch(path, requestOptions).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(error => null);
      }

      throw response;
    });
  }

  static Client = FetchClient;
}
