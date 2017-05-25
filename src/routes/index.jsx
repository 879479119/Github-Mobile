import React from "react"
import {HashRouter, Route} from "react-router-dom"
import Internationalization from "../i18n/Internationalization"

import Home from "../views/Home"
import Profile from "../components/Home/Profile"
import SearchResult from "../views/SearchResult"
import Trending from "../views/Trending"
import Repo from '../views/Repo'

import TrendingList from "../components/Trending/TrendingList"
import DeveloperList from "../components/Trending/DeveloperList"

import Issue from '../components/Repo/Issue'
import Code from '../components/Repo/Code'
import PullRequest from '../components/Repo/PullRequest'
import Graph from '../components/Repo/Graph'

//the graph parts
import Contributor from '../components/Repo/Graph/Contributor'
import Commit from '../components/Repo/Graph/Commit'
import Frequency from '../components/Repo/Graph/Frequency'
import Punch from '../components/Repo/Graph/Punch'


export default function (props) {
	return (
		<Internationalization>
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
								let Content = undefined, graph = undefined
								if(route[4] === 'graph'){
									switch (route[5]){
										case 'contributor': Content = Contributor; break
										case 'commit': Content = Commit; break
										case 'frequency': Content = Frequency; break
										case 'punch': Content = Punch; break
										default: Content = Contributor
									}
									graph = route[5] || 'contributor'
								}

								return (
									<ShowComponent owner={owner} repo={repo} graph={graph} >
										{Content ? <Content owner={owner} repo={repo}/> : ''}
									</ShowComponent>
								)
							}}/>
						</Repo>
					</Route>
					<Route path="/home" component={Profile}/>
					<Route path="/trending">
						<Trending>
							{/*{TODO: It's strange that the following route doesn't work as thought}*/}
							{/*<Route path="/developers" component={DeveloperList} />*/}
							{/*<Route path="/repo" component={TrendingList} />*/}
							<Route render={(e) => {
								let ShowComponent = TrendingList,
									route = e.location.pathname.split('/'),
									language = route[2] || '',
									p = e.location.search.match(/span=(\w*)/),
									span = p ? p[1] : 'daily'

								if(route[2] === 'developers'){
									//noinspection JSUnusedAssignment
									ShowComponent = DeveloperList
									language = route[3] || ''
								}

								return (
									<ShowComponent language={language} span={span}/>
								)
							}}/>
						</Trending>
					</Route>
				</Home>
			</HashRouter>
		</Internationalization>
	)
}