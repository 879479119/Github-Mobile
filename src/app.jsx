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
	render = () => (
		<Provider store={store}>
			{Router({history})}
		</Provider>
	)
}

ReactDOM.render(
		<Page/>
	, document.getElementById("container"))
