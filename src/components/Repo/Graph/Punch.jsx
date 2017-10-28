import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import addDataFetch from '../../../redux/addDataFetch'
import Chart from './Chart/Chart'

export const API = '/api/repos/getStatsPunchCard'

@withRouter
@connect(state => ({
  queue: state.queue,
}), { commonFetch, commonRelease })
@addDataFetch
export default class extends Component {
  componentDidMount() {
    const { commonFetch: fetch } = this.props
    const { username: owner, repo } = this.props.match.params

    if (this.getData(API).status !== 3) fetch(API, { owner, repo })
  }
  render = () => {
    const punch = this.getData(API)
    let failed = false
    let result = []
    if (punch.result) {
      if (!Array.isArray(punch.result.data.data)) failed = true
      else {
        result = punch.result.data.data.concat()
      }
    }

    return (
      <div className="punch" style={{ marginTop: 20 }} >
        <h2>Commits of days</h2>
        {failed ? 'retry' : <Chart type="punch" data={result} height={600} width={1000} />}
      </div>
    )
  }
}
