export class ClientAdapter {
  /**
   * Inject the client to use for requests.
   *
   * @param {any} client
   */
  constructor(client) {
    this.client = client;
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
  request(method, path, body, optionsCopy) {
    throw new TypeError('The client adapter must implement a request method.');
  }
}
