import {createStore, applyMiddleware, compose} from 'redux'
import thunkMiddleware from 'redux-thunk'
import DevTools from '../containers/DevTools'

export default function (rootReducer, initialState) {
	return createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(
				thunkMiddleware
			),
			DevTools.instrument()
		)
	)
}

//TODO: remember to delete the DevTools when publish this