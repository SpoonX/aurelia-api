# Docs for {`Rest`} client

```javascript
import {Rest} from 'spoonx/aurelia-api';
```

----------

## .request(method, path[, body][, options])

Perform a request to the server.

### Parameters

| Parameter | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| method    | string | Request method. POST, GET, DELETE, PUT etc. |
| path      | string | Path to make the request to.                |
| body      | object | The body (when permitted by method).        |
| options   | object | Additional options for the fetch            |

### Returns

A new `Promise` to be resolved with the request, or rejected with an error.

### Examples

Here's an example of a basic login call.

```javascript
import {Rest} from 'spoonx/aurelia-api';

@inject(Rest)
export class MyViewModel {
  constructor (restClient) {
    restClient.request('post', 'auth/login', {
        username: 'bob',
        password: 'Super secret'
      })
      .then(console.log)
      .catch(console.error);
  }
}
```

----------

## .find(resource, criteria[, options])

Find one or multiple resources.

### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you want.             |
| criteria  | object/integer | A specific ID, or object of supported filters. |
| options   | object         | Additional options for the fetch               |

### Returns

A new `Promise` to be resolved with the data request, or rejected with an error.

### Examples

Here's an example on how to speak to a sails based API.

```javascript
import {Rest} from 'spoonx/aurelia-api';

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

## .create(resource, body[, options])

A convenience method (naming) that does exactly the same as `.post()`. 

----------

## .post(resource, body[, options])

Send a post request to supplied `resource`.

### Parameters

| Parameter | Type   | Description                                   |
| --------- | ------ | --------------------------------------------- |
| resource  | string | The name of the resource you wish to post to. |
| body      | object | The body to post.                             |
| options   | object | Additional options for the fetch              |

### Returns

A new `Promise` to be resolved with the server response, or rejected with an error.

### Examples

Here's an example on how to speak to a sails based API.

```javascript
import {Rest} from 'spoonx/aurelia-api';

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

## .update(resource, criteria, body[, options])

Send a post request to supplied `resource`.

### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you wish to update.   |
| criteria  | object/integer | A specific ID, or object of supported filters. |
| body      | object         | The new values for the records.                |
| options   | object         | Additional options for the fetch               |

### Returns

A new `Promise` to be resolved with the server response, or rejected with an error.

### Examples

Here's an example on how to speak to a sails based API.

```javascript
import {Rest} from 'spoonx/aurelia-api';

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

## .destroy(resource, criteria[, options])

Delete one or multiple resources.

### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you wish to use.      |
| criteria  | object/integer | A specific ID, or object of supported filters. |
| options   | object         | Additional options for the fetch               |

### Returns

A new `Promise` to be resolved with the data request, or rejected with an error.

### Examples

Here's an example on how to speak to a sails based API.

```javascript
import {Rest} from 'spoonx/aurelia-api';

@inject(Rest)
export class MyViewModel {
  constructor (restClient) {
    restClient.destroy('product', 17)
      .then(console.log)
      .catch(console.error);
  }
}
```
