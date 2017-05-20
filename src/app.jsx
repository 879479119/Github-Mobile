import 'babel-core/register'
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import Router from './routes'
import { Provider } from 'react-redux'
import React, { Component } from "react"
import configStore from './redux/store'
import rootStore from './redux/reducers'
import {history} from './redux/store'

import './styles/common.scss'
import 'antd/dist/antd.min.css'

const store = configStore(rootStore, {})

class Page extends Component{
	static propTypes = {
		store: React.PropTypes.object.isRequired,
		history: React.PropTypes.object.isRequired
	}
	render = () => (
		<Provider store={this.props.store}>
			{Router({history: this.props.history})}
		</Provider>
	)
}

ReactDOM.render(
		<Page store={store} history={history} />
	, document.getElementById("container"))

//noinspection JSUnresolvedVariable
if (module.hot) {
	//noinspection JSUnresolvedVariable
	module.hot.accept();
}
