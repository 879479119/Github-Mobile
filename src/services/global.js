import request from '../utils/request'
import URLS from '../constants/URLS'

export function fetchUserInfo() {
  return request.post({
    url: URLS.USER_GET,
    data: {},
  })
}

export function logout() {
  return request.post({
    url: URLS.USER_LOGOUT,
    data: {},
    failed: () => { return null },
  })
}

export function login() {
  return request.post({
    url: URLS.USER_LOGIN,
    data: {},
  })
}

