import instance from './instance';
import { convertRESTAPI } from '../util';

/** logview */
function log_get(opts) {
  return instance({
    method: 'get',
    url:  '/log',
    opts: opts
  });
}

/** source api */
function source_get(opts) {
  return instance({
    method: 'get',
    url:  '/source',
    opts: opts
  });
}

/** threat api */
function threat_get(opts) {
  return instance({
    method: 'get',
    url:  '/threat',
    opts: opts
  });
}

export {
  log_get,
  source_get,
  threat_get
};
