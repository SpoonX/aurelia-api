<a name="3.2.0"></a>
# [3.2.0](https://github.com/SpoonX/aurelia-api/compare/v3.1.1...v3.2.0) (2018-05-28)


### Bug Fixes

* **config:** transfer defaults from the endpoint client configuration function to the endpoint defaults ([30dbbc5](https://github.com/SpoonX/aurelia-api/commit/30dbbc5))


### Features

* **rest:** add responseOutput to expose response object from fetch call ([8989df4](https://github.com/SpoonX/aurelia-api/commit/8989df4))



<a name="3.1.1"></a>
## [3.1.1](https://github.com/SpoonX/aurelia-api/compare/v3.1.0...v3.1.1) (2016-12-22)



<a name="3.1.0"></a>
# [3.1.0](https://github.com/SpoonX/aurelia-api/compare/v3.0.0...v3.1.0) (2016-12-20)


### Features

* **configure:** Add comments to RestOptions interface ([46d91f3](https://github.com/SpoonX/aurelia-api/commit/46d91f3))
* **configure:** Add restOptions param to registerEndpoint ([886e3e0](https://github.com/SpoonX/aurelia-api/commit/886e3e0))
* **configure:** restOptions param now has RestOptions type ([e84a259](https://github.com/SpoonX/aurelia-api/commit/e84a259))
* **rest:** add a flag to enable RFC6570 uri templates ([3cac6db](https://github.com/SpoonX/aurelia-api/commit/3cac6db))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/SpoonX/aurelia-api/compare/3.0.0-rc9...v3.0.0) (2016-10-05)


### Bug Fixes

* **rest:** enable content- type charset ([f5f4aec](https://github.com/SpoonX/aurelia-api/commit/f5f4aec))


### Features

* **configure:** allow configuration with an object ([6266e3e](https://github.com/SpoonX/aurelia-api/commit/6266e3e))



<a name="3.0.0-rc9"></a>
# [3.0.0-rc9](https://github.com/SpoonX/aurelia-api/compare/3.0.0-rc8...v3.0.0-rc9) (2016-09-06)


### Bug Fixes

* **rest:** convert number to string before joining path ([34e8ba1](https://github.com/SpoonX/aurelia-api/commit/34e8ba1))
* **rest:** don't set body when body===null ([6b061b1](https://github.com/SpoonX/aurelia-api/commit/6b061b1))


### Features

* **project:** proper types ([320b798](https://github.com/SpoonX/aurelia-api/commit/320b798))
* **rest:** add findOne, updateOne,..  methods to allow for path/id?filter=some ([b6beffb](https://github.com/SpoonX/aurelia-api/commit/b6beffb))



<a name="3.0.0-rc8"></a>
## [3.0.0-rc8](https://github.com/SpoonX/aurelia-api/compare/3.0.0-rc7...v3.0.0-rc8) (2016-08-03)


### Bug Fixes

* **rest:** don't replace //, avoid adding them instead ([2ce671a](https://github.com/SpoonX/aurelia-api/commit/2ce671a))



<a name="3.0.0-rc7"></a>
## [3.0.0-rc7](https://github.com/SpoonX/aurelia-api/compare/3.0.0-rc6...v3.0.0-rc7) (2016-08-03)


### Bug Fixes

* **rest:** maintain trailing slash to resource parameter ([4ec39a3](https://github.com/SpoonX/aurelia-api/commit/4ec39a3))



<a name="3.0.0-rc6"></a>
## [3.0.0-rc6](https://github.com/SpoonX/aurelia-api/compare/3.0.0-rc5...v3.0.0-rc6) (2016-07-22)


### Bug Fixes

* **build:** don't concat index.d.ts and exclude 'extends' in d.ts ([5306cfb](https://github.com/SpoonX/aurelia-api/commit/5306cfb))

### Features

* **project:** add gulp fixup-dts. removes unneeded/problematic external imports from d.ts ([5d1ce61](https://github.com/SpoonX/aurelia-api/commit/5d1ce61))


<a name="3.0.0-rc5"></a>
## [3.0.0-rc5](https://github.com/SpoonX/aurelia-api/compare/3.0.0-rc4...v3.0.0-rc5) (2016-07-01)


### Features

* **typings:** add typings.json to allow `typings i github:spoonx/aurelia-api` ([d0dd212](https://github.com/SpoonX/aurelia-api/commit/d0dd212))


<a name"3.0.0-rc4"></a>
### 3.0.0-rc4 (2016-06-09)


#### Bug Fixes

* **rest:** check for ['Content-Type'] and ['content-type'] ([8c87af2e](https://github.com/SpoonX/aurelia-api/commit/8c87af2e))


#### Features

* **project:** replace defaults, auto-convert objects for x-ww-form-urlencoded and json. allow  ([c68faffc](https://github.com/SpoonX/aurelia-api/commit/c68faffc))


#### Breaking Changes

* registerEndpoint - defaults will now completely replace standard deafults. Needed  to submit multipart/form-data.

 ([c68faffc](https://github.com/SpoonX/aurelia-api/commit/c68faffc))


<a name"3.0.0-rc3"></a>
### 3.0.0-rc3 (2016-06-02)


#### Features

* **project:** replace defaults, auto-convert objects for x-ww-form-urlencoded and json. allow  ([c68faffc](https://github.com/SpoonX/aurelia-api/commit/c68faffc))


#### Breaking Changes

* registerEndpoint - defaults will now completely replace standard deafults. Needed  to submit multipart/form-data.

 ([c68faffc](https://github.com/SpoonX/aurelia-api/commit/c68faffc))


<a name"3.0.0-rc2"></a>
### 3.0.0-rc2 (2016-05-04)


#### Bug Fixes

* **typings:** mark optional parameters ([18e86fc6](https://github.com/SpoonX/aurelia-api/commit/18e86fc6))


<a name"3.0.0-rc1"></a>
## 3.0.0-rc1 (2016-04-28)


#### Bug Fixes

* **Rest:** uppercase default methods ([a008536f](https://github.com/SpoonX/aurelia-api/commit/a008536f))


#### Features

* **Rest:** Add patch method, update docs for criteria implementation ([a0328aad](https://github.com/SpoonX/aurelia-api/commit/a0328aad))
* **project:**
  * bundle into single file ([b471d570](https://github.com/SpoonX/aurelia-api/commit/b471d570))
  * Rename project to remove spoonx prefix ([5ab4d3e1](https://github.com/SpoonX/aurelia-api/commit/5ab4d3e1))


#### Breaking Changes

* all imports need to use 'aurelia-api'

 ([b471d570](https://github.com/SpoonX/aurelia-api/commit/b471d570))


<a name"2.2.0"></a>
## 2.2.0 (2016-04-04)


#### Bug Fixes

* **d.ts:** exclude unnecessary imports. ([da3d23a8](https://github.com/SpoonX/aurelia-api/commit/da3d23a8))


#### Features

* **Rest:** add property 'endpoint' ([6b926212](https://github.com/SpoonX/aurelia-api/commit/6b926212))


<a name"2.1.2"></a>
### 2.1.2 (2016-03-25)


<a name"2.1.1"></a>
### 2.1.1 (2016-03-24)


#### Bug Fixes

* **config:** apply user endpoint defaults ([8b9344d7](https://github.com/SpoonX/aurelia-api/commit/8b9344d7))


<a name"2.1.0"></a>
## 2.1.0 (2016-03-23)

#### Features

* **project:** Added typescript support ([0581966](https://github.com/SpoonX/aurelia-api/commit/058196623407dc303e224fb19976ba6f5bf0a2fb))


<a name"2.0.9"></a>
### 2.0.9 (2016-03-20)


<a name"2.0.8"></a>
### 2.0.8 (2016-03-02)


### 2.0.7 (2016-02-25)


#### Bug Fixes

* **rest:** Nested querystrings ([56932391](https://github.com/SpoonX/aurelia-api/commit/569323912cc64bcf1b5f71cccb9ca0621e125095))


<a name"2.0.6"></a>
### 2.0.6 (2016-02-09)


<a name"2.0.5"></a>
### 2.0.5 (2016-02-04)


<a name"2.0.4"></a>
### 2.0.4 (2016-02-01)


#### Features

* **rest:** allow criteria as object for update and destroy ([2738f8ca](https://github.com/SpoonX/aurelia-api/commit/2738f8ca))


### 2.0.3 (2016-01-24)


### 2.0.2 (2016-01-17)


#### Bug Fixes

* **config:** Be more permissive when looking for the default endpoint ([5b0d0f53](https://github.com/SpoonX/aurelia-api/commit/5b0d0f53261fc2c6958d06a8a994ca1a2a470e58))


### 2.0.1 (2016-01-15)


#### Features

* **project:**
  * Added travis ([33707db4](https://github.com/SpoonX/aurelia-api/commit/33707db45c285ed9073514a7ab655b73eee7322d))
  * Added snyk ([421e14e8](https://github.com/SpoonX/aurelia-api/commit/421e14e8db9141b86d48965fc7e9a9b3ddf401f0))
* **test:** Added tests for plugin ([08beea51](https://github.com/SpoonX/aurelia-api/commit/08beea51a8ea6ddbcfb496a0a75693928b1c8f07))


## 2.0.0 (2016-01-15)


#### Features

* **config:** Added plugin configuration class ([d225ecc6](https://github.com/SpoonX/aurelia-api/commit/d225ecc6fd8543932941230db7875644339ec5c0))
* **endpoint:** Added an Endpoint resolver ([65419d45](https://github.com/SpoonX/aurelia-api/commit/65419d45181017654cac57bbf03aeaa59d74a56e))
* **plugin:** Expose Config and Resolver ([90d3de04](https://github.com/SpoonX/aurelia-api/commit/90d3de04ce4b0a4ee7a21c80dc906e0dc2cecaec))


### 1.2.2 (2016-01-02)


#### Bug Fixes

* **project:** Use system module format ([24bf4821](https://github.com/SpoonX/aurelia-api/commit/24bf4821171548315ccb6258494656e31b9b730f))


### 1.2.1 (2015-12-25)


#### Bug Fixes

* **rest:** Pass along undefiend for empty body; null is object. ([b10cd529](https://github.com/SpoonX/aurelia-api/commit/b10cd529c013bcda7159feee3e7b6eb95c848937))


## 1.2.0 (2015-12-24)


#### Bug Fixes

* **rest:**
  * Pass options to request method for methods without a body ([b7837ccb](https://github.com/SpoonX/aurelia-api/commit/b7837ccbce3c17c7051b6cb1ce99a6149edf84a8))
  * Reject on wrong statuscode ([7adaa65b](https://github.com/SpoonX/aurelia-api/commit/7adaa65b08a4dc7eeda1b7fd794057270c81c3fe))
  * Return null for failed json parsin ([12679c49](https://github.com/SpoonX/aurelia-api/commit/12679c49118a04c7c48c2d75d30f46d29de823dc))


#### Features

* **index:** Added configure convenience method ([6506ac25](https://github.com/SpoonX/aurelia-api/commit/6506ac25a749971e1165f69a28617f6865e07667))
* **rest:**
  * Added support for options ([5df99d0d](https://github.com/SpoonX/aurelia-api/commit/5df99d0d433686bc16b046703029cf3634eebcce))
  * Use HttpClient from DI, so config gets applied ([14adca60](https://github.com/SpoonX/aurelia-api/commit/14adca60cebbd923230801702312bab80da2778c))


### 1.1.2 (2015-12-23)


#### Bug Fixes

* **rest:** Reject on wrong statuscode ([7adaa65b](https://github.com/SpoonX/aurelia-api/commit/7adaa65b08a4dc7eeda1b7fd794057270c81c3fe))


### 1.1.1 (2015-12-22)


#### Bug Fixes

* **rest:** Return null for failed json parsin ([12679c49](https://github.com/SpoonX/aurelia-api/commit/12679c49118a04c7c48c2d75d30f46d29de823dc))


## 1.1.0 (2015-12-17)


#### Features

* **rest:** Added support for options ([5df99d0d](https://github.com/SpoonX/aurelia-api/commit/5df99d0d433686bc16b046703029cf3634eebcce))


## 1.0.0 (2015-12-17)


#### Features

* **index:** Added configure convenience method ([6506ac25](https://github.com/SpoonX/aurelia-api/commit/6506ac25a749971e1165f69a28617f6865e07667))
* **rest:** Use HttpClient from DI, so config gets applied ([14adca60](https://github.com/SpoonX/aurelia-api/commit/14adca60cebbd923230801702312bab80da2778c))
