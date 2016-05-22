import {HttpClient, JSONPRequestMessage} from 'aurelia-http-client';
import {ClientAdapter} from './client-adapter';

export class JSONPClientAdapter extends ClientAdapter {

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
   * @param {string} method, not used fixed to JSONP get
   * @param {string} path
   * @param {{}}     [body], not used
   * @param {{}}     [optionsCopy] only callbackParameterName is used
   *
   * @return {Promise}
   */
  request(method, path, body, optionsCopy) {
    return this.client.jsonp(path, optionsCopy.callbackParameterName
                                  ? optionsCopy.callbackParameterName
                                  : 'callback')
      .then(response => {
        if (response.statusCode >= 200 && response.statusCode < 400) {
          return response.response;
        }

        throw response;
      });
  }
}