import {push} from "react-router-redux"

export const ROUTE = "ROUTE"

/**
 * login controller
 */
export const LOGIN = "LOGIN"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"

/**
 * language controller
 */
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE"

const initialState = {
	route: '/home',
	loginStatus: null,
	language: 'en'
}

export default function common(state = initialState, action) {
	switch (action.type){
		case ROUTE: return Object.assign({}, state, {route: action.payload})
		case LOGIN: return Object.assign({}, state)
		case LOGIN_ERROR: return Object.assign({}, state, {loginStatus: false})
		case LOGIN_SUCCESS: return Object.assign({}, state, {loginStatus: true})
		case CHANGE_LANGUAGE: {
			localStorage.setItem('language', action.payload)
			return Object.assign({}, state, {language: action.payload})
		}
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

export const changeLanguage = (lang) => dispatch => dispatch({type: CHANGE_LANGUAGE, payload: lang})

