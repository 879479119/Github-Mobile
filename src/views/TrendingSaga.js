import { put, takeEvery } from 'redux-saga/effects'
import { REPO_OR_DEV_FETCH, REPO_OR_DEV_LOADING, REPO_OR_DEV_ERROR, REPO_OR_DEV_READY } from './TrendingRedux'

/**
 * export the default saga array to take the action we need
 */
export default [
  takeEvery(REPO_OR_DEV_FETCH, trendingFetch),
]

/**
 * the most common way to release a request
 * @param action
 */
function* trendingFetch(action) {
  const { type, language, span } = action.payload
  yield put({ type: REPO_OR_DEV_LOADING })
  try {
    const url = `http://120.24.49.153:3000/trending${type !== 'repo' ? '/developers' : ''}/${language.toLowerCase().replace(' ', '+')}?span=${span}`
    const res = yield fetch(url, {
      CORS: 'CORS',
    })
    const data = yield res.json()
    // console.info(123,data)
    if (data.length <= 0) {
      yield put({ type: REPO_OR_DEV_ERROR })
    } else {
      yield put({ type: REPO_OR_DEV_READY, payload: { data } })
    }
  } catch (e) {
    yield put({ type: REPO_OR_DEV_ERROR })
  }
}

