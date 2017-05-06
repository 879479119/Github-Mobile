export const REPO_CONTENT = "REPO_CONTENT"
export const COMMON_FETCH = "COMMON_FETCH"
export const COMMON_LOADING = "COMMON_LOADING"
export const COMMON_READY = "COMMON_READY"
export const COMMON_ERROR = "COMMON_ERROR"

export const COMMON_RELEASE = "COMMON_RELEASE"

export function fetchRepoContent(owner, repo, path= '') {
	return dispatch => dispatch({
		type: REPO_CONTENT,
		payload: {owner, repo, path}
	})
}

export function commonFetch(url, data) {
	return dispatch => dispatch({
		type: COMMON_FETCH,
		payload: {url, data}
	})
}

export function commonRelease(url) {
	return dispatch => dispatch({
		type: COMMON_RELEASE,
		payload: {url}
	})
}

const initialState = {
	length: 0,
	pending: 0,
	data: []
}

export default function queue(state= initialState, action) {
	let n = Object.assign({}, state)

	//start a new fetch request
	if(action.type === COMMON_FETCH){
		n.data.push({...action.payload, status: 0})
		n.length ++
		n.pending ++
		return n
	}

	if(action.type.search("COMMON_") < 0) return n
	//deal with the only one which is changed
	for(let i = 0;i < state.data.length;i ++){
		if(state.data[i].url === action.payload.url) {
			switch (action.type){
				case COMMON_LOADING:
					n.data[i].status = 1
					break
				case COMMON_READY:
					n.data[i] = {
						url: n.data[i].url,
						status: 3,
						result: action.payload.data
					}
					n.pending --
					break
				case COMMON_ERROR:
					n.data[i].status = 2
					n.pending --
					break

				//get the resources ans release the memory
				case COMMON_RELEASE:
					delete n.data[i]
					n.length --
					break
				default:
					break
			}
			return n
		}
	}
	return state
}