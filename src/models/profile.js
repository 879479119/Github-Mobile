import { fetchAll } from '../services/profile'

export default {
  namespace: 'profile',
  state: {
    loading: true,
    profileData: undefined,
    loadIndex: 0,
  },
  reducers: {
    updateProfile(state, { payload }) {
      return { ...state, loading: false, profileData: payload }
    },
  },
  effects: {
    * fetchAllData(op, { put, call }) {
      const res = yield call(fetchAll)
      yield put({ type: 'updateProfile', payload: res[0] })
    },
  },
  subscriptions: {
    setup({ history }) {
      return history.listen(({ pathname }) => {
        if (pathname && /^\/opinion\/profile/.test(pathname)) {
          // dispatch({ type: 'fetchAllData' })
        }
      })
    },
  },
}
