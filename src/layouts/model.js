import { message } from 'antd'
import * as service from './service'
import { getItem, setItem } from '../utils/storage'

export default {
  namespace: 'common',
  state: {
    route: '/home',
    loginStatus: null,
    language: 'en',
    name: undefined,
    following: getItem('following') || [],
    stared: getItem('stared') || [],
  },
  reducers: {
    updateShown(state, { payload: { list } }) {
      return { ...state, shownList: list }
    },
    ROUTE(state, action) {
      return Object.assign({}, state, { route: action.payload })
    },
    REG_SUCCESS(state, action) {
      window.location = 'http://github.jian-gamestudio.cn/'
      return state
    },

    REG_ERROR(state, action) {
      window.location = 'https://github.com/login/oauth/authorize?scope=admin&client_id=af4fdd0b77c3a4073f0c'
      return state
    },

    LOGIN(state, action) { return Object.assign({}, state) },
    LOGIN_ERROR(state, action) {
      document.cookie = ''
      message.error('Redirect to auth in 5s', 5)
      setTimeout(() => {
        window.location = 'https://github.com/login/oauth/authorize?scope=admin&client_id=af4fdd0b77c3a4073f0c'
      }, 5000)
      return Object.assign({}, state, { loginStatus: false })
    },

    LOGIN_SUCCESS(state, action) {
      message.success('Login success!', 2)
      return Object.assign({}, state, { loginStatus: true })
    },
    NETWORK_ERROR(state, action) {
      message.error('Please check your network', 3)
      return Object.assign({}, state, { loginStatus: null })
    },
    AUTH_FETCH_FOLLOWING_READY(state, action) {
      message.success('Your following list is initialized', 3)
      const followingList = action.payload.data.data
      setItem('following', followingList)
      return Object.assign({}, state, { following: followingList })
    },
    CHANGE_LANGUAGE(state, action) {
      window.localStorage.setItem('language', action.payload)
      return Object.assign({}, state, { language: action.payload })
    },
  },
  effects: {
    *fetchNewList({ payload }, { call, put }) {
      const data = yield call(service.fetchNewList, {})
      if (data.length > 0) {
        yield put({
          type: 'updateShown',
          payload: { list: data },
        })
      }
    },
  },
}
