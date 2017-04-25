export const COMMON_SEARCH = "COMMON_SEARCH"
export const SEARCH_LOADING = "SEARCH_LOADING"
export const SEARCH_READY = "SEARCH_READY"
export const SEARCH_ERROR = "SEARCH_ERROR"

export function commonSearch(data) {
	return (dispatch) => {
		dispatch({
			type: COMMON_SEARCH,
			payload: data
		})
	}
}

const initialState = {
	status: 0,
	result: null
}

export default function search(state= initialState, action) {
	switch (action.type){
		case COMMON_SEARCH: return state
		case SEARCH_LOADING: return Object.assign({}, state, {status: 1})
		case SEARCH_READY: return Object.assign({}, state, {status: 2, result: action.data})
		case SEARCH_ERROR: return Object.assign({}, state, {status: 3, result: action.data})
	}
	return state
}