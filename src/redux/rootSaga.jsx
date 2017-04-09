import { fork,takeLatest, call, put, take, select } from 'redux-saga/effects'

export default function * () {
	yield [
		fork(loadUser),
		takeLatest('LOAD_DASHBOARD', loadDash)
	]
}

function* loadUser() {
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