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

export const CHANGE_TREND_SPAN = "CHANGE_TREND_SPAN"
export const CHANGE_TREND_LANG = "CHANGE_TREND_LANG"

export const changeSpan = span => dispatch => dispatch({type: CHANGE_TREND_SPAN, payload: span})
export const changeLang = lang => dispatch => dispatch({type: CHANGE_TREND_LANG, payload: lang})

const initialState = {
	status: 0,
	type: 'repo',
	result: null,
	span: 'daily',
	language: ''
}

export default function trending(state= initialState, action) {
	switch (action.type){
		case REPO_OR_DEV_FETCH: return Object.assign({}, state, {type: action.payload.type})
		case REPO_OR_DEV_LOADING: return Object.assign({}, state, {status: 1})
		case REPO_OR_DEV_READY: return Object.assign({}, state, {status: 2, result: action.payload.data})
		case REPO_OR_DEV_ERROR: return Object.assign({}, state, {status: 3, result: action.data})
		//filter
		case CHANGE_TREND_SPAN: return Object.assign({}, state, {span: action.payload})
		case CHANGE_TREND_LANG: return Object.assign({}, state, {language: action.payload})
	}
	return state
}