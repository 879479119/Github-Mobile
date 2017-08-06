export const GRAPH_COMMIT_SELECT = "GRAPH_COMMIT_SELECT"

export const graph_commit_select = (index) => dispatch => dispatch({
	type: GRAPH_COMMIT_SELECT,
	payload: {index}
})


const initialState = {
	user: {
		watch: false,
		star: false,
		fork: false,
	},
	code: {
		branch: 'master',
		path: '',
		sha: ''
	},
}


export default function repo(state= initialState, action) {
	switch (action.type){
		case GRAPH_COMMIT_SELECT: return Object.assign({}, state, {
			graph: {
				contributor: state.graph.contributor,
				commit: action.payload.index
			}
		})
	}
	return state
}