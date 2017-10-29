import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Button, Icon, Input, Layout, Menu } from 'antd'
import './Home.scss'
import { changeLanguage, changeRouter, login, register } from './HomeRedux'
import AutoBreadcrumb from '../components/Common/AutoBreadcrumb'
import { getCookie } from '../utils/cookie'
import addDataFetch from '../redux/addDataFetch'

const { SubMenu } = Menu
const { Search } = Input
const { Header, Sider } = Layout

// the API is called in saga, here is just a key to fetch the value
export const API_AUTH_INFO = '/api/users/get'

@withRouter
@connect(state => ({
  language: state.common.language,
  route: state.common.route,
  loginStatus: state.common.loginStatus,
  queue: state.queue,
  user: state.user,
}), {
  changeRouter, login, changeLanguage, register,
})
@addDataFetch
export default class Home extends Component {
  componentWillMount() {
  /**
   * Step.1 check cookie
   * Step.2 try registering with code
   * Step.3 no code or error => redirect to auth page
   */
  }
  componentDidMount() {
    // the application needs auth, or it cannot fetch data as the frequency we want
    const dom = document.querySelector('.ant-layout-sider')
    // TODO: optimize
    window.document.addEventListener('scroll', () => {
      if (window.scrollY > 64) {
        dom.style.position = 'fixed'
        dom.style.top = 0
        dom.nextSibling.style.marginLeft = '200px'
      } else {
        dom.style.position = 'relative'
        dom.style.top = 0
        dom.nextSibling.style.marginLeft = 0
      }
    })

    // login and redirect
    this._checkCookie()
  }
  _checkCookie() {
    const gname = getCookie('gname')
    if (gname === -1) {
      this._checkCode()
      // window.location = "https://github.com/login/oauth/authorize?scope=admin&client_id=af4fdd0b77c3a4073f0c"
      return 0
    } else {
      this.props.login()
      return 1
    }
  }

  _checkCode() {
    let code = null
    try {
      code = window.location.search.match(/code=(\w*)/)[1]  // eslint-disable-line
    } catch (e) {
      code = null
    }

    if (code !== null) {
      this.props.register(code)
    } else {
      window.location = 'https://github.com/login/oauth/authorize?scope=admin&client_id=af4fdd0b77c3a4073f0c'
    }
  }
  searchContent(val) {
    this.props.changeRouter(`/search?query=${encodeURI(val)}`)
  }
  render = () => {
    const { route, language, changeLanguage: changeLang } = this.props
    const { user } = this.props
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            className="left-menu"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="0"><Search placeholder="Search" style={{ width: 200, marginTop: 20 }} onSearch={::this.searchContent} /></Menu.Item>
            <Menu.Item key="1">Pull requests</Menu.Item>
            <Menu.Item key="2">Issues</Menu.Item>
            <Menu.Item key="3">Gist</Menu.Item>
          </Menu>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            className="right-menu"
          >
            <Menu.Item key="0" style={{ display: 'table', height: 64 }}>
              <p style={{ display: 'table-cell', verticalAlign: 'middle' }}>
                <Button
                  ghost type="dashed"
                  size="small"
                  onClick={() => { changeLang(language === 'en' ? 'zh' : 'en') }}
                >中文/English
                </Button>
              </p>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout style={{ minHeight: 1000 }}>
          <Sider width={200} style={{ background: '#fff', height: '100vh' }}>
            <div className="user-face-main">
              <img src={user.avatar_url} alt="face" className="uf-pic" />
              <h4>{user.name}</h4>
              <h5>{user.login}</h5>
              <p>{user.bio}</p>
            </div>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />User Center</span>}>
                <Menu.Item key="1">Repos</Menu.Item>
                <Menu.Item key="2">Issues</Menu.Item>
                <Menu.Item key="3">Pull Requests</Menu.Item>
                <Menu.Item key="4">Gist</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" title={<span><Icon type="laptop" />Explore</span>}>
                <Menu.Item key="5">Activity</Menu.Item>
                <Menu.Item key="6">Hot</Menu.Item>
                <Menu.Item key="7">Follow</Menu.Item>
                <Menu.Item key="8">History</Menu.Item>
              </SubMenu>
              <Menu.Item key="8">
                <Link to="/trending" ><Icon type="notification" />Trending</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <AutoBreadcrumb location={route} />
            {this.props.children}
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
