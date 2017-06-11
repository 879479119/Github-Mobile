import {call, put, takeEvery} from "redux-saga/effects";
import {COMMON_SEARCH, SEARCH_ERROR, SEARCH_LOADING, SEARCH_READY} from "./SearchResultRedux";
import {LOGIN, LOGIN_ERROR, LOGIN_SUCCESS, NETWORK_ERROR, REG, REG_ERROR, REG_SUCCESS, AUTH_FETCH_INFO} from "../layouts/HomeRedux";
import request, {login, register} from "../utils/request";
import {COMMON_FETCH, COMMON_ERROR, COMMON_LOADING, COMMON_READY} from './QueueRedux'

import {API_AUTH_INFO} from "../layouts/Home"

/**
 * export the default saga array to take the action we need
 */
export default [
	takeEvery(COMMON_SEARCH, commonSearch),
	takeEvery(LOGIN, loginSaga),
	takeEvery(REG, registerSaga),
	takeEvery(COMMON_FETCH, commonFetch),
]

/**
 * handle the search action
 * @param action
 */
function* commonSearch(action) {
	//return when there is nothing to do
	if(!action.payload.q) return

	yield put({type: SEARCH_LOADING})
	try {
		let res = yield call(request, ...['/api/search/repo',`q=${action.payload.q}`])
		let data = yield res.json()
		if(data.code >= 20000){
			yield put({type: SEARCH_ERROR, data})
		}else{
			yield put({type: SEARCH_READY, data})
		}
	}catch (e){
		yield put({type: SEARCH_ERROR})
	}
}

/**
 * init the server when open a page
 */
function* loginSaga() {
	try {
		let res = yield call(login)
		let data = yield res.json()
		if(data.code >= 20000){
			yield put({type: LOGIN_ERROR})
		}else{
			yield put({type: LOGIN_SUCCESS})
			//once we login, get the detail
			yield put({type: COMMON_FETCH, payload: {url: API_AUTH_INFO}})
		}
	}catch (e){
		yield put({type: NETWORK_ERROR})
	}
}

function* registerSaga(action) {
	try {
		let res = yield call(register, action.payload.code)
		let data = yield res.json()
		if(data.code >= 20000){
			yield put({type: REG_ERROR})
		}else{
			yield put({type: REG_SUCCESS})
		}
	}catch (e){
		yield put({type: NETWORK_ERROR})
	}
}

/**
 * the most common way to release a request
 * @param action
 */
function *commonFetch(action) {
	let {url} = action.payload
	yield put({type: COMMON_LOADING, payload: {url}})
	try {
		let res = yield call(request, ...[action.payload.url, action.payload.data])
		let data = yield res.json()

		if(data.code >= 20000){
			yield put({type: COMMON_ERROR, payload: {url, data}})
		}else{
			yield put({type: COMMON_READY, payload: {url, data}})
		}
	}catch (e){
		yield put({type: COMMON_ERROR, payload: {url}})
	}
}

