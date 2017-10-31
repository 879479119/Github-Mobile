import { message } from 'antd'
import { getItem, setItem } from '../utils/storage'
import config from '../constants/config'

const { baseUrl, authUrl } = config

export const USER_GET_AUTH_INFO = 'USER_GET_AUTH_INFO'
export const ROUTE = 'ROUTE'

/**
 * register controller
 */

export const REG = 'REG'
export const REG_ERROR = 'REG_ERROR'
export const REG_SUCCESS = 'REG_SUCCESS'

/**
 * login controller
 */
export const LOGIN = 'LOGIN'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const NETWORK_ERROR = 'NETWORK_ERROR'

/**
 * user controller
 */
export const AUTH_FETCH_INFO = 'AUTH_FETCH_INFO'
export const AUTH_FETCH_INFO_READY = 'AUTH_FETCH_INFO_READY'
export const AUTH_FETCH_INFO_ERROR = 'AUTH_FETCH_INFO_ERROR'

export const AUTH_FETCH_FOLLOWING = 'AUTH_FETCH_FOLLOWING'
export const AUTH_FETCH_FOLLOWING_READY = 'AUTH_FETCH_FOLLOWING_READY'
export const AUTH_FETCH_FOLLOWING_ERROR = 'AUTH_FETCH_FOLLOWING_ERROR'


const initialState = {
  login: null,
  id: null,
  avatar_url: 'https://avatars1.githubusercontent.com/u/12726506?v=4',
  gravatar_id: '',
  type: 'User',
  site_admin: false,
  name: null,
  company: null,
  blog: null,
  location: null,
  email: null,
  hireable: null,
  bio: null,
  public_repos: null,
  public_gists: null,
  followers: null,
  following: null, // count
  created_at: '2015-06-03T06:35:45Z',
  updated_at: '2017-10-18T12:02:24Z',

  loginStatus: null,
  followings: getItem('following') || [], // list
  stared: getItem('stared') || [], // list
}

export default function user(state = initialState, action) {
  switch (action.type) {
    /**
     * route part
     */
    case ROUTE: return Object.assign({}, state, { route: action.payload })
    /**
     * register part
     */
    case REG_SUCCESS:
      window.location = baseUrl
      return state
    case REG_ERROR:
      window.location = authUrl
      return state
    /**
     * login part
     */
    case LOGIN: return Object.assign({}, state)
    case LOGIN_ERROR:
      // clear the old cookies
      document.cookie = ''
      message.error('Redirect to auth in 5s', 5)
      setTimeout(() => {
        window.location = authUrl
      }, 5000)
      return Object.assign({}, state, { loginStatus: false })
    case LOGIN_SUCCESS:
      message.success('Login success!', 2)
      return Object.assign({}, state, { loginStatus: true, name: action.payload })
    case NETWORK_ERROR:
      message.error('Please check your network', 3)
      return Object.assign({}, state, { loginStatus: null })
    /**
     * local data storage and initialize
     */
    case AUTH_FETCH_FOLLOWING_READY:
      message.success('Your following list is initialized', 3)
      const followingList = action.payload.data.data
      setItem('following', followingList)
      return Object.assign({}, state, { following: followingList })
    /**
     * others
     */
    case USER_GET_AUTH_INFO:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const login = gname => dispatch => dispatch({ type: LOGIN, payload: { gname } })

export const register = code => dispatch => dispatch({ type: REG, payload: { code } })
