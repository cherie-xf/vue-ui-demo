import instance from './instance';
import { convertRESTAPI } from '../util';

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
  source_get,
  threat_get
};
