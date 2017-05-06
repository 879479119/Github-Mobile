import { combineReducers } from 'redux'
import common from '../views/HomeRedux'
import search from '../views/SearchResultRedux'
import queue from '../views/RepoRedux'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
	common, search, queue, router: routerReducer
})