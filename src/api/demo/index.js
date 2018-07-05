import instance from './instance';
import qs from 'qs';

import { convertRESTAPI } from '../util';

/** get user info(name avatar roles) */
function userinfo_get(opts) {
  return instance({
    method: 'get',
    url:  `/userinfo?username=${opts.token.split('_')[0]}`,
    opts: opts
  });
}

/** return a token */
function login_post(opts) {
  console.log('login post', opts)
   return instance({
    method: 'post',
    url:  '/login',
    opts: opts,
    data: qs.stringify({'username': opts.username, 'password': opts.password}),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  });
}

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

function log_get_srcip(opts){
  return instance({
    method: 'get',
    url: `/log?user=${opts.user}&srcip=${opts.srcip}&avatarid=${opts.avatarid}`,
    opts: opts
  });
}

export {
  log_get_srcip,
  userinfo_get,
  login_post,
  log_get,
  source_get,
  threat_get
};
