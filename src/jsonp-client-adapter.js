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
   * @param {{}}     [optionsCopy] only callbackParameterName is used
   *
   * @return {Promise<Object|Error>}
   */
  request(method, path, body, optionsCopy) {
    return this.client.jsonp(path, optionsCopy.callbackParameterName
                                  ? optionsCopy.callbackParameterName
                                  : this.callbackParameterName)
      .then(response => {
        if (response.statusCode >= 200 && response.statusCode < 400) {
          return response.response;
        }

        throw response;
      });
  }
}
