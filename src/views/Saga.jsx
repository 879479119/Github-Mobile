import { fork,takeLatest, call, put, take, takeEvery, select } from 'redux-saga/effects'
import { COMMON_SEARCH } from './SearchResultRedux'

export default [
	takeEvery(COMMON_SEARCH,commonSearch),
]

function* commonSearch(action) {
	// let res = yield call(fetch, ...['/api/search/repo', {
	// 	method: "POST",
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded'
	// 	},
	// 	credentials: 'include',
	// 	body: `q=${action.payload}`
	// }])

	let res = yield fetch('/api/search/repo', {
		method: "POST",
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		credentials: 'include',
		body: `q=${action.payload}`
	})

	let data = yield res.json()
	yield put({type: "READY", data})
}

function* loadUser(data) {
	console.log(data)
	const user = yield call( TravelServiceApi.getUser )
	yield put({type: "USER", payload: user})
}

function* loadDash() {
	try {
		yield take('USER')
		const user = yield select(state => state.user)
		const depart = yield call(TravelServiceApi.getDeparture, user)
		yield put({type: "SUCCESS", payload: depart})
	}catch (err){
	}
}

class TravelServiceApi {
	static getUser() {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					email : "somemockemail@email.com",
					repository: "http://github.com/username"
				});
			}, 3000);
		});
	}

	static getDeparture(user) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					userID : user.email,
					flightID : 'AR1973',
				date : '10/27/2016 16:00PM'
			});
			}, 2500);
		});
	}
}