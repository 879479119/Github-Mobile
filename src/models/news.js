import { fetchNewsList } from '../services/news'

export default {
  namespace: 'news',
  state: {
    loading: true,
    newsList: [],
    emotion: '1',
    orderBy: [0, 0],
    page: 1,
  },
  reducers: {
    updateNews(state, { payload }) {
      return { ...state, loading: false, newsList: payload }
    },
    change(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    * changeQuery({ payload }, { put, select }) {
      yield put({
        type: 'change',
        payload,
      })
      const range = yield select(s => s.global.dateRange)
      const query = yield select(({ news: n }) => ({
        emotion: n.emotion,
        orderBy: n.orderBy,
        page: n.page,
      }))
      const body = { ...query, dateRange: range }
      yield put({
        type: 'fetchNewsList',
        payload: body,
      })
    },
    /**
     * merge the query object by spread operator and request
     */
    * fetchNewsList({ payload }, { put, call }) {
      console.info(payload)
      const res = yield call(fetchNewsList, payload)
      yield put({ type: 'updateNews', payload: res })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname && /^\/opinion\/news/.test(pathname)) {
          dispatch({
            type: 'fetchNewsList',
            payload: {
              emotion: 1,
              dateRange: ['2017-01-01', '2017-02-01'],
              orderBy: [0, 0],
            },
          })
        }
      })
    },
  },
}
