import instance from './instance';
import { convertRESTAPI } from '../util';

/** threat api */
function threat_get(opts) {
  return instance({
    method: 'get',
    url:  '/threat',
    opts: opts
  });
}

export {
  threat_get
};
