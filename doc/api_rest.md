# Rest class

```js
import {Rest} from 'aurelia-api';
```

----------

## Properties

### .client

| Type       | Description                          |
| ---------- | ------------------------------------ |
| HttpClient | The HttpClient instance for requests |

### .endpoint

| Type   | Description                                          |
| ------ | ---------------------------------------------------- |
| string | The endpoint for which the Rest client is registered |

### .defaults

| Type   | Description                                          |
| ------ | ---------------------------------------------------- |
| {}     |  The fetch client defaults to use for all request    |

----------

## Methods

All methods will:

* stringify the body, if it is an object and the `Content-Type` is set to `application/json` (the default).
* convert the body to querystring format, if the body is an object and the `Content-Type` is set to any other value.
* leave the body unchanged, if the `Content-Type` is not set or when the body is not an object.
* maintain trailing slashes of the resource parameter

All methods return a Promise with the server response parsed to an object if possible.

### .request(method, path[, body][, options])

Perform a request to the server.

#### Parameters

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| method    | string | Request method. POST, GET, DELETE, PUT etc. |
| path      | string | Path to make the request to.                |
| body      | object | The body (when permitted by method).        |
| options   | object | Additional options for the fetch            |

#### Returns

A new `Promise` to be resolved with the request, or rejected with an error.

#### Examples

Here's an example of a basic login call.

```javascript
import {Rest} from 'aurelia-api';

@inject(Rest)
export class MyViewModel {
  constructor (restClient) {
    restClient.request('POST', 'auth/login', {
        username: 'bob',
        password: 'Super secret'
      })
      .then(console.log)
      .catch(console.error);
  }
}
```

----------

### .find(resource, idOrCriteria[, options])
### .findOne(resource, id, criteria[, options])

Find one or multiple resources. (GET request)

#### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you want.             |
| id        | string/number  | A specific ID.                                 |
| criteria  | object         | Object of supported filters.                   |
| options   | object         | Additional options for the fetch               |

#### Returns

A new `Promise` to be resolved with the data request, or rejected with an error.

#### Examples

Here's an example on how to speak to a sails based API.

```javascript
import {Rest} from 'aurelia-api';

@inject(Rest)
export class MyViewModel {
  constructor (restClient) {
    restClient.find('product', {
        category: 5,
        name    : {contains: 'mouse'}
      })
      .then(console.log)
      .catch(console.error);
  }
}
```

----------

### .create(resource, body[, options])

A convenience method (naming) that does exactly the same as `.post()`.

----------

### .post(resource, body[, options])

Send a POST request to supplied `resource`.

#### Parameters

| Parameter | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| resource  | string | The name of the resource you wish to post to. |
| body      | object | The body to post.                             |
| options   | object | Additional options for the fetch              |

#### Returns

A new `Promise` to be resolved with the server response, or rejected with an error.

#### Examples

Here's an example on how to speak to a sails based API.

```js
import {Rest} from 'aurelia-api';

@inject(Rest)
export class MyViewModel {
  constructor (restClient) {
    restClient.post('product', {
        category: 5,
        name    : 'Optical mouse',
        price   : 4500
      })
      .then(console.log)
      .catch(console.error);
  }
}
```

----------

### .update(resource, idOrCriteria, body[, options])
### .updateOne(resource, id, criteria, body[, options])

Send a PUT request to supplied `resource`.

#### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you wish to update.   |
| id        | string/number  | A specific ID.                                 |
| criteria  | object         | Object of supported filters.                   |
| body      | object         | The new values for the records.                |
| options   | object         | Additional options for the fetch               |

#### Returns

A new `Promise` to be resolved with the server response, or rejected with an error.

#### Examples

Here's an example on how to speak to a sails based API.

```js
import {Rest} from 'aurelia-api';

@inject(Rest)
export class MyViewModel {
  constructor (restClient) {
    restClient.update('product', 17, {price: 4000})
      .then(console.log)
      .catch(console.error);
  }
}
```

----------

### .patch(resource, idOrCriteria, body[, options])
### .patchOne(resource, id, criteria, body[, options])

Send a PATCH request to supplied `resource`.

#### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you wish to update.   |
| id        | string/number  | A specific ID.                                 |
| criteria  | object         | Object of supported filters.                   |
| body      | object         | The new values for the records.                |
| options   | object         | Additional options for the fetch               |

#### Returns

A new `Promise` to be resolved with the server response, or rejected with an error.

#### Examples

Here's an example on how to speak to a sails based API.

```js
import {Rest} from 'aurelia-api';

@inject(Rest)
export class MyViewModel {
  constructor (restClient) {
    restClient.patch('product', 17, {price: 4000})
      .then(console.log)
      .catch(console.error);
  }
}
```

----------

### .destroy(resource, idOrCriteria[, options])
### .destroyOne(resource, id, criteria[, options])

Delete one or multiple resources. (DELETE request)

#### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you wish to use.      |
| id        | string/number  | A specific ID.                                 |
| criteria  | object         | Object of supported filters.                   |
| options   | object         | Additional options for the fetch               |

#### Returns

A new `Promise` to be resolved with the data request, or rejected with an error.

#### Examples

Here's an example on how to speak to a sails based API.

```js
import {Rest} from 'aurelia-api';

@inject(Rest)
export class MyViewModel {
  constructor (restClient) {
    restClient.destroy('product', 17)
      .then(console.log)
      .catch(console.error);
  }
}
```
