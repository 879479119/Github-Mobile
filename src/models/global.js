import moment from 'moment'
import * as globalService from '../services/global'

export default {
  namespace: 'global',
  state: {
    userInfo: {},
    dateRange: [moment().subtract(7, 'days'), moment()],
  },
  reducers: {
    save(state, { payload: { userInfo } }) {
      return { ...state, userInfo }
    },
    changeRange(state, { payload: { range } }) {
      return { ...state, dateRange: range }
    },
  },
  effects: {
    *updateRange({ payload }, { put }) {
      yield put({
        type: 'changeRange',
        payload,
      })
      yield put({
        type: 'news/changeQuery',
        payload: {},
      })
    },
    *getUserInfo({ payload }, { call, put }) {
      const data = yield call(globalService.fetchUserInfo, {})
      if (data && data.length > 0) {
        yield put({
          type: 'save',
          payload: {
            userInfo: data[0],
          },
        })
      } else {
        location.href = '/opinion/login'
      }
    },
    *logout({ payload }, { call }) {
      yield call(globalService.logout, {})
      location.href = '/opinion/login'
    },
    *login({ payload }, { call }) {
      yield call(globalService.login, {})
      location.href = '/opinion'
    },
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'getUserInfo', payload: {} })
    },
  },
}
