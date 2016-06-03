# Usage

After configuring the endpoints, you'll probably want to use them, too.

## Get endpoint

There are currently two ways to get an endpoint.

### Config

You can use the `.getEndpoint()` method on the `Config` instance from aurelia-api.

```js
import {inject} from 'aurelia-framework';
import {Config} from 'aurelia-api';

@inject(Config)
export class MyClass {
  constructor(config) {
    this.apiEndpoint = config.getEndpoint('api');
  }
}
```

### Resolver

Aurelia-api also ships with a custom resolver that makes your code aesthetically pleasing.

```js
import {inject} from 'aurelia-framework';
import {Endpoint} from 'aurelia-api';

@inject(Endpoint.of('api'))
export class MyClass {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }
}
```
