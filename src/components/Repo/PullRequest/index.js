import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Input, Select } from 'antd'
import { connect } from 'react-redux'
import './index.scss'
import addDataFetch from '../../../redux/addDataFetch'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import ListModified from '../Issue/ListModified'
import PRList from './PRList'

const InputGroup = Input.Group
const { Option } = Select
const ButtonGroup = Button.Group
const API = [
  '/api/pullRequests/getAll',
  '/api/issues/getLabels',
]

@withRouter
@connect(state => ({
  queue: state.queue,
}), { commonFetch, commonRelease })
@addDataFetch
export default class extends Component {
  componentDidMount() {
    const { commonFetch: fetch } = this.props
    const { username: owner, repo } = this.props.match.params

    for (let i = 0; i < API.length; i++) {
      if (this.getData(API[i]).status !== 3) {
        fetch(API[i], { owner, repo })
      }
    }
  }

  render = () => {
    const { owner, repo } = this.props
    const pr = this.getData(API[0])
    const labels = this.getData(API[1])
    const base = `/repo/${owner}/${repo}/issue`

    return (
      <div className="main-body">
        <section className="issue-panel">
          <InputGroup
            compact style={{
            position: 'relative', top: -2, display: 'inline-block', width: 'auto',
          }}
          >
            <Select defaultValue="Filters">
              <Option value="1">Open issues and pull requests</Option>
              <Option value="2">Your issues</Option>
            </Select>
            <Input style={{ width: 300 }} defaultValue="is:pr is:open" />
          </InputGroup>
          <ButtonGroup style={{ display: 'inline-block' }}>
            <Button>Labels</Button>
            <Button>Milestones</Button>
          </ButtonGroup>
          <Button type="primary" size="large">New pull request</Button>
          <InputGroup compact style={{ marginTop: 12 }} className="bar-filter">
            <Select defaultValue="Author">
              <Option value="asd" />
            </Select>
            <Select defaultValue="Label">
              <Option value="asd" />
            </Select>
            <Select defaultValue="Projects">
              <Option value="asd" />
            </Select>
            <Select defaultValue="Milestones">
              <Option value="asd" />
            </Select>
            <Select defaultValue="Assignee">
              <Option value="asd" />
            </Select>
            <Select defaultValue="Sort">
              <Option value="asd" />
            </Select>
          </InputGroup>
        </section>
        <section className="issue-card-container">
          <PRList base={base} list={pr.result ? pr.result.data.data : []} type="pr" />
          <ListModified className="i-s-labels" base={base} list={labels.result ? labels.result.data.data : []} />
        </section>
      </div>
    )
  }
}

