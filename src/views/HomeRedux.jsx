export const ROUTE = "ROUTE"
import {push} from "react-router-redux"

export default function common(state = {route:'/home'}, action) {
	switch (action.type){
		case ROUTE: return Object.assign({}, state, {route: action.payload})
	}
	return state
}

export const changeRouter = (route) => {
	return (dispatch) => {
		dispatch({
			type: ROUTE,
			payload: route
		})
		dispatch(push(route))
	}
}

