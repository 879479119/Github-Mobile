import {call, put, takeEvery, take} from "redux-saga/effects";
import {COMMON_SEARCH, SEARCH_ERROR, SEARCH_LOADING, SEARCH_READY} from "./SearchResultRedux";
import {LOGIN, LOGIN_ERROR, LOGIN_SUCCESS} from "./HomeRedux"
import request, {login} from '../utils/request'

export default [
	takeEvery(COMMON_SEARCH,commonSearch),
	takeEvery(LOGIN,loginSaga),
]

function* commonSearch(action) {
	//return when there is nothing to do
	if(!action.payload) return

	yield put({type: SEARCH_LOADING})
	try {
		let res = yield call(request, ...['/api/search/repos',`q=${action.payload}`])
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

function* loginSaga() {
	try {
		let res = yield call(login)
		let data = yield res.json()
		if(data.code >= 20000){
			yield put({type: LOGIN_ERROR})
		}else{
			yield put({type: LOGIN_SUCCESS})
		}
	}catch (e){
		yield put({type: LOGIN_ERROR})
	}
}

