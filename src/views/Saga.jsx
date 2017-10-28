import { call, put, takeEvery, select } from 'redux-saga/effects'
import { COMMON_SEARCH, SEARCH_ERROR, SEARCH_LOADING, SEARCH_READY } from './SearchResultRedux'
import { LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, NETWORK_ERROR, REG, REG_ERROR, REG_SUCCESS, AUTH_FETCH_FOLLOWING, AUTH_FETCH_FOLLOWING_READY, AUTH_FETCH_FOLLOWING_ERROR } from '../layouts/HomeRedux'
import request, { login, register } from '../utils/request'
import { COMMON_FETCH, COMMON_ERROR, COMMON_LOADING, COMMON_READY } from './QueueRedux'
import { REPO_CONTENT_INIT, REPO_CONTENT_READY, REPO_CONTENT_SHOW_FILE, REPO_CONTENT_CHANGE } from './RepoRedux'

import { API_AUTH_INFO } from '../layouts/Home'

/**
 * export the default saga array to take the action we need
 */
export default [
  takeEvery(COMMON_SEARCH, commonSearch),
  takeEvery(LOGIN, loginSaga),
  takeEvery(REG, registerSaga),
  takeEvery(COMMON_FETCH, commonFetch),
  takeEvery(AUTH_FETCH_FOLLOWING, userSaga),
  takeEvery(REPO_CONTENT_INIT, codeSaga),
  takeEvery(REPO_CONTENT_CHANGE, codeSaga),
]

/**
 * handle the search action
 * @param action
 */
function * commonSearch(action) {
  // return when there is nothing to do
  if (!action.payload.q) return

  yield put({ type: SEARCH_LOADING })
  try {
    const res = yield call(request, ...['/api/search/repo', `q=${action.payload.q}`])
    const data = yield res.json()
    if (data.code >= 20000) {
      yield put({ type: SEARCH_ERROR, data })
    } else {
      yield put({ type: SEARCH_READY, data })
    }
  } catch (e) {
    yield put({ type: SEARCH_ERROR })
  }
}

/**
 * init the server when open a page
 */
function * loginSaga() {
  try {
    const res = yield call(login)
    const data = yield res.json()
    if (data.code >= 20000) {
      yield put({ type: LOGIN_ERROR })
    } else {
      yield put({ type: LOGIN_SUCCESS })
      // once we login, get the detail
      yield put({ type: COMMON_FETCH, payload: { url: API_AUTH_INFO } })

      const following = yield select(s => s.common.following)

      if (following.length === 0) {
        // get the following people of us
        yield put({ type: AUTH_FETCH_FOLLOWING })
      }
      // get the stared repos the authorized person need
    }
  } catch (e) {
    yield put({ type: NETWORK_ERROR })
  }
}

function * registerSaga(action) {
  try {
    const res = yield call(register, action.payload.code)
    const data = yield res.json()
    if (data.code >= 20000) {
      yield put({ type: REG_ERROR })
    } else {
      yield put({ type: REG_SUCCESS })
    }
  } catch (e) {
    yield put({ type: NETWORK_ERROR })
  }
}

/**
 * the most common way to release a request
 * @param action
 */
function * commonFetch(action) {
  const { url } = action.payload
  yield put({ type: COMMON_LOADING, payload: { url } })
  try {
    const res = yield call(request, ...[action.payload.url, action.payload.data])
    const data = yield res.json()

    if (data.code >= 20000) {
      yield put({ type: COMMON_ERROR, payload: { url, data } })
    } else {
      yield put({ type: COMMON_READY, payload: { url, data } })
    }
  } catch (e) {
    yield put({ type: COMMON_ERROR, payload: { url } })
  }
}


/**
 * init the server when open a page
 */
function * userSaga() {
  try {
    const res = yield call(request, ...['/user/getFollowing'])
    const data = yield res.json()
    if (data.code >= 20000) {
      yield put({ type: AUTH_FETCH_FOLLOWING_ERROR })
    } else {
      yield put({ type: AUTH_FETCH_FOLLOWING_READY, payload: { data } })
    }
  } catch (e) {
    yield put({ type: AUTH_FETCH_FOLLOWING_ERROR })
  }
}


function * codeSaga(action) {
  try {
    const repo = yield select(s => s.repo)
    const data = []
    /**
     * get the detail iterator
     *  we just need the last three contents
     */
    let { path } = action.payload

    for (let i = 0; i < 3; i++) {
      const res = yield call(request, ...['/api/repos/getContent', {
        owner: repo.owner,
        repo: repo.repo,
        path,
      }])
      const temp = yield res.json()

      /**
       * render the file content while starting with a file
       */
      if (!Array.isArray(temp.data.data)) {
        yield put({ type: REPO_CONTENT_SHOW_FILE, payload: { file: temp.data.data } })
      } else {
        // when meet the directory, we push it into the array
        data.push(temp)
      }


      if (path === '') break
      path = path.replace(/\/([^/]*)$/, '')
    }

    yield put({ type: REPO_CONTENT_READY, payload: { data } })
  } catch (e) {
    yield put({ type: NETWORK_ERROR, payload: {} })
  }
}
