import {buildQueryString} from 'aurelia-path';

/**
 * Rest class. A simple rest client to fetch resources
 */
export class Rest {
  /**
   * Inject the clientAdapter to use for requests.
   *
   * @type {ClientAdapter} clientAdapter The ClientAdapter to use
   * @type {string}        endpoint      The endpoint name
   */
  constructor(clientAdapter, endpoint) {
    this.clientAdapter   = clientAdapter;
    this.client          = clientAdapter.client;
    this.endpoint        = endpoint;
  }

  /**
   * Make a request to the server.
   *
   * @type {string} method     The fetch method
   * @type {string} path       Path to the resource
   * @type {{}}     [body]     The body to send if applicable
   * @type {{}}     [options]  Fetch options overwrites
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  request(method, path, body, options = {}) {
    return this.clientAdapter.request(method, path, body, options);
  }

  /**
   * Find a resource.
   *
   * @type {string}           resource  Resource to find in
   * @type {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @type {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  find(resource, criteria, options) {
    return this.request('GET', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @type {string} resource  Resource to create
   * @type {{}}     body      The data to post (as Object)
   * @type {{}}     [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  post(resource, body, options) {
    return this.request('POST', resource, body, options);
  }

  /**
   * Update a resource.
   *
   * @type {string}           resource  Resource to update
   * @type {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @type {object}           body      New data for provided criteria.
   * @type {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  update(resource, criteria, body, options) {
    return this.request('PUT', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Patch a resource.
   *
   * @type {string}           resource  Resource to patch
   * @type {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @type {object}           body      Data to patch for provided criteria.
   * @type {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  patch(resource, criteria, body, options) {
    return this.request('PATCH', getRequestPath(resource, criteria), body, options);
  }

  /**
   * Delete a resource.
   *
   * @type {string}           resource  The resource to delete
   * @type {{}|string|Number} criteria  Object for where clause, string / number for id.
   * @type {{}}               [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  destroy(resource, criteria, options) {
    return this.request('DELETE', getRequestPath(resource, criteria), undefined, options);
  }

  /**
   * Create a new instance for resource.
   *
   * @type {string} resource  The resource to create
   * @type {{}}     body      The data to post (as Object)
   * @type {{}}     [options] Extra fetch options.
   *
   * @return {Promise<Object>|Promise<Error>} Server response as Object
   */
  create(resource, body, options) {
    return this.post(...arguments);
  }
}

function getRequestPath(resource, criteria) {
  return (criteria !== undefined && criteria !== null
    ? resource + (typeof criteria !== 'object' ? `/${criteria}` : '?' + buildQueryString(criteria))
    : resource);
}
