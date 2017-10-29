import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './index.scss'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import addDataFetch from '../../../redux/addDataFetch'
import ChangeLog from './ChangeLog'

export const API = [
  '/api/repos/getCommit',
]

@withRouter
@connect(state => ({
  queue: state.queue,
}), { commonFetch, commonRelease })
@addDataFetch
export default class extends Component {
  static contextTypes = {
    details: PropTypes.object,
  }
  componentDidMount() {
    const { commonFetch: fetchData } = this.props
    const { username: owner, repo, sha } = this.props.match.params
    if (this.getData(API[0]).status !== 3) fetchData(API[0], { owner, repo, sha })
  }
  render = () => {
    // const { details } = this.context
    const commit = this.getData(API[0])
    let content = ''
    if (commit.result) {
      content = commit.result.data.data.files.map(item => (
        <ChangeLog file={item} />
      ))
    }
    return (
      <div className="main-body">{content}</div>
    )
  }
}
