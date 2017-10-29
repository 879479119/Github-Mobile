import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.scss'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import addDataFetch from '../../../redux/addDataFetch'
import RepoList from '../../Search/Repo'

export const API = [
  '/api/repos/getForUser',
]

@withRouter
@connect(state => ({
  queue: state.queue,
}), { commonFetch, commonRelease })
@addDataFetch
export default class Profile extends Component {
  componentDidMount() {
    // we have fetched the information in the parent component, nothing to do here
  }

  render = () => {
    const repos = this.getData(API[0])
    if (repos.status === 3) {
      return (
        <RepoList result={repos.result.data.data} className="user-repo-list" />
      )
    }
    return (
      <div>Loading</div>
    )
  }
}
