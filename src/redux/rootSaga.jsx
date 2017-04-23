import { fork, takeLatest, takeEvery, call, put, take, select } from 'redux-saga/effects'

import searchSaga from '../views/Saga'

export default function * () {
	yield [
		...searchSaga,
	]
}