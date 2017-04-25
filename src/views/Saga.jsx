import {call, put, takeEvery} from "redux-saga/effects";
import {COMMON_SEARCH, SEARCH_ERROR, SEARCH_LOADING, SEARCH_READY} from "./SearchResultRedux";
import {LOGIN, LOGIN_ERROR, LOGIN_SUCCESS} from "./HomeRedux";
import request, {login} from "../utils/request";
import {message} from "antd";

/**
 * export the default saga array to take the action we need
 */
export default [
	takeEvery(COMMON_SEARCH,commonSearch),
	takeEvery(LOGIN,loginSaga),
]

/**
 * handle the search action
 * @param action
 */
function* commonSearch(action) {
	//return when there is nothing to do
	if(!action.payload) return

	yield put({type: SEARCH_LOADING})
	try {
		let res = yield call(request, ...['/api/search/repo',`q=${action.payload}`])
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

