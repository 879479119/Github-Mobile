import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import sagas from "../redux/rootSaga";
import {routerMiddleware} from "react-router-redux";
import createHistory from "history/createHashHistory";

const sagaMiddleware = createSagaMiddleware()
export const history = createHistory()

export default function (rootReducer, initialState) {
	//noinspection JSUnresolvedVariable,JSUnresolvedFunction
	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(
				thunkMiddleware,
				sagaMiddleware,
				routerMiddleware(history)
			),
			window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
		)
	)

	sagaMiddleware.run(sagas)
	return store
}

//TODO: remember to delete the DevTools when publish this
