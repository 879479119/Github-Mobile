import { combineReducers } from 'redux'
import common from '../layouts/HomeRedux'
import search from '../views/SearchResultRedux'
import queue from '../views/QueueRedux'
import user from '../views/UserRedux'
import repo from '../views/RepoRedux'
import trending from '../views/TrendingRedux'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
	common,
	search,
	queue,
	user,
	repo,
	trending,
	router: routerReducer
})