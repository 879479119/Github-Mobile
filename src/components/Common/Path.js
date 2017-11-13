import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { withRouter } from 'react-router-dom'

@withRouter
export default class Path extends Component {
  render() {
    const [, branch, path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)
    const crumbs = path.split('/')
    crumbs.shift()
    const _this = this
    let base = ''
    return (
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item key="home"><PLink p="">{this.props.repo}</PLink></Breadcrumb.Item>
        {
          crumbs.map(item => (
            <Breadcrumb.Item key={item}><PLink p={base += `/${item}`}>{item}</PLink></Breadcrumb.Item>
          ))
        }
      </Breadcrumb>
    )
    function PLink({ p, children }) {
      return <Link to={`/repo/${_this.props.user}/${_this.props.repo}/code/${branch}${p}`}>{children}</Link>
    }
  }
}

