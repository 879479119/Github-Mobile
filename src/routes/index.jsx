import React from "react";

import {HashRouter, Route} from "react-router-dom";

import Home from "../views/Home";
import Profile from "../components/Home/Profile";
import SearchResult from "../views/SearchResult";
import Repo from '../views/Repo'
import Issue from '../components/Repo/Issue'
import Code from '../components/Repo/Code'

export default function (props) {
	return (
		<HashRouter history={props.history}>
			<Home>
				<Route path="/" exact={true} component={Profile}/>
				<Route path="/search" component={SearchResult}/>
				<Route path="/repo">
					<Repo>
						<Route render={(e) => {
							let ShowComponent = Code,
								route = e.location.pathname.split('/')

							switch (route.pop()){
								case 'code': ShowComponent = Code; break
								case 'issue': ShowComponent = Issue; break
								default: ShowComponent = Code
							}
							let [,,owner,repo] = route

							return <ShowComponent owner={owner} repo={repo}/>
						}}/>
					</Repo>
				</Route>
				<Route path="/home" component={Profile}/>
			</Home>
		</HashRouter>
	)
}