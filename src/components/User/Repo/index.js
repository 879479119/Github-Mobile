import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import RepoList from '../../Search/Repo'

@connect(state => ({
  query: state.query,
  owner: state.owner,
}))
export default class Repo extends Component {
  componentDidMount() {
    // we have fetched the information in the parent component, nothing to do here
  }

  render = () => {
    const { owner: { repos } } = this.props
    return (
      <RepoList result={repos} className="user-repo-list" />
    )
  }
}
