import React from 'react'
import { Link } from 'react-router-dom'
import { Icon } from 'antd'
import cls from 'classnames'
import './IssueList.scss'
import { fromNow } from '../../../utils/formatDate'

export default function IssueList({
  list = [], className, base, ...props
}) {
  return (
    <ul className={cls('issues', className)} {...props}>
      {
        // TODO: judge if it's a user or an org
        list.map((item) => {
          return (
            <li className="issue-item">
              <Link to={`${base}/${item.number}`} className="i-s-head">
                {item.state === 'open' ? <Icon type="exclamation-circle-o" style={{ color: '#278b52' }} /> : ''}
                {item.title}
              </Link>
              <div>
                {
                  item.labels.map(label => (
                    <Link
                      to={`${base}?label=${label.name}`}
                      className="label"
                      style={{ background: `#${label.color}` || '#fff', color: label.default ? '#333' : '#fff' }}
                    >
                      {label.name}
                    </Link>))
                }
              </div>
              {item.comments > 0 ?
                <Link to={`${base}/${item.number}`} className="i-s-comments"><Icon type="message" />{item.comments}
                </Link> : ''}
              <p>#{item.number} opened on {fromNow(item.created_at)} by&nbsp;
                <Link
                  to={`/user/${item.user.login}/profile`}
                >{item.user.login}
                </Link>
              </p>
            </li>
          )
        })
      }
    </ul>
  )
}
