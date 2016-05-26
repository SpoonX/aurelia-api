import {HttpClient} from 'aurelia-http-client';
import {ClientAdapter} from './client-adapter';

/**
* A jsonp client adapter for the aurelia-http-client
*/
export class JSONPClientAdapter extends ClientAdapter {
  /**
   * Optional default callbackParameterName
  */
  callbackParameterName;

  /**
   * Creates an instance of JSONPClientAdapter.
   *
   * @param {HttpClient} httpClient from aurelia-http-client
   */
  constructor(client = new HttpClient()) {
    super(client);
  }

  /**
   * Make a request to the server.
   *
   * @param {string} method, not used fixed to JSONP get
   * @param {string} path
   * @param {{}}     [body], not used
   * @param {{}}     [options] only callbackParameterName is used
   *
   * @return {Promise<Object|Error>}
   */
  request(method, path, body, options = {}) {
    let callbackParameterName = options.callbackParameterName
                              ? options.callbackParameterName
                              : this.callbackParameterName;

    return this.client.jsonp(path, callbackParameterName)
      .then(response => {
        if (response.statusCode >= 200 && response.statusCode < 400) {
          return response.response;
        }

        throw response;
      });
  }
}
