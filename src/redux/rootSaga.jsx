import { fork, takeLatest, takeEvery, call, put, take, select } from 'redux-saga/effects'

import searchSaga from '../views/Saga'
import trendingSaga from '../views/TrendingSaga'

export default function * () {
	yield [
		...searchSaga,
		...trendingSaga
	]
}