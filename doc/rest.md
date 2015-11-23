Docs for {`Rest`} client
=======

```javascript
import {Rest} from 'aurelia-api';
```

---------

.find(resource, criteria)
------

Find one or multiple resources.

### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you want.             |
| criteria  | object/integer | A specific ID, or object of supported filters. |

### Returns
A new `Promise` to be resolved with the data request, or rejected with an error.

### Examples
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

------

.create(resource, body)
------

A convenience method (naming) that does exactly the same as `.post()`. 

------

.post(resource, body)
------

Send a post request to supplied `resource`.

### Parameters

| Parameter | Type   | Description                                    |
| --------- | ------ | ---------------------------------------------- |
| resource  | string | The name of the resource you wish to post to.  |
| body      | object | The body to post.                              |

### Returns
A new `Promise` to be resolved with the server response, or rejected with an error.

### Examples
Here's an example on how to speak to a sails based API.

```javascript
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

------

.update(resource, criteria, body)
------

Send a post request to supplied `resource`.

### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you wish to update.   |
| criteria  | object/integer | A specific ID, or object of supported filters. |
| body      | object         | The new values for the records.                |

### Returns
A new `Promise` to be resolved with the server response, or rejected with an error.

### Examples
Here's an example on how to speak to a sails based API.

```javascript
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

---------

.destroy(resource, criteria)
------

Delete one or multiple resources.

### Parameters

| Parameter | Type           | Description                                    |
| --------- | -------------- | ---------------------------------------------- |
| resource  | string         | The name of the resource you wish to use.      |
| criteria  | object/integer | A specific ID, or object of supported filters. |

### Returns
A new `Promise` to be resolved with the data request, or rejected with an error.

### Examples
Here's an example on how to speak to a sails based API.

```javascript
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
