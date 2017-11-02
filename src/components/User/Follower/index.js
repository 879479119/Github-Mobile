import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchFollowerForOwner, fetchFollowingForOwner } from '../../../views/OwnerRedux'
import './index.scss'
import { List as FollowerList } from '../../Trending/DeveloperList'

@withRouter
@connect(state => ({
  query: state.query,
  owner: state.owner,
}), { fetchFollowerForOwner, fetchFollowingForOwner })
export default class Star extends Component {
  componentDidMount() {
    const { username } = this.props.match.params
    if (this.props.owner.followers.login !== username) {
      this.props.fetchFollowerForOwner({ username })
      this.props.fetchFollowingForOwner({ username })
    }
  }
  render = () => {
    const { owner: { followers, followings } } = this.props
    return (
      <FollowerList data={followers.list} className="user-repo-list" simple list={followings.list} />
    )
  }
}
