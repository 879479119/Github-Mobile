import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Menu, Icon, Badge } from 'antd'
import { pushHistory } from '../layouts/HomeRedux'
import { fetchRepoForOwner, fetchDetailForOwner } from './OwnerRedux'
import addDataFetch from '../redux/addDataFetch'
import './User.scss'

const { Content } = Layout

@withRouter
@connect(state => ({
  loading: state.query.owner,
  owner: state.owner,
}), {
  pushHistory, fetchRepoForOwner, fetchDetailForOwner,
})
@addDataFetch
export default class User extends Component {
  componentDidMount() {
    const { username } = this.props.match.params

    this.props.fetchRepoForOwner({ username })
    this.props.fetchDetailForOwner({ username })
  }

  menuHandler(e) {
    const { username = this.props.user.login } = this.props.match.params
    this.props.pushHistory(`/user/${username}/${e.key}`)
  }

  render = () => {
    const userInfo = this.props.owner.detail
    const selected = this.props.match.params.tab || 'profile'

    const info = Object.assign({
      followers: 0,
      following: 0,
      public_repos: 0,
    }, userInfo)
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
