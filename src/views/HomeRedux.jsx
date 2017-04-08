import { combineReducers } from 'redux'
// export * as Action from ''

function common(state = {a:1}, action) {
	// let payload = action.a
	switch (action){
		case A: return Object.assign({}, state, {a})
	}
	return state
}


const dashboard = (state = {}, action) => {
	switch(action.type) {
		case 'SUCCESS':
			return Object.assign({}, state, action.payload);
		default :
			return state;
	}
}

const user = (state = {}, action)  => {
	switch(action.type) {
		case 'USER' :
			return action.payload;
		default :
			return state;
	}
};

export default combineReducers({
	common,
	dashboard,
	user
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