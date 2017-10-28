import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import cls from 'classnames'
import './index.scss'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'

export const keys = ['contributor', 'traffic', 'commit', 'frequency', 'punch', 'network', 'member', 'dependent']

@withRouter
@connect(state => ({
  queue: state.queue,
}), { commonFetch, commonRelease })
export default class extends Component {
  // here is a hack trick, we just mount the style on "Link" rather than the "antd component"
  render = () => {
    const { graph, owner, repo } = this.props.match.params
    const btn = ['Contributors', 'Traffic', 'Commits', 'Code frequency', 'Punch card', 'Network', 'Members', 'Dependents']
    return (
      <div className="main-body">
        <div className="ant-btn-group">
          {btn.map((item, index) => (
            <Link
              className={cls('ant-btn', 'ant-btn-lg', graph === keys[index] ? 'ant-btn-primary' : 'ant-btn-default')}
              to={`/repo/${owner}/${repo}/graph/${keys[index]}`}
            >{item}
            </Link>
              ))}
        </div>
        {this.props.children}
      </div>
    )
  }
}
