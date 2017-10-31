import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Badge } from 'antd'
import { pushHistory } from '../layouts/HomeRedux'
import { commonFetch, commonRelease } from './QueueRedux'
import { fetchRepoForOwner } from './OwnerRedux'
import addDataFetch from '../redux/addDataFetch'
import './User.scss'

const { Content } = Layout

export const API = [
  // '/api/repos/getForUser',
  '/api/users/getForUser',
]

@withRouter
@connect(state => ({
  queue: state.queue,
  common: state.common,
  user: state.user,
}), {
  commonFetch, commonRelease, pushHistory, fetchRepoForOwner,
})
@addDataFetch
export default class User extends Component {
  componentDidMount() {
    const { commonFetch: fetch, user } = this.props
    const { username } = this.props.match.params

    this.props.fetchRepoForOwner(username)
    for (let i = 0; i < API.length; i++) {
      if (this.getData(API[i]).status !== 3 && user !== username) fetch(API[i], { username })
    }
  }

  menuHandler(e) {
    const { username = this.props.user.login } = this.props.match.params
    this.props.pushHistory(`/user/${username}/${e.key}`)
  }

  render = () => {
    const userInfo = this.getData(API[1])
    let info = {
      followers: 0,
      following: 0,
      public_repos: 0,
    }

    const selected = this.props.match.params.tab || 'profile'

    if (userInfo.status === 3) {
      info = Object.assign(info, userInfo.result.data.data)
    }

    return (
      <Content style={{
        background: '#fff', padding: 24, paddingTop: 0, margin: 0, minHeight: 400,
      }}
      >
        <Menu
          selectedKeys={[selected]}
          mode="horizontal"
          className="user-header"
          onClick={::this.menuHandler}
        >
          <Menu.Item key="profile">
            <Icon type="idcard" />Overview
          </Menu.Item>
          <Menu.Item key="repo">
            <Icon type="database" />Repositories<Badge
              className="badge" count={info.public_repos}
              style={{ backgroundColor: '#eee' }}
            />
          </Menu.Item>
          <Menu.Item key="star">
            <Icon type="star-o" />Stars
          </Menu.Item>
          <Menu.Item key="follower">Followers<Badge
            className="badge" count={info.followers}
            style={{ backgroundColor: '#eee' }}
          />
          </Menu.Item>
          <Menu.Item key="following">Following<Badge
            className="badge" count={info.following}
            style={{ backgroundColor: '#eee' }}
          />
          </Menu.Item>
        </Menu>
        {this.props.children}
      </Content>
    )
  }
}
