import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Icon, Popover } from 'antd'
import showdown from 'showdown'
import { fromNow } from '../../../../utils/formatDate'
import './Comment.scss'
import '../../../Common/markdown.scss'

export default class Comment extends Component {
  render() {
    if (!('body' in this.props.detail)) {
      return <p>loading</p>
    }
    const { detail } = this.props
    const converter = new showdown.Converter()
    return (
      <div className="comment-card">
        <div className="cc-face">
          <Link to={`/user/${detail.user.login}/profile`}>
            <img src={detail.user.avatar_url} alt="face" />
          </Link>
        </div>
        <div className="cc-cell">
          <section className="cc-header">
            <p>
              <Link to={`/user/${detail.user.login}/profile`}>{detail.user.login}</Link>
                  &nbsp;&nbsp;&nbsp;commented {fromNow(detail.created_at)}
            </p>
            <p className="motion">
              <Popover placement="bottom" content={Motion()} title="Pick your reaction">
                <Icon type="smile-o" />
              </Popover>
            </p>
          </section>
          <section className="cc-body markdown">
            <p dangerouslySetInnerHTML={{ __html: converter.makeHtml(detail.body) }} />
          </section>
        </div>
      </div>
    )
  }
}

function Motion() {
  return (
    <p style={{ display: 'flex', justifyContent: 'space-between' }}>
      <span>👍🏻</span>
      <span>👎🏻</span>
      <span>😀</span>
      <span>🎉</span>
      <span>😕</span>
      <span>❤️</span>
    </p>
  )
}
