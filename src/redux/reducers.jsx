import { combineReducers } from 'redux'
import common from '../views/HomeRedux'
import search from '../views/SearchResultRedux'

export default combineReducers({
	common, search
})