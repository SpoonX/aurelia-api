import extend from 'extend';
import {HttpClient} from 'aurelia-fetch-client';
import {ClientAdapter} from './client-adapter';

export class FetchClientAdapter extends ClientAdapter{

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

    requestOptions.method = method;

    if (typeof body === 'object') {
      requestOptions.body = JSON.stringify(body);
      requestOptions.headers['Content-Type'] = 'application/json';
    }

    return this.client.fetch(path, requestOptions).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json().catch(error => null);
      }

      throw response;
    });
  }
}
