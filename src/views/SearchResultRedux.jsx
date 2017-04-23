import { combineReducers } from 'redux'

export const COMMON_SEARCH = "COMMON_SEARCH"

export function commonQuery(data) {
	return (dispatch) => {
		dispatch({
			type: COMMON_SEARCH,
			payload: data
		})
	}
}

function search(state = {result: null}, action) {
	switch (action){
		case COMMON_SEARCH: return Object.assign({}, state, {})
		case "READY": return state
	}
	return state
}

export default combineReducers({
	search
})