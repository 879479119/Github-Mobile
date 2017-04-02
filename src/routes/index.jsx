import React from 'react'

import {
	HashRouter,
	Route,
} from 'react-router-dom';

import Home from '../views/Home'

export default function () {
	return (
		<HashRouter>
			<Route path="/" component={Home}/>
		</HashRouter>
	)
}