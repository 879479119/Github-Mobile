import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.scss'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import addDataFetch from '../../../redux/addDataFetch'
import { List as FollowerList } from '../../Trending/DeveloperList'

export const API = [
  '/api/users/getFollowingForUser',
]

@withRouter
@connect(state => ({
  queue: state.queue,
  list: state.common.following,
}), { commonFetch, commonRelease })
@addDataFetch
export default class Profile extends Component {
  componentDidMount() {
    const { commonFetch: fetch } = this.props
    const { username } = this.props.match.params

    if (this.getData(API[0]).status !== 3) fetch(API[0], { username })
  }

  render = () => {
    const following = this.getData(API[0])
    if (following.status === 3) {
      return (
        <FollowerList data={following.result.data.data} simple list={this.props.list} />
      )
    }
    return (
      <div>Loading</div>
    )
  }
}
