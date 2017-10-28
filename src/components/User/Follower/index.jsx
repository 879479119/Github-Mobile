import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.scss'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import addDataFetch from '../../../redux/addDataFetch'
import { List as FollowerList } from '../../Trending/DeveloperList'

export const API = [
  '/api/users/getFollowersForUser',
]

@withRouter
@connect(state => ({
  queue: state.queue,
}), { commonFetch, commonRelease })
@addDataFetch
export default class Profile extends Component {
  componentDidMount() {
    const { commonFetch: fetch } = this.props
    const { username } = this.props.match.params

    if (this.getData(API[0]).status !== 3) fetch(API[0], { username })
  }

  render = () => {
    const followers = this.getData(API[0])
    if (followers.status === 3) {
      return (
        <FollowerList data={followers.result.data.data} simple />
      )
    }
    return (
      <div>Loading</div>
    )
  }
}
