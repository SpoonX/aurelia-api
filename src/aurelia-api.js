import {Container} from 'aurelia-dependency-injection';
import {Config} from './config';

/**
 * Plugin configure
 *
 * @export
 * @param {{ container: Container}} frameworkConfig
 * @param {({defaultEndpoint: string, defaultBaseUrl: string, endpoints: Array<{name: string, endpoint: string, config: RequestInit, default: boolean, interceptors: {}}>} | function(config: Config): void)} configOrConfigure
 */
export function configure(
  frameworkConfig: {container: Container},
  configOrConfigure: {defaultEndpoint: string, defaultBaseUrl: string, endpoints: Array<{name: string, endpoint: string, config: RequestInit, default: boolean, interceptors: {}}>} | ((config: Config) => void)
) {
  let config = frameworkConfig.container.get(Config);

  if (typeof configOrConfigure === 'function') {
    configOrConfigure(config);

    return;
  }

  config.configure(configOrConfigure);
}
