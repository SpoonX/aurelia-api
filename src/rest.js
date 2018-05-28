import {buildQueryString, join} from 'aurelia-path';
import {HttpClient} from 'aurelia-fetch-client';
import extend from 'extend';

/**
 * Rest class. A simple rest client to fetch resources
 */
export class Rest {
  /**
   * The defaults to apply to any request
   *
   * @param {{}} defaults The default fetch request options
   */
  defaults: {} = {
    headers: {
      'Accept'      : 'application/json',
      'Content-Type': 'application/json'
    }
  };

  /**
   * The client for the rest adapter
   *
   * @param {HttpClient} client The fetch client
   *
   */
  client: HttpClient;

  /**
   * The name of the endpoint it was registered under
   *
   * @param {string} endpoint The endpoint name
   */
  endpoint: string;

  /**
   * true to use the traditional URI template standard (RFC6570) when building
   * query strings from criteria objects, false otherwise. Default is false.
   *
   * @param {boolean} useTraditionalUriTemplates The flag that enables RFC6570 URI templates.
   */
  useTraditionalUriTemplates: boolean;

  /**
   * Inject the httpClient to use for requests.
   *
   * @param {HttpClient} httpClient                    The httpClient to use
   * @param {string}     endpoint                      The endpoint name
   * @param {boolean}    [useTraditionalUriTemplates]  true to use the traditional URI
   *                                                   template standard (RFC6570) when building
   *                                                   query strings from criteria objects, false
   *                                                   otherwise. Default is false.
   */
  constructor(httpClient: HttpClient, endpoint: string, useTraditionalUriTemplates?: boolean) {
    this.client   = httpClient;
    this.endpoint = endpoint;
    this.useTraditionalUriTemplates = !!useTraditionalUriTemplates;
  }

  /**
   * Make a request to the server.
   *
   * @param {string}          method     The fetch method
   * @param {string}          path       Path to the resource
   * @param {{}}              [body]     The body to send if applicable
   * @param {{}}              [options]  Fetch request options overwrites
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  request(method: string, path: string, body?: {}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    let requestOptions = extend(true, {headers: {}}, this.defaults, options || {}, {method, body});
    let contentType    = requestOptions.headers['Content-Type'] || requestOptions.headers['content-type'];

    if (typeof body === 'object' && body !== null && contentType) {
      requestOptions.body = (/^application\/json/).test(contentType.toLowerCase())
                          ? JSON.stringify(body)
                          : buildQueryString(body);
    }

    return this.client.fetch(path, requestOptions).then((response: Response) => {
      if (response.status >= 200 && response.status < 400) {
        if (responseOutput) {
          responseOutput.response = response;
        }

        return response.json().catch(() => null);
      }

      throw response;
    });
  }

  /**
   * Find a resource.
   *
   * @param {string}                    resource  Resource to find in
   * @param {string|number|{}}          idOrCriteria  Object for where clause, string / number for id.
   * @param {{}}                        [options] Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  find(resource: string, idOrCriteria?: string|number|{}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.request('GET', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), undefined, options, responseOutput);
  }

  /**
   * Find a resource.
   *
   * @param {string}           resource    Resource to find in
   * @param {string|number}    id          String / number for id to be added to the path.
   * @param {{}}               [criteria]  Object for where clause
   * @param {{}}               [options]   Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  findOne(resource: string, id: string|number, criteria?: {}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.request('GET', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), undefined, options, responseOutput);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string}           resource  Resource to create
   * @param {{}}               [body]    The data to post (as Object)
   * @param {{}}               [options] Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  post(resource: string, body?: {}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.request('POST', resource, body, options, responseOutput);
  }

  /**
   * Update a resource.
   *
   * @param {string}           resource  Resource to update
   * @param {string|number|{}} idOrCriteria  Object for where clause, string / number for id.
   * @param {{}}               [body]    New data for provided idOrCriteria.
   * @param {{}}               [options] Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  update(resource: string, idOrCriteria?: string|number|{}, body?: {}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.request('PUT', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), body, options, responseOutput);
  }

  /**
   * Update a resource.
   *
   * @param {string}           resource   Resource to update
   * @param {string|number}    id         String / number for id to be added to the path.
   * @param {{}}               [criteria] Object for where clause
   * @param {{}}               [body]     New data for provided criteria.
   * @param {{}}               [options]  Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  updateOne(resource: string, id: string|number, criteria?: {}, body?: {}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.request('PUT', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), body, options, responseOutput);
  }

  /**
   * Patch a resource.
  *
   * @param {string}           resource   Resource to patch
   * @param {string|number|{}} [idOrCriteria] Object for where clause, string / number for id.
   * @param {{}}               [body]     Data to patch for provided idOrCriteria.
   * @param {{}}               [options]  Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  patch(resource: string, idOrCriteria?: string|number|{}, body?: {}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.request('PATCH', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), body, options, responseOutput);
  }

  /**
   * Patch a resource.
   *
   * @param {string}           resource   Resource to patch
   * @param {string|number}    id         String / number for id to be added to the path.
   * @param {{}}               [criteria] Object for where clause
   * @param {{}}               [body]     Data to patch for provided criteria.
   * @param {{}}               [options]  Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  patchOne(resource: string, id: string|number, criteria?: {}, body?: {}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.request('PATCH', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), body, options, responseOutput);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource   The resource to delete
   * @param {string|number|{}} [idOrCriteria] Object for where clause, string / number for id.
   * @param {{}}               [options]  Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  destroy(resource: string, idOrCriteria?: string|number|{}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.request('DELETE', getRequestPath(resource, this.useTraditionalUriTemplates, idOrCriteria), undefined, options, responseOutput);
  }

  /**
   * Delete a resource.
   *
   * @param {string}           resource   The resource to delete
   * @param {string|number}    id         String / number for id to be added to the path.
   * @param {{}}               [criteria] Object for where clause
   * @param {{}}               [options]  Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>|Promise<Error>} Server response as Object
   */
  destroyOne(resource: string, id: string|number, criteria?: {}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.request('DELETE', getRequestPath(resource, this.useTraditionalUriTemplates, id, criteria), undefined, options, responseOutput);
  }

  /**
   * Create a new instance for resource.
   *
   * @param {string}           resource  The resource to create
   * @param {{}}               [body]    The data to post (as Object)
   * @param {{}}               [options] Extra request options.
   * @param {{ response: Response}}              [responseOutput]  reference output for Response object
   *
   * @return {Promise<*>} Server response as Object
   */
  create(resource: string, body?: {}, options?: {}, responseOutput?: { response: Response}): Promise<any|Error> {
    return this.post(resource, body, options, responseOutput);
  }
}

/**
 * getRequestPath
 *
 * @param {string} resource
 * @param {boolean} traditional
 * @param {(string|number|{})} [idOrCriteria]
 * @param {{}} [criteria]
 * @returns {string}
 */
function getRequestPath(resource: string, traditional: boolean, idOrCriteria?: string|number|{}, criteria?: {}) {
  let hasSlash = resource.slice(-1) === '/';

  if (typeof idOrCriteria === 'string' || typeof idOrCriteria === 'number') {
    resource = `${join(resource, String(idOrCriteria))}${hasSlash ? '/' : ''}`;
  } else {
    criteria = idOrCriteria;
  }

  if (typeof criteria === 'object' && criteria !== null) {
    resource += `?${buildQueryString(criteria, traditional)}`;
  } else if (criteria) {
    resource += `${hasSlash ? '' : '/'}${criteria}${hasSlash ? '/' : ''}`;
  }

  return resource;
}
