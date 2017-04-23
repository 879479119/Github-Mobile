import React from "react";

import {HashRouter, Route} from "react-router-dom";

import Home from "../views/Home";
import Profile from "../components/Home/Profile";
import SearchResult from "../views/SearchResult";

export default function () {
	return (
		<HashRouter>
			<Home>
				<Route path="/" exact={true} component={Profile}/>
				<Route path="/search" component={SearchResult}/>
			</Home>
		</HashRouter>
	)
}