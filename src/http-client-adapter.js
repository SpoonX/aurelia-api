import extend from 'extend';
import {HttpClient, HttpRequestMessage, Headers} from 'aurelia-http-client';
import {ClientAdapter} from './client-adapter';

export class HttpClientAdapter extends ClientAdapter{

  /**
   * Inject the httpClient to use for requests.
   *
   * @param {HttpClient} httpClient
   */
  constructor() {
    super();

    this.client = new HttpClient();
  }

  /**
   * Make a request to the server.
   *
   * @param {string} method
   * @param {string} path
   * @param {{}}     [body]
   * @param {{}}     [options]
   *
   * @return {Promise}
   */
  request(method, path, body, options = {}) {
    let requestOptions = extend(true, {}, this.defaults, options);

    if (typeof body === 'object') {
      requestOptions.body = JSON.stringify(body);
      requestOptions.headers['Content-Type'] = 'application/json';
    }

    let msg = new HttpRequestMessage(method, path, body, new Headers(requestOptions.headers));

    return this.client.send(msg)
      .then(response => {
        if (response.statusCode >= 200 && response.statusCode < 400) {
          return JSON.parse(response.response);
        }

        throw response;
      });
  }
}
