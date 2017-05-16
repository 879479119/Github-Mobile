import React from "react";

import {HashRouter, Route} from "react-router-dom";

import Home from "../views/Home";
import Profile from "../components/Home/Profile";
import SearchResult from "../views/SearchResult";
import Repo from '../views/Repo'
import Issue from '../components/Repo/Issue'
import Code from '../components/Repo/Code'
import PullRequest from '../components/Repo/PullRequest'
import Graph from '../components/Repo/Graph'

//the graph parts
import Contributor from '../components/Repo/Graph/Contributor'


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

							//the basic router
							switch (route[4]){
								case 'code': ShowComponent = Code; break
								case 'issue': ShowComponent = Issue; break
								case 'pr': ShowComponent = PullRequest; break
								//we cannot wrap the graph contents in the route when it's rendered via function
								case 'graph': ShowComponent = Graph; break
								default: ShowComponent = Code
							}
							let [,,owner,repo] = route

							//dealing with the level3 router
							let Content = undefined
							if(route[4] === 'graph'){
								switch (route[5]){
									case 'contributor': Content = Contributor; break
									default: Content = Contributor
								}
							}

							return (
								<ShowComponent owner={owner} repo={repo}>
									{Content ? <Content owner={owner} repo={repo}/> : ''}
								</ShowComponent>
							)
						}}/>
					</Repo>
				</Route>
				<Route path="/home" component={Profile}/>
			</Home>
		</HashRouter>
	)
}