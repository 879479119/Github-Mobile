import React from 'react'
import { Route, Switch } from 'react-router'
import { HashRouter } from 'react-router-dom'
import Internationalization from '../i18n/Internationalization'

import Home from '../layouts/Home'
import User from '../views/User'
import SearchResult from '../views/SearchResult'
import Trending from '../views/Trending'
import Repo from '../views/Repo'

// the user parts
import Profile from '../components/User/Profile/index'
import UserRepo from '../components/User/Repo/index'
import StarRepo from '../components/User/Star/index'
import Follower from '../components/User/Follower/index'
import Following from '../components/User/Following/index'

// the trending parts
import TrendingList from '../components/Trending/TrendingList'
import DeveloperList from '../components/Trending/DeveloperList'

// the repository parts
import Issue from '../components/Repo/Issue'
import Code from '../components/Repo/Code'
import PullRequest from '../components/Repo/PullRequest'
import Graph from '../components/Repo/Graph'
import Commit from '../components/Repo/Commit'

import Catalog from '../components/Repo/Code/Catalog'
import IssueContent from '../components/Repo/Issue/IssueContent'

// the graph parts
import Contributor from '../components/Repo/Graph/Contributor'
import CommitGraph from '../components/Repo/Graph/Commit'
import Frequency from '../components/Repo/Graph/Frequency'
import Punch from '../components/Repo/Graph/Punch'

/**
 * it's so ridiculous that the nested path matches the whole pathname !!!!!!!
 * @param props
 * @return {XML}
 */
export default function (props) {
  return (
    <Internationalization>
      <HashRouter history={props.history}>
        <Home>
          <Switch>
            <Route path="/" exact component={User} />
            <Route path="/user/:username/:tab">
              <User>
                <Switch>
                  <Route path="/user/:username/profile" component={Profile} />
                  <Route path="/user/:username/repo" component={UserRepo} />
                  <Route path="/user/:username/star" component={StarRepo} />
                  <Route path="/user/:username/follower" component={Follower} />
                  <Route path="/user/:username/following" component={Following} />
                  <Route path="/:p" render={(e) => { console.info(e); return <p>ERROR</p> }} />
                </Switch>
              </User>
            </Route>
            <Route path="/search" component={SearchResult} />
            <Route path="/repo">
              <Repo>
                <Switch>
                  <Route path="/repo/:username/:repo" exact component={Code} />
                  <Route path="/repo/:username/:repo/code" exact component={Code} />
                  <Route path="/repo/:username/:repo/code/:branch" component={Catalog} />
                  <Route path="/repo/:username/:repo/commit/:sha" component={Commit} />
                  <Route path="/repo/:username/:repo/issue">
                    <Switch>
                      <Route path="/repo/:username/:repo/issue" exact component={Issue} />
                      <Route path="/repo/:username/:repo/issue/:sid" component={IssueContent} />
                    </Switch>
                  </Route>
                  <Route path="/repo/:username/:repo/pr" component={PullRequest} />
                  <Route path="/repo/:username/:repo/graph/:graph">
                    <Graph>
                      <Switch>
                        <Route path="/repo/:username/:repo/graph/contributor" component={Contributor} />
                        <Route path="/repo/:username/:repo/graph/commit" component={CommitGraph} />
                        <Route path="/repo/:username/:repo/graph/frequency" component={Frequency} />
                        <Route path="/repo/:username/:repo/graph/punch" component={Punch} />
                        <Route path="/repo/:username/:repo/graph" component={Contributor} />
                      </Switch>
                    </Graph>
                  </Route>
                </Switch>
              </Repo>
            </Route>
            <Route path="/home" component={User} />
            <Route path="/trending">
              <Trending>
                {/* {TODO: It's strange that the following route doesn't work as thought} */}
                <Route render={(e) => {
                  let ShowComponent = TrendingList
                  const route = e.location.pathname.split('/')
                  let language = route[2] || ''
                  const p = e.location.search.match(/span=(\w*)/)
                  const span = p ? p[1] : 'daily'
                  if (route[2] === 'developers') {
                    ShowComponent = DeveloperList
                    language = route[3] || ''
                  }
                  return <ShowComponent language={language} span={span} />
                }}
                />
              </Trending>
            </Route>
          </Switch>
        </Home>
      </HashRouter>
    </Internationalization>
  )
}
