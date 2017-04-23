import { fork, takeLatest, takeEvery, call, put, take, select } from 'redux-saga/effects'

import searchSaga from '../views/Saga'

export default function * () {
	yield [
		...searchSaga,
		takeEvery('SEARCH_END', searchEnd),
		takeLatest('LOAD_DASHBOARD', loadDash),
		fork(loadUser)
	]
}

function * searchEnd() {
	console.log(123);
	put({type: "END"})
}

function* loadUser() {
	console.log(456)
	const user = yield call( TravelServiceApi.getUser )
	yield put({type: "USER", payload: user})
}

function* loadDash() {
	console.log(999);
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