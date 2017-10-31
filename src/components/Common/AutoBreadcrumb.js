import React from 'react'
import { Breadcrumb } from 'antd'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

@withRouter
export default class AutoBreadcrumb extends React.Component {
  render() {
    const { location } = this.props
    return <p>null</p>
    const crumbs = location.pathname.match(/\/([\w-+%])+/g).map(t => t.slice(1))
    return (
      <Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item key="home">Github</Breadcrumb.Item>
        {crumbs.map(item => (
          <Breadcrumb.Item key={`b${Math.random()}`} ><Link to={location} />{item}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }
}
