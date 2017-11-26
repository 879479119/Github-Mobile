import { resolve } from 'path'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Select } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './index.scss'
import { pushHistory } from '../../../../layouts/HomeRedux'
import {
  changeDirectoryForRepo,
  fetchBranchesForRepo,
  changeBranchForRepo,
  fileSystem,
  REPO_BRANCH_GET,
} from '../../../../views/RepoRedux'
import PathBreadcrumb from '../../../Common/Path'
import DirExplore from './DirExplore'
import CodeStage from '../../../Common/CodeStage'

const { Option } = Select
const ButtonGroup = Button.Group

@withRouter
@connect(state => ({
  repo: state.repo,
  query: state.query,
}), { pushHistory, changeDirectoryForRepo, fetchBranchesForRepo, changeBranchForRepo })
export default class extends Component {
  static contextTypes = {
    details: PropTypes.object,
  }
  componentDidMount() {
    const { username: owner, repo } = this.props.match.params
    let [,branch, path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)
    path = resolve('/', path)
    this.props.changeDirectoryForRepo({ owner, path, repo, branch })
  }
  onChange = (path) => {
    // this.props.pushHistory(path)
    const { username: owner, repo } = this.props.match.params
    let [, branch] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)
    this.props.changeDirectoryForRepo({ owner, path, repo, branch })
  }
  loadSelections = () => {
    const { username: owner, repo } = this.props.match.params
    if (this.props.repo.branches.length === 0) {
      this.props.fetchBranchesForRepo({ owner, repo })
    }
  }
  selectBranch = (value) => {
    this.props.changeBranchForRepo({ branch: value })
  }
  render = () => {
    const { username, repo } = this.props.match.params
    const { content, branches } = this.props.repo
    const { repo: { [REPO_BRANCH_GET]: branchIsLoading } } = this.props.query
    let [, branch, path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/) //eslint-disable-line
    path = resolve('/', path)
    const lastOne = fileSystem.getSerializedList(path).slice(-1)[0]
    let file = null
    let detail = {}
    let fileLoading = false
    if (lastOne.type === 'file' && lastOne.children.length === 0) {
      if (lastOne.detail.content === undefined) fileLoading = true
      else {
        const buffer = new Buffer(lastOne.detail.content, 'base64')  //eslint-disable-line
        file = buffer.toString()
        detail = lastOne.detail // eslint-disable-line
      }
    }
    return (
      <div className="main-body">
        <section>
          <Select
            value={branch}
            style={{ width: 120 }}
            onChange={this.selectBranch}
            onFocus={this.loadSelections}
          >
            {branchIsLoading === true ? <Option value="master">Loading...</Option>
              : branches.map(t => (<Option key={t} value={t}>{t}</Option>))}
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
          branch={branch}
          getFile={this.getFile}
        />
        <div>
          <CodeStage
            content={file}
            loading={fileLoading}
            detail={detail}
          />
        </div>
      </div>
    )
  }
}
