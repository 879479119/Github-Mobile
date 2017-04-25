export const ROUTE = "ROUTE"
export const LOGIN = "LOGIN"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
import {push} from "react-router-redux"

const initialState = {
	route: '/home',
	loginStatus: null
}

export default function common(state = initialState, action) {
	switch (action.type){
		case ROUTE: return Object.assign({}, state, {route: action.payload})
		case LOGIN: return Object.assign({}, state)
		case LOGIN_ERROR: return Object.assign({}, state, {loginStatus:false})
		case LOGIN_SUCCESS: return Object.assign({}, state, {loginStatus:true})
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

export const login = () => dispatch => dispatch({type: LOGIN})

