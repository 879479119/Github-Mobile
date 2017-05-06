import React from "react";

import {HashRouter, Route} from "react-router-dom";

import Home from "../views/Home";
import Profile from "../components/Home/Profile";
import SearchResult from "../views/SearchResult";
import Repo from '../views/Repo'

export default function (props) {
	return (
		<HashRouter history={props.history}>
			<Home>
				<Route path="/" exact={true} component={Profile}/>
				<Route path="/search" component={SearchResult}/>
				<Route path="/repo" component={Repo}/>
				<Route path="/home" component={Profile}/>
			</Home>
		</HashRouter>
	)
}