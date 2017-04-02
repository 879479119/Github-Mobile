import { combineReducers } from 'redux'
// export * as Action from ''

function common(state = {a:1}, action) {
	// let payload = action.a
	switch (action){
		case A: return Object.assign({}, state, {a})
	}
	return state
}

export default combineReducers({
	common
})

export const changeA = (a) => {
	return (dispatch) => {
		dispatch({
			type: A,
			a
		})
	}
}

export let A = "A"