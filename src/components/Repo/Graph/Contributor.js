import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cls from 'classnames'
import formatDate from '../../../utils/formatDate'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import addDataFetch from '../../../redux/addDataFetch'
import Chart from './Chart/Chart'

export const API = '/api/repos/getStatsContributors'

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
    const contributor = this.getData(API)
    const sumArr = []
    let start = ''
    let end = ''
    let series = []
    let max = 1
    let failed = false
    // FIXME: unknown error: contribution changes
    if (contributor.result) {
      try {
        series = contributor.result.data.data.concat().reverse()
        series.forEach((item, index) => {
          if (index === 0) {
            start = formatDate(item.weeks[0].w * 1000, 4)
            end = formatDate(item.weeks[item.weeks.length - 1].w * 1000, 4)
            sumArr.concat(item.weeks)
            // init the array and return to avoid loop
            return
          }
          item.weeks.forEach((t, i) => {
            sumArr[i].a += t.a
            sumArr[i].d += t.d
            sumArr[i].c += t.c
            if (t.c > max) max = t.c
          })
        })
      } catch (e) {
        if (contributor.result.data.meta.status === '202 Accepted') {
          failed = true
        }
      }
    }

    return (
      <div className="contributors" style={{ marginTop: 20 }}>
        <h5 className={cls({ void: !start })}>{`${start} - ${end}`}</h5>
        <h6>Contributions to master, excluding merge commits</h6>
        { failed ? 'retry' : <Chart data={sumArr} type="smooth-path" className="main-chart" /> }
        <div className="contribute-user">
          <ul>
            {
              series.map((t) => {
                const a = t.author
                let add = 0
                let del = 0
                t.weeks.forEach(((item) => {
                  add += item.a
                  del += item.d
                }))
                return (
                  <li>
                    <img src={a.avatar_url} alt="face" />
                    <section>
                      <Link to={`/profile/${a.login}`} >{a.login}</Link>
                      <p className="details">
                        <span>Commits: {t.total}</span>
                        <span>/{add} ++/</span>
                        <span>{del} --</span>
                      </p>
                    </section>
                    <Chart max={max} data={t.weeks} type="smooth-path" level="simple" width={480} height={80} fill="#fb8532" className="c-small" />
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}
