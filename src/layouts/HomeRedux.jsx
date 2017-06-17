import {push} from "react-router-redux"
import {message} from "antd"
import {getItem, setItem} from "../utils/storage"

export const ROUTE = "ROUTE"

/**
 * register controller
 */

export const REG = "REG"
export const REG_ERROR = "REG_ERROR"
export const REG_SUCCESS = "REG_SUCCESS"

/**
 * login controller
 */
export const LOGIN = "LOGIN"
export const LOGIN_ERROR = "LOGIN_ERROR"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const NETWORK_ERROR = "NETWORK_ERROR"

/**
 * user controller
 */
export const AUTH_FETCH_INFO = "AUTH_FETCH_INFO"
export const AUTH_FETCH_INFO_READY = "AUTH_FETCH_INFO_READY"
export const AUTH_FETCH_INFO_ERROR = "AUTH_FETCH_INFO_ERROR"

export const AUTH_FETCH_FOLLOWING = "AUTH_FETCH_FOLLOWING"
export const AUTH_FETCH_FOLLOWING_READY = "AUTH_FETCH_FOLLOWING_READY"
export const AUTH_FETCH_FOLLOWING_ERROR = "AUTH_FETCH_FOLLOWING_ERROR"

/**
 * language controller
 */
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE"

const initialState = {
	route: '/home',
	loginStatus: null,
	language: 'en',
	name: undefined,
	following: getItem('following') || [],
	stared: getItem('stared') || []
}

export default function common(state = initialState, action) {
	switch (action.type){
		/**
		 * route part
		 */
		case ROUTE: return Object.assign({}, state, {route: action.payload})
		/**
		 * register part
		 */
		case REG_SUCCESS:
			window.location = 'http://github.jian-gamestudio.cn/'
			return state
		case REG_ERROR:
			window.location = 'https://github.com/login/oauth/authorize?scope=admin&client_id=af4fdd0b77c3a4073f0c'
			return state
		/**
		 * login part
		 */
		case LOGIN: return Object.assign({}, state)
		case LOGIN_ERROR:
			//clear the old cookies
			document.cookie = ''
			message.error('Redirect to auth in 5s',5)
			setTimeout(()=>{
				window.location = "https://github.com/login/oauth/authorize?scope=admin&client_id=af4fdd0b77c3a4073f0c"
			},5000)
			return Object.assign({}, state, {loginStatus: false})
		case LOGIN_SUCCESS:
			message.success('Login success!',2)
			return Object.assign({}, state, {loginStatus: true})
		case NETWORK_ERROR:
			message.error('Please check your network',3)
			return Object.assign({}, state, {loginStatus: null})
		/**
		 * local data storage and initialize
		 */
		case AUTH_FETCH_FOLLOWING_READY:
			message.success('Your following list is initialized',3)
			const followingList = action.payload.data.data
			setItem('following', followingList)
			return Object.assign({}, state, {following: followingList})
		/**
		 * others
		 */
		case CHANGE_LANGUAGE:
			localStorage.setItem('language', action.payload)
			return Object.assign({}, state, {language: action.payload})
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

export const login = (gname) => dispatch => dispatch({type: LOGIN, payload: {gname}})

export const register = code => dispatch => dispatch({type: REG, payload: {code}})

export const changeLanguage = lang => dispatch => dispatch({type: CHANGE_LANGUAGE, payload: lang})

