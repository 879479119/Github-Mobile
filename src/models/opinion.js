
export const OPINION_ROUTE = [
  'profile',
  'news',
  'keywords',
  'keyword',
  'forewarning',
  'report',
  'setting',
]

export default {
  namespace: 'opinion',
  state: {
    menuList: OPINION_ROUTE,
    currentKey: 'profile',
    loading: true,
  },
  reducers: {
    updateMenu(state, { payload: { key } }) {
      return { ...state, loading: false, currentKey: key }
    },
  },
  effects: {
    updateCurrentKey({ payload: { key } }, { put }) {
      put({
        type: 'updateMenu',
        payload: { key },
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ key }) => {
        dispatch({ type: 'updateCurrentKey', payload: { key } })
      })
    },
  },
}
