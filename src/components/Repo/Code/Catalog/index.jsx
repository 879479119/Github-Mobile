import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Select } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './index.scss'
import { commonFetch, commonRelease } from '../../../../views/QueueRedux'
import { repoContentInit } from '../../../../views/RepoRedux'
import addDataFetch from '../../../../redux/addDataFetch'
import PathBreadcrumb from '../../../Common/Path'
import DirExplore from './DirExplore'
import CodeStage from '../../../Common/CodeStage'

const { Option } = Select
const ButtonGroup = Button.Group
export const API = [
  '/api/repos/getContent',
]

@withRouter
@connect(state => ({
  code: state.repo.code,
}), { commonFetch, commonRelease, repoContentInit })
@addDataFetch
export default class extends Component {
  static contextTypes = {
    details: PropTypes.object,
  }
  state = {
    file: null,
  }
  getFile(content) {
    this.setState({
      file: content,
    })
  }
  callbackLink(path) {
    const { repoContentInit: init } = this.props
    init(path, false)
  }
  render = () => {
    const { username, repo } = this.props.match.params
    const [path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)
    let file = null
    if (this.state.file) {
      const buffer = new Buffer(this.state.file, 'base64')  //eslint-disable-line
      file = buffer.toString()
    }
    return (
      <div className="main-body">
        <section>
          <Select defaultValue="master" style={{ width: 120 }}>
            <Option value="master">Master</Option>
            <Option value="lucy">Others</Option>
          </Select>
          <section style={{ display: 'inline-block', marginLeft: 20 }}>
            <PathBreadcrumb user={username} repo={repo} />
          </section>
          <ButtonGroup style={{ float: 'right' }}>
            <Button>Create new file</Button>
            <Button>Upload files</Button>
            <Button>Find file</Button>
            <Button>History</Button>
          </ButtonGroup>
        </section>
        <DirExplore callback={::this.callbackLink} defaultPath={path} repo={repo} owner={username} branch="master" getFile={::this.getFile} />
        <div>
          <CodeStage content={file} />
        </div>
      </div>
    )
  }
}
