import ReactDOM from 'react-dom'
import Router from './routes'
import { Provider } from 'react-redux'
import React, { Component } from "react"
import configStore from './redux/store'
import rootStore from './views/HomeRedux'
import DevTools from './containers/DevTools'

const store = configStore(rootStore, {})

class Page extends Component{
	static pro = {
		a : 0
	}
	render = () => (
		<Provider store={store}>
			<div>
				{Router()}

				<DevTools/>
			</div>

		</Provider>
	)
}

ReactDOM.render(
		<Page/>
	, document.getElementById("container"))
