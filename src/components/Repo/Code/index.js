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
import CodeTree from './CodeTree'
import User from './User'
import LanguageBar from './LanguageBar'
import CommitBar from './CommitBar'
import formatDate from '../../../utils/formatDate'
import owner from "../../../views/OwnerRedux";

const { Option } = Select
const ButtonGroup = Button.Group

@withRouter
@connect(state => ({
  repo: state.repo,
}), {
  fetchContentForRepo, fetchLanguageForRepo, fetchReadmeForRepo, fetchStatsForRepo,
})
export default class extends Component {
  static contextTypes = {
    details: PropTypes.object,
  }
  componentDidMount() {
    const { repo, username: owner } = this.props.match.params
    if (this.props.repo.repo !== repo || this.props.repo.owner !== owner) {
      this.props.fetchContentForRepo({ owner, repo, path: '/' })
      this.props.fetchStatsForRepo({ owner, repo })
      this.props.fetchLanguageForRepo({ owner, repo })
      this.props.fetchReadmeForRepo({ owner, repo })
    }
  }
  render = () => {
    const { details } = this.context
    const { content, language, readme, stats: commits } = this.props.repo
    return (
      <div className="main-body">
        <p className="description">{
          details ?
            details.description :
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
          owner={details.owner}
          repo={details.name}
          list={[content]}
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
                <em>{details ? formatDate(details.created_at, true) : '_'}</em>
              </span>
              <span>Pushed:
                <em>{details ? formatDate(details.pushed_at, true) : '_'}</em>
              </span>
              <span>Updated:
                <em>{details ? formatDate(details.updated_at, true) : '_'}</em>
              </span>
            </section>
            <User
              style={{ position: 'absolute', top: 0, right: 0 }}
              owner={details || {}}
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
