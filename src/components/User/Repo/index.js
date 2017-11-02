import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchRepoForOwner } from '../../../views/OwnerRedux'
import './index.scss'
import RepoList from '../../Search/Repo'

@connect(state => ({
  query: state.query,
  owner: state.owner,
}), { fetchRepoForOwner })
export default class Repo extends Component {
  componentDidMount() {
    const { username } = this.props.match.params
    if (this.props.owner.repos.login !== username) {
      this.props.fetchRepoForOwner({ username })
    }
  }
  render = () => {
    const { owner: { repos } } = this.props
    return (
      <RepoList result={repos.list} className="user-repo-list" />
    )
  }
}
