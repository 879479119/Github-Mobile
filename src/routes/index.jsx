import React from "react";

import {HashRouter, Route} from "react-router-dom";

import Home from "../views/Home";
import Profile from "../components/Home/Profile";
import SearchResult from "../views/SearchResult";

export default function (props) {
	return (
		<HashRouter history={props.history}>
			<Home>
				<Route path="/" exact={true} component={Profile}/>
				<Route path="/search" component={SearchResult}/>
				<Route path="/home" component={Profile}/>
			</Home>
		</HashRouter>
	)
}