import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import './index.scss'
import addDataFetch from '../../../redux/addDataFetch'
import { commonFetch, commonRelease } from '../../../views/QueueRedux'
import './IssueContent.scss'
import Header from './IssueDetail/Header'
import Comment from './IssueDetail/Comment'
import Event from './IssueDetail/Event'

const API = [
  '/api/issues/get',
  '/api/issues/getComments',
  '/api/issues/getEventsTimeline',
]

@withRouter
@connect(state => ({
  queue: state.queue,
}), { commonFetch, commonRelease })
@addDataFetch
export default class extends Component {
  componentDidMount() {
    const { commonFetch: fetch } = this.props
    const { username, repo, sid } = this.props.match.params

    for (let i = 0; i < API.length; i++) {
      if (this.getData(API[i]).status !== 3) {
        fetch(API[i], {
          owner: username, repo, issue_number: sid, number: sid,
        })
      }
    }
  }
  render = () => {
    // map the data we need
    const issue = this.getData(API[0])
    const comments = this.getData(API[1])
    const timeline = this.getData(API[2])
    // combine the components we need
    let header = ''
    let list = ''
    if (issue.status === 3) {
      header = <Header issue={issue.result.data.data} />
    }
    // updated to use only the timeline data
    if (comments.status === 3 && timeline.status === 3) {
      const time = timeline.result.data.data
      list = time.map((item) => {
        if (item.event === 'commented') {
          return <Comment detail={item} />
        } else {
          return <Event detail={item} />
        }
      })
    }
    /**
     * combine all the factors into a timeline
     *  - header, general information of this issue
     *  - first comment, the issue itself
     *  - comments, the comments array mix with all the timeline events
     *  - text editor, add your comment
     */
    return (
      <div className="main-body " style={{ position: 'relative' }}>
        {header}
        <div className="timeline">
          <Comment detail={issue.result ? issue.result.data.data : {}} />
          {list}
        </div>
      </div>
    )
  }
}
