export default function request(url, body) {
  let search = ''
  if (body === undefined) {
    search = body
  } else if (body.constructor === Object) {
    for (const attr in body) {
      if (Object.prototype.hasOwnProperty.call(body, attr)) search += `${attr}=${body[attr]}&`
    }
  } else if (body.constructor === String) {
    search = body
  } else if (body) throw Error('You cannot serialize an array! wrap it in an object')
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    credentials: 'include',
    body: search,
  })
}

export function login() {
  return request('/user/login')
}

export function register(code) {
  return request('/user/register', `code=${code}`)
}

const API_AUTH_INFO = '/api/users/get'
export function getAuthInfo() {
  return request(API_AUTH_INFO)
}
