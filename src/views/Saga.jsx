import {call, put, takeEvery} from "redux-saga/effects";
import {COMMON_SEARCH, SEARCH_ERROR, SEARCH_LOADING, SEARCH_READY} from "./SearchResultRedux";

export default [
	takeEvery(COMMON_SEARCH,commonSearch),
]

function* commonSearch(action) {
	//return when there is nothing to do
	if(!action.payload) return

	yield put({type: SEARCH_LOADING})
	try {
		let res = yield call(fetch, ...['/api/search/repos', {
			method: "POST",
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			credentials: 'include',
			body: `q=${action.payload}`
		}])
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