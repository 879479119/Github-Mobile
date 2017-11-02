import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { fetchStarForOwner } from '../../../views/OwnerRedux'
import RepoList from '../../Search/Repo'
import './index.scss'

@withRouter
@connect(state => ({
  query: state.query,
  owner: state.owner,
}), { fetchStarForOwner })
export default class Star extends Component {
  componentDidMount() {
    const { username } = this.props.match.params
    if (this.props.owner.repos.login !== username) {
      this.props.fetchStarForOwner({ username })
    }
  }
  render = () => {
    const { owner: { stars } } = this.props
    return (
      <RepoList result={stars.list} className="user-repo-list" />
    )
  }
}
