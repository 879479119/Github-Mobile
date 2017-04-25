import { combineReducers } from 'redux'
import common from '../views/HomeRedux'
import search from '../views/SearchResultRedux'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
	common, search, router: routerReducer
})