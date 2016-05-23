export class ClientAdapter {
  /**
   * Inject the client to use for requests.
   *
   * @param {any} client
   */
  constructor(client) {
    if (!client) {
      throw new TypeError('Contructor must provide a client to a client adapter');
    }

    if (typeof client.configure !== 'function') {
      throw new TypeError('Client implementation must provide a configure function');
    }

    let hasWithBaseUrl = false;
    client.configure(configure => {
      if (!configure || typeof configure.withBaseUrl !== 'function') {
        return;
      }
      hasWithBaseUrl = true;
    });
    if (!hasWithBaseUrl) {
      throw new TypeError('Client configure function implementation must return an builder with a builder.withBaseUrl function');
    }

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
