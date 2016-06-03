# Aurelia-api

[Open on github](https://github.com/SpoonX/aurelia-api)

Talking to your api shouldn't be difficult. You shouldn't have to repeat yourself. You shouldn't need nuclear power plants to make it easier. You should just be able to say "give me that thing!" and be done with it. If only we could do something about that...

You guessed it! We have something for that. Aurelia-api comes with a set of cool features that makes talking to APIs easy and fun.

Aurelia-api is a module wrapped around aurelia-fetch-client that allows you to:

* Perform the usual CRUD
* Supply criteria for your api
* Manage more than one endpoint
* Add defaults
* Add interceptors
* And more

## Important note

The package name has changed (to make life easier). For installation, use `jspm i aurelia-api` or (for webpack) `npm i aurelia-api --save`. Make sure you update all references to `spoonx/aurelia-api` and remove the `spoonx/` prefix (don't forget your config.js, package.json, imports and bundles).

## Example

```js
import {inject}   from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of('api'), Endpoint.of('auth'))
export class MyClass {
  constructor(apiEndpoint, authEndpoint) {
    this.apiEndpoint  = apiEndpoint;
    this.authEndpoint = authEndpoint;
  }

  createUser() {
    this.authEndpoint.post('user', {username: 'bob', password: 'Burger'})
      .then(result => console.log('User created!'));
  }

  attached() {
    this.apiEndpoint.find('product', {
      category: 5,
      name    : {contains: 'mouse'}
    })
    .then(console.log)
    .catch(console.error);
  }
}
```

## Quick Rest api overview

All methods return a Promise with the server response as an object as default.

````js
endpoint
  .client                                     // the httpClient instance
  .endpoint                                   // name of the endpoint
  .find(resource, criteria, options)          // GET
  .post(resource, body, options)              // POST
  .update(resource, criteria, body, options)  // PUT
  .patch(resource, criteria, body, options)   // PATCH
  .destroy(resource, criteria, options)       // DELETE
  .create(resource, body, options)            // POST
  .request(method, path, body, options)       // method
```

----------

**Aside:** Public SpoonX repositories are open to the community and actively maintained and used by the SpoonX company. They follow a strict deploy cycle with reviews and follow semantic versioning. This ensures code quality control and long term commitment.
