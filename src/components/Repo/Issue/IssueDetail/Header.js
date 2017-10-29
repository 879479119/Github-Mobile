import React, { Component } from 'react'
import cls from 'classnames'
import { Button, Icon } from 'antd'
import { Link } from 'react-router-dom'
import './Header.scss'
import { fromNow } from '../../../../utils/formatDate'

export default class Header extends Component {
  render() {
    const { issue } = this.props
    return (
      <div className="issue-c-header">
        <section className="ich-title">
          <h2>{issue.title} <span className="number" >#{issue.number}</span></h2>
          <State
            user={issue.user.login}
            state={issue.state}
            comments={issue.comments}
            created_at={issue.created_at}
          />
        </section>
        <section className="control-panel">
          <Button type="primary">New Issue</Button>
        </section>
      </div>
    )
  }
}

function State({
  state, user, comments, created_at,
}) {
  let icon = ''
  let text = ''
  if (state === 'open') {
    icon = 'info-circle-o'
    text = 'open'
  } else if (state === 'closed') {
    icon = 'close-circle-o'
    text = 'closed'
  } else if (state === 'closed') {
    icon = 'close-circle-o'
    text = 'closed'
  }
  return (
    <p>
      <span className={cls('ich-state', text)}>
        <Icon type={icon} /> {text}
      </span>
      <span>
        <Link to={`/user/${user}/profile`}>{user}</Link>
        &nbsp;&nbsp;&nbsp;created this issue {fromNow(created_at)} ~ {comments} comments
      </span>
    </p>
  )
}
