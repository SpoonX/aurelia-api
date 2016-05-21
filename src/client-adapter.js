export class ClientAdapter {
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
    throw new Error('The client adapter must implement a request method.')
  }
}
