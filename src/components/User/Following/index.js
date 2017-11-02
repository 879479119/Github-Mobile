import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchFollowingForOwner } from '../../../views/OwnerRedux'
import './index.scss'
import { List as FollowingList } from '../../Trending/DeveloperList'

@withRouter
@connect(state => ({
  query: state.query,
  owner: state.owner,
}), { fetchFollowingForOwner })
export default class Star extends Component {
  componentDidMount() {
    const { username } = this.props.match.params
    if (this.props.owner.followings.login !== username) {
      this.props.fetchFollowingForOwner({ username })
    }
  }
  render = () => {
    const { owner: { followings } } = this.props
    return (
      <FollowingList data={followings.list} className="user-repo-list" simple list={followings.list} />
    )
  }
}
