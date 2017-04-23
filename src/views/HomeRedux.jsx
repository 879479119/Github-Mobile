
export default function common(state = {a:1}, action) {
	// let payload = action.a
	switch (action){
		case A: return Object.assign({}, state, {a})
	}
	return state
}

export const changeA = (a) => {
	return (dispatch) => {
		dispatch({
			type: A,
			a
		})
	}
}

export let A = "A"