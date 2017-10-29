import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import { graphCommitSelect } from '../../../views/RepoRedux'
import addDataFetch from '../../../redux/addDataFetch'
import Chart from './Chart/Chart'

export const API = '/api/repos/getStatsCodeFrequency'

@withRouter
@connect(state => ({
  queue: state.queue,
  repoState: state.repo,
}), { commonFetch, commonRelease, graphCommitSelect })
@addDataFetch
export default class extends Component {
  componentDidMount() {
    const { commonFetch: fetch } = this.props
    const { username: owner, repo } = this.props.match.params
    if (this.getData(API).status !== 3) fetch(API, { owner, repo })
  }
  render = () => {
    const frequency = this.getData(API)
    let failed = false
    const dataByWeek = []

    if (frequency.result) {
      if (!Array.isArray(frequency.result.data.data)) failed = true
      else {
        const result = frequency.result.data.data.concat()

        result.forEach((item, index) => {
          dataByWeek[index] = {
            c: item[1],
            w: item[0],
            a: item[1],
            d: item[2],
          }
        })
      }
    }

    return (
      <div className="commits" style={{ marginTop: 20 }} >
        <h2>Code Frequency</h2>
        { failed ? 'retry' : <Chart type="area" data={dataByWeek} height={600} /> }
      </div>
    )
  }
}
