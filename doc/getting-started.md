# Getting started
This is a small guide that shows you how to use this module. 
In this document, we'll be modifying the skeleton to use aurelia-api.

## Prerequisites
For this guide, we assume you have the [aurelia skeleton](https://github.com/aurelia/skeleton-navigation) set up.
We'll also assume you have [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed, and that you're familiar with [installing modules](https://docs.npmjs.com/).

Finally, we'll assume that you have [jspm](jspm.io) installed. If you don't, run `npm i -g jspm`.

## Enough chat
Now it's time to start doing something

### Installation and configuration
First, head on over to your favorite terminal and run `jspm install github:spoonx/aurelia-api` from your project root.
This will install the module of which you're reading the getting-started right now. Woah!

### Reflect
Cool, the module has been installed... But now we want it to _do_ something, right?
Head on over to your favorite editor, open up the project and open file `src/users.js`.

As you can see, it's using `aurelia-fetch-client` to do the API calls to `https://api.github.com/`.
We're going to change that, and make use of `aurelia-api`.

### Adding an endpoint
In order for us to actually make calls to github, we'll have to configure an endpoint.

_**Info:** An endpoint is the url for a specific API. It can be the github API, your SSO server, API etc._

Let's configure a new endpoint by editing `main.js`:

```js
import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    
    // Add this:
    .plugin('spoonx/aurelia-api', configure => {
      config.registerEndpoint('github', 'https://api.github.com/');
    });

  aurelia.start().then(a => a.setRoot());
}
```

Aaaawesome. That wasn't really complicated, right? 
All we did, was tell aurelia to use the `spoonx/aurelia-api` plugin and register an endpoint. Now, let's use it!

### Using the plugin
Now head back to `src/users.js`. Change the file to look like this:

```javascript
import {inject} from 'aurelia-framework';
import {Endpoint} from 'spoonx/aurelia-api';
import 'fetch';

@inject(Endpoint.of('github'))
export class Users {
  heading = 'Github Users';
  users = [];

  constructor(githubEndpoint) {
    this.githubEndpoint = githubEndpoint;
  }

  activate() {
    return this.githubEndpoint.find('users')
      .then(users => this.users = users);
  }
}
```

Here's what we've changed. We've:

1. Swapped out `HttpClient` with `Endpoint`.
2. Altered the `@inject()` decorator to use the `Endpoint` resolver.
3. Completely removed the config calls in the constructor. (We added that in `src/main.js` earlier).
4. Assigned the endpoint to the viewModel.
5. Changed `this.http.fetch('users')` to `this.githubEndpoint.find('users')`. Notice that we removed the `.json()` step, too.

And done! We've now successfully swapped auth `aurelia-fetch-client` with `aurelia-api`.

Head back to your terminal, run `gulp watch` and open the project in your browser. Now, when you navigate to http://localhost:9000/#/users, you'll notice that absolutely nothing has changed; which was the point of this getting started.

## What's next?
There are some additional things you can do with the plugin.

### Multiple endpoints
You're allowed to register as many endpoints as you like:

```js
import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

    .plugin('spoonx/aurelia-api', configure => {
      config
        .registerEndpoint('github', 'https://api.github.com/')
        .registerEndpoint('auth', 'https://auth.example.io/')
        .registerEndpoint('api', 'https://api.example.io/');
    });

  aurelia.start().then(a => a.setRoot());
}
```

You can now use these by supplying the correct name in `@inject(Endpoint.of(name))` (replace `name` with `'github'`, `'auth'` or `'api'`).

### Default endpoint
Just using a single endpoint? Or mainly using a specific endpoint? That's fine.
You can register an endpoint as the default, which will be returned whenever you don't specify an endpoint name.
  

```js
import 'bootstrap';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()

    .plugin('spoonx/aurelia-api', configure => {
      config
        .registerEndpoint('github', 'https://api.github.com/')
        .registerEndpoint('auth', 'https://auth.example.io/')
        .registerEndpoint('api', 'https://api.example.io/')
        .setDefaultEndpoint('api');
    });

  aurelia.start().then(a => a.setRoot());
}
```

And when using it:

```javascript
import {inject} from 'aurelia-framework';
import {Endpoint} from 'spoonx/aurelia-api';
import 'fetch';

@inject(Endpoint.of(), Endpoint.of('github'))
export class MyClass {

  constructor(apiEndpoint, githubEndpoint) {
    // apiEndpoint, as that's the default.
  }
}
```
