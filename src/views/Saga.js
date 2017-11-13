import { find } from 'lodash'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import { COMMON_SEARCH, SEARCH_ERROR, SEARCH_LOADING, SEARCH_READY } from './SearchResultRedux'
import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  NETWORK_ERROR,
  REG,
  REG_ERROR,
  REG_SUCCESS,
  AUTH_FETCH_FOLLOWING,
  AUTH_FETCH_FOLLOWING_READY,
  AUTH_FETCH_FOLLOWING_ERROR,
  USER_GET_AUTH_INFO,
} from './UserRedux'
import request, { login, register, getAuthInfo } from '../utils/request'
import { COMMON_FETCH, COMMON_ERROR, COMMON_LOADING, COMMON_READY } from './QueueRedux'
import { REPO_CONTENT_CHANGE, REPO_CONTENT_SHOW_FILE, REPO_CONTENT_READY } from './RepoRedux'
import { REQUEST_END, REQUEST_START } from '../redux/QueryRedux'
import API from '../constants/API'

/**
 * export the default saga array to take the action we need
 */
export default [
  takeEvery(COMMON_SEARCH, commonSearch),
  takeEvery(LOGIN, loginSaga),
  takeEvery(REG, registerSaga),
  takeEvery(COMMON_FETCH, commonFetch),
  takeEvery(AUTH_FETCH_FOLLOWING, userSaga),
  takeEvery(REPO_CONTENT_CHANGE, codeSaga),
  // takeEvery(REPO_CONTENT_INIT, codeSaga),
  // takeEvery(REPO_CONTENT_CHANGE, codeSaga),
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
      const rs = yield call(getAuthInfo)
      const detail = yield rs.json()
      // once we login, get the detail
      yield put({ type: USER_GET_AUTH_INFO, payload: { ...detail.data.data } })

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
  const { url, next } = action.payload
  const username = action.payload.data && action.payload.data.username
  yield put({ type: COMMON_LOADING, payload: { url } })
  try {
    if (next) {
      yield put({ type: REQUEST_START, payload: { next } })
    }
    const res = yield call(request, ...[action.payload.url, action.payload.data])
    const data = yield res.json()

    if (data.code >= 20000) {
      //  error occurs
      yield put({ type: COMMON_ERROR, payload: { url, data } })
    } else if (next !== undefined) {
      yield put({ type: REQUEST_END, payload: { next } })
      //  we have specified the reducer
      yield put({ type: next, payload: { data, login: username } })
    } else {
      //  common fetch
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
    const repoStore = yield select(s => s.repo)
    const data = []
    /**
     * get the detail iterator
     *  we just need the last three contents
     */
    let { path } = action.payload
    const { repo, owner } = action.payload

    for (let i = 0; i < 3; i++) {
      const { children: { length } } = getContent(path, repoStore.content)
      if (length === 0) {
        const res = yield call(request, ...[API.repo.getContent, {
          owner: owner || repoStore.owner,
          repo: repo || repoStore.name,
          path,
        }])
        const temp = yield res.json()

        /**
         * render the file content while starting with a file
         */
        console.info(temp.data.data)
        if (!Array.isArray(temp.data.data)) {
          yield put({ type: REPO_CONTENT_SHOW_FILE, payload: { path, file: temp.data.data } })
        } else {
          // when meet the directory, we push it into the array
          data.push({ data: temp, path })
        }
        if (path === '') break
      }
      path = path.replace(/\/([^/]*)$/, '')
    }
    data.reverse()
    yield put({ type: REPO_CONTENT_READY, payload: { data, path: '' } })
  } catch (e) {
    yield put({ type: NETWORK_ERROR, payload: {} })
  }
}

function getContent(name, context) {
  const [, p = '', left = ''] = name.match(/^\/?([\w-.$_()]+)(.*)/) || []
  const child = find(context.children, { path: p })
  if (child === undefined) return context
  else return getContent(left, child)
}
