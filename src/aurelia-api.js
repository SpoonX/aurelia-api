import {Config} from './config';
import {Rest} from './rest';
import {Endpoint} from './endpoint';
import {ClientAdapter} from './client-adapters/client-adapter';
import {FetchClientAdapter} from './client-adapters/fetch-client-adapter';
import {HttpClientAdapter} from './client-adapters/http-client-adapter';
import {JSONPClientAdapter} from './client-adapters/jsonp-client-adapter';
import {StorageClientAdapter} from './client-adapters/storage-client-adapter';
import {FileClientAdapter} from './client-adapters/file-client-adapter';
import {StorageClient} from './client-adapters/storage-client';
import {FileClient} from './client-adapters/file-client';

function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config);

  configCallback(config);
}

export {
  configure,
  Config,
  Rest,
  Endpoint,
  ClientAdapter,
  FetchClientAdapter,
  HttpClientAdapter,
  JSONPClientAdapter,
  StorageClientAdapter,
  FileClientAdapter,
  StorageClient,
  FileClient
};
