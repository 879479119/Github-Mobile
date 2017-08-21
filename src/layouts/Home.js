import React from 'react'
import { connect } from 'dva'
import { Link, routerRedux } from 'dva/router'
import { Icon, Input, Layout, Menu } from 'antd'
import './Home.scss'
import AutoBreadcrumb from '../components/Common/AutoBreadcrumb'

const { SubMenu } = Menu
const { Search } = Input
const { Header, Sider } = Layout

export const ROUTE = 'ROUTE'
export const REG = 'REG'
export const LOGIN = 'LOGIN'
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

const changeRouter = (route) => {
  return (dispatch) => {
    dispatch({
      type: ROUTE,
      payload: route,
    })
    dispatch(routerRedux.push(route))
  }
}

const login = gname => dispatch => dispatch({ type: LOGIN, payload: { gname } })
const register = code => dispatch => dispatch({ type: REG, payload: { code } })
const changeLanguage = lang => dispatch => dispatch({ type: CHANGE_LANGUAGE, payload: lang })

@connect(state => ({
  language: state.common.language,
  route: state.common.route,
  loginStatus: state.common.loginStatus,
}), { changeRouter, login, changeLanguage, register })
export default class Home extends React.Component {
  componentDidMount() {
    const dom = document.querySelector('.ant-layout-sider')
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
    // this.checkCookie()
  }
  searchContent(val) {
    this.props.changeRouter(`/search?query=${encodeURI(val)}`)
  }
  render = () => {
    const { route } = this.props

    const user = {
      avatar_url: '',
      bio: '',
      blog: '',
      company: '@CQUPTBee',
      created_at: '1503293556978',
      email: '',
      url: 'https://api.github.com/users/879479119/followers',
      followers: 24,
      followers_url: 'https://api.github.com/users/879479119/followers',
      following: 13,
      id: 12726506,
      location: 'Chongqin,China',
      login: '',
      name: '',
      public_gists: 0,
      public_repos: 18,
      type: 'User',
    }

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
              <Menu.Item key="8"><Link to={'/trending'}><Icon type="notification" />Trending</Link></Menu.Item>
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
