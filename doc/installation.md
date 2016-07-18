# Installation

## Aureli-Cli

Run `npm i aurelia-api --save` from your project root.

Aurelia-api makes use of `extends`. So, add following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`.

```js
"dependencies": [
  // ...
  'extends',
  'aurelia-api',
  // ...
],
```

## Jspm

Run `jspm i aurelia-api`

Add `aurelia-api` to the `bundles.dist.aurelia.includes` section of `build/bundles.js`.

If the installation results in having forks, try resolving them by running:

```sh
jspm inspect --forks
jspm resolve --only registry:package-name@version
```

E.g.

```sh
jspm inspect --forks
>     Installed Forks
>         npm:aurelia-dependency-injection 1.0.0-beta.1.2.3 1.0.0-beta.2.1.0

jspm resolve --only npm:aurelia-dependency-injection@1.0.0-beta.2.1.0
```

## Webpack

Run `npm i aurelia-api --save` from your project root.

Add `'aurelia-api'` in the `coreBundles.aurelia section` of your `webpack.config.js`.

## Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, add to your `typings.json`:

```js
"aurelia-api": "github:spoonx/aurelia-api",
```

and run `typings i`

or run

```sh
typings i github:spoonx/aurelia-api
```
