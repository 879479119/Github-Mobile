import { push as pushHistoryAction } from 'react-router-redux'

/**
 * language controller
 */
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

const initialState = {
  language: 'en',
}

export default function common(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      window.localStorage.setItem('language', action.payload)
      return Object.assign({}, state, { language: action.payload })
    default:
      return state
  }
}

export const changeLanguage = lang => dispatch => dispatch({ type: CHANGE_LANGUAGE, payload: lang })

export const pushHistory = route => dispatch => dispatch(pushHistoryAction(route))

