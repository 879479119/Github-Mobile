import {call, put, takeEvery} from "redux-saga/effects";
import {COMMON_SEARCH, SEARCH_ERROR, SEARCH_LOADING, SEARCH_READY} from "./SearchResultRedux";
import {LOGIN, LOGIN_ERROR, LOGIN_SUCCESS} from "./HomeRedux";
import request, {login} from "../utils/request";
import {message} from "antd";
import {COMMON_FETCH, COMMON_ERROR, COMMON_LOADING, COMMON_READY} from './RepoRedux'

/**
 * export the default saga array to take the action we need
 */
export default [
	takeEvery(COMMON_SEARCH,commonSearch),
	takeEvery(LOGIN,loginSaga),
	takeEvery(COMMON_FETCH,commonFetch),
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
			message.error('Re:login in 3s',3)
			setTimeout(()=>{
				window.location = ""
			},3000)
		}else{
			yield put({type: LOGIN_SUCCESS})
			message.success('Login success!',2)
		}
	}catch (e){
		yield put({type: LOGIN_ERROR})
		message.error('Re:login in 3s',3)
		setTimeout(()=>{
			window.location = ""
		},3000)
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
		// console.info(123,data)
		if(data.code >= 20000){
			yield put({type: COMMON_ERROR, payload: {url, data}})
		}else{
			yield put({type: COMMON_READY, payload: {url, data}})
		}
	}catch (e){
		yield put({type: COMMON_ERROR, payload: {url}})
	}
}

