import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Icon, Card, Tooltip, Spin } from 'antd'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import { fetchOrgsForOwner, fetchEventsForOwner, OWNER_REPO_GET } from '../../../views/OwnerRedux'
import reflect from '../../../utils/languages'
import emojizer from '../../../utils/emojizer'
import formatDate from '../../../utils/formatDate'
import RecentEvent from './RecentEvent'
import Percentage from './Percentage'
import './index.scss'

@withRouter
@connect(state => ({
  owner: state.owner,
  loading: state.query.owner,
}), {
  commonFetch, commonRelease, fetchOrgsForOwner, fetchEventsForOwner,
})
export default class Profile extends Component {
  componentDidMount() {
    const { username = this.props.user.login } = this.props.match.params
    this.props.fetchOrgsForOwner({ username })
    this.props.fetchEventsForOwner({ username })
  }

  render = () => {
    const { username } = this.props.match.params
    const {
      repos,
      detail: userInfo,
      events,
      organization: orgs,
    } = this.props.owner
    const percentage = []

    // copy
    const sortedRepos = repos.concat()

    // prepare for the repo part
    sortedRepos.sort((prev, cur) => {
      if (prev.stargazers_count > cur.stargazers_count) return -1
      else return 1
    })

    // prepare for the percentage part
    const lang = {}
    let co = 0
    sortedRepos.forEach((item) => {
      if (item.language in lang) {
        percentage[lang[item.language]].count++
      } else {
        lang[item.language] = co++
        percentage.push({
          name: item.language,
          count: 1,
        })
      }
    })
    return (
      <div className="main-body">
        <div className="main-part">
          <UserInfo info={userInfo} org={orgs} />
          <div className="user-repos">
            {
              !this.props.loading[OWNER_REPO_GET] ? sortedRepos.splice(0, 6).map((item) => {
                return (
                  <Card style={{ width: 360 }}>
                    <h5>lll <Link to={`/repo/${username}/${item.name}`}>{item.name}</Link></h5>
                    <p>{emojizer(item.description, false)}</p>
                    <p>
                      {
                        item.language === '' ? '' :
                        <span>
                          <span
                            className="icon-lang"
                            style={{ background: reflect[item.language].color }}
                          />
                          {item.language}
                        </span>
                      }
                      <span><Icon type="star" /> {item.stargazers_count} </span>
                      <span><Icon type="usb" /> {item.forks_count} </span>
                    </p>
                  </Card>
                )
              }) : <Spin />
            }
            {/* <CommitTable/> */}
          </div>
        </div>
        <div className="aside">
          <Percentage percentage={percentage}>
            <p className="chart-lang">Language Chart</p>
          </Percentage>
          <RecentEvent data={events} />
        </div>
      </div>
    )
  }
}

function UserInfo({ info, org }) {
  return (
    <div className="user-info">
      <ul>
        <li className="face"><img src={info.avatar_url} alt="face" /></li>
        <li>
          <p>Account: <a href={`https://github.com/${info.login}`}>{info.login}</a></p>
          <p>Username: <span>{info.name}</span></p>
          <p>Bio: <span>{info.bio}</span></p>
          <p>Joined at: <span>{formatDate(info.created_at)}</span></p>
        </li>
        <li>
          <p>Email: <a href={`mailto: ${info.email}`}>{info.email}</a></p>
          <p>Blog: <a href={info.blog} className="blog">{info.blog}</a></p>
          <p>Location: <span>{info.location}</span></p>
          <div className="org">
            <p>Organization:</p>
            {org.map(item => (
              <section>
                <Tooltip overlay={item.login}>
                  <Link to={`/org/${item.login}`}><img src={item.avatar_url} alt="org" /></Link>
                </Tooltip>
              </section>
            ))}
          </div>
        </li>
      </ul>
    </div>
  )
}
