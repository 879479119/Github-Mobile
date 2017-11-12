import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Select } from 'antd'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './index.scss'
import {
  fetchContentForRepo,
  fetchLanguageForRepo,
  fetchReadmeForRepo,
  fetchStatsForRepo,
} from '../../../views/RepoRedux'
import { pushHistory } from '../../../layouts/HomeRedux'
import CodeTree from './CodeTree'
import User from './User'
import LanguageBar from './LanguageBar'
import CommitBar from './CommitBar'
import formatDate from '../../../utils/formatDate'

const { Option } = Select
const ButtonGroup = Button.Group

@withRouter
@connect(state => ({
  repo: state.repo,
}), {
  fetchContentForRepo, fetchLanguageForRepo, fetchReadmeForRepo, fetchStatsForRepo, pushHistory,
})
export default class extends Component {
  static contextTypes = {
    details: PropTypes.object,
  }
  componentDidMount() {
    const { repo, username: owner } = this.props.match.params
    if (this.props.repo.repo !== repo || this.props.repo.owner !== owner) {
      this.props.fetchContentForRepo({ owner, repo, path: '' })
      this.props.fetchStatsForRepo({ owner, repo })
      this.props.fetchLanguageForRepo({ owner, repo })
      this.props.fetchReadmeForRepo({ owner, repo })
    }
  }
  componentWillReceiveProps() {
  }
  changeContentView = (path) => {
    const { repo, username: owner } = this.props.match.params
    this.props.pushHistory(`/repo/${owner}/${repo}/code/master${path}`)
  }
  render = () => {
    const { details: repoProfile } = this.context
    const { content, language, readme, stats: commits } = this.props.repo
    return (
      <div className="main-body">
        <p className="description">{
          repoProfile ?
            repoProfile.detail.description :
            <span style={{
              width: 500,
              background: '#ecf6fd',
              display: 'inline-block',
              height: 20,
              opacity: 0.5,
            }}
            />
        }
        </p>
        <LanguageBar lang={language} />
        <CodeTree
          owner={repoProfile.owner}
          repo={repoProfile.name}
          list={content.children.map(t => t.detail)}
          onChange={this.changeContentView}
          style={{ display: 'inline-block' }}
        />
        <div className="right-part">
          <div className="repo-header">
            <section className="operation">
              <Select defaultValue="master" style={{ width: 120 }}>
                <Option value="master">Master</Option>
                <Option value="lucy">Others</Option>
              </Select>
              <ButtonGroup style={{ float: 'right' }}>
                <Button>Create new file</Button>
                <Button>Upload files</Button>
                <Button>Find file</Button>
              </ButtonGroup>
            </section>
            <section>
              <Button>New pull request</Button>
              <Button type="primary" style={{ float: 'right' }}>Clone or download</Button>
            </section>
            <section className="timeline">
              <span>Created:
                <em>{repoProfile ? formatDate(repoProfile.detail.created_at, true) : '_'}</em>
              </span>
              <span>Pushed:
                <em>{repoProfile ? formatDate(repoProfile.detail.pushed_at, true) : '_'}</em>
              </span>
              <span>Updated:
                <em>{repoProfile ? formatDate(repoProfile.detail.updated_at, true) : '_'}</em>
              </span>
            </section>
            <User
              style={{ position: 'absolute', top: 0, right: 0 }}
              owner={repoProfile.detail.owner || {}}
            />
          </div>
          <CommitBar data={commits || { all: [0] }} />
        </div>
        <article
          dangerouslySetInnerHTML={{ __html: readme || 0 }}
          className="readme"
        />
      </div>
    )
  }
}
