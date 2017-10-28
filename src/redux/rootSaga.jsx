
import searchSaga from '../views/Saga'
import trendingSaga from '../views/TrendingSaga'

export default function * () {
  yield [
    ...searchSaga,
    ...trendingSaga,
  ]
}
