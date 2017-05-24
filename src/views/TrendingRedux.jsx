export const REPO_OR_DEV_FETCH = "REPO_OR_DEV_FETCH"
export const REPO_OR_DEV_LOADING = "REPO_OR_DEV_LOADING"
export const REPO_OR_DEV_READY = "REPO_OR_DEV_READY"
export const REPO_OR_DEV_ERROR = "REPO_OR_DEV_ERROR"

export function fetchTrending(type, language, span) {
	return dispatch => dispatch({
		type: REPO_OR_DEV_FETCH,
		payload: {type, language, span}
	})
}

const initialState = {
	status: 0,
	type: 'repo',
	result: null
}

export default function trending(state= initialState, action) {
	switch (action.type){
		case REPO_OR_DEV_FETCH: return Object.assign({}, state, {type: action.payload.type})
		case REPO_OR_DEV_LOADING: return Object.assign({}, state, {status: 1})
		case REPO_OR_DEV_READY: return Object.assign({}, state, {status: 2, result: action.payload.data})
		case REPO_OR_DEV_ERROR: return Object.assign({}, state, {status: 3, result: action.data})
	}
	return state
}