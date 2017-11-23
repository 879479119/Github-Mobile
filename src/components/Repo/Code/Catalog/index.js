import { resolve } from 'path'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Select } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './index.scss'
import { pushHistory } from '../../../../layouts/HomeRedux'
import { changeDirectoryForRepo, fileSystem } from '../../../../views/RepoRedux'
import PathBreadcrumb from '../../../Common/Path'
import DirExplore from './DirExplore'
import CodeStage from '../../../Common/CodeStage'

const { Option } = Select
const ButtonGroup = Button.Group

@withRouter
@connect(state => ({
  repo: state.repo,
}), { pushHistory, changeDirectoryForRepo })
export default class extends Component {
  static contextTypes = {
    details: PropTypes.object,
  }
  componentDidMount() {
    const { username: owner, repo } = this.props.match.params
    let [,, path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)
    path = resolve('/', path)
    this.props.changeDirectoryForRepo({ owner, path, repo })
  }
  onChange = (path) => {
    // this.props.pushHistory(path)
    this.props.changeDirectoryForRepo({ path })
  }
  render = () => {
    const { username, repo } = this.props.match.params
    const { content } = this.props.repo
    let [, branch, path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)
    path = resolve('/', path)
    const lastOne = fileSystem.getSerializedList(path).slice(-1)[0]
    let file = null
    let fileLoading = false
    if (lastOne.type === 'file' && lastOne.children.length === 0) {
      if (lastOne.detail.content === undefined) fileLoading = true
      else {
        const buffer = new Buffer(lastOne.detail.content, 'base64')  //eslint-disable-line
        file = buffer.toString()
      }
    }
    return (
      <div className="main-body">
        <section>
          <Select defaultValue="master" style={{ width: 120 }}>
            <Option value="master">Master</Option>
            <Option value="lucy">Others</Option>
          </Select>
          <section style={{ display: 'inline-block', marginLeft: 20 }}>
            <PathBreadcrumb user={username} repo={repo} path={path} branch={branch} />
          </section>
          <ButtonGroup style={{ float: 'right' }}>
            <Button>Create new file</Button>
            <Button>Upload files</Button>
            <Button>Find file</Button>
            <Button>History</Button>
          </ButtonGroup>
        </section>
        <DirExplore
          onChange={this.onChange}
          defaultPath={path}
          content={content}
          repo={repo}
          owner={username}
          branch="master"
          getFile={this.getFile}
        />
        <div>
          <CodeStage
            content={file}
            loading={fileLoading}
          />
        </div>
      </div>
    )
  }
}
