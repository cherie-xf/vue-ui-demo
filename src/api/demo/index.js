import instance from './instance';
import { convertRESTAPI } from '../util';

/** logview */
function log_get(opts) {
  console.log('log_get', opts)
  return instance({
    method: 'get',
    url:  '/log',
    opts: opts,
  });
}

function log_get_srcip(opts){
  return instance({
    method: 'get',
    url: `/log?srcip=${opts.srcip}&avatarid=${opts.avatarid}`,
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
  log_get_srcip,
  source_get,
  threat_get
};
