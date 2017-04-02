import React from 'react'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import Home from '../views/Home'

export default (
	<Router history={hashHistory}>
		<Route path={'/'} component={Home}/>
	</Router>
)