import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import { graphCommitSelect } from '../../../views/RepoRedux'
import addDataFetch from '../../../redux/addDataFetch'
import Chart from './Chart/Chart'

export const API = '/api/repos/getStatsCommitActivity'

@withRouter
@connect(state => ({
  queue: state.queue,
  repoState: state.repo,
}), { commonFetch, commonRelease, graphCommitSelect })
@addDataFetch
export default class extends Component {
  componentDidMount() {
    const { commonFetch: fetch } = this.props
    const { repo, username: owner } = this.props.match.params
    if (this.getData(API).status !== 3) fetch(API, { owner, repo })
  }
  render = () => {
    const { repoState } = this.props
    const commit = this.getData(API)
    let failed = false
    const dataByWeek = []
    let dataByDay = []

    if (commit.result) {
      if (!Array.isArray(commit.result.data.data)) failed = true
      else {
        const result = commit.result.data.data.concat()

        result.forEach((item, index) => {
          dataByWeek[index] = {
            c: item.total,
            w: item.week,
          }
        })

        dataByDay = result[repoState.graph.commit].days
      }
    }

    return (
  <div className="commits" style={{ marginTop: 20 }} >
    <h2>Commits of the year</h2>
    { failed ? 'retry' : <Chart type="bar" data={dataByWeek} height={200} callback={::this.props.graphCommitSelect} active={repoState.graph.commit} /> }
    <h2 style={{ marginTop: 20 }} >Commits of the selected week</h2>
    { failed ? 'retry' : <Chart type="linear" data={dataByDay} height={200} /> }
  </div>
    )
  }
}
