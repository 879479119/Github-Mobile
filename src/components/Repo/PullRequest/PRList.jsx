import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cls from 'classnames'
import './PRList.scss'
import { fromNow } from '../../../utils/formatDate'

export default function IssueList({
  list = [], className, base, ...props
}) {
  return (
    <ul className={cls('pr', className)} {...props}>
      {
        // TODO: judge if it's a user or an org
        list.map((item) => {
          return (
            <Item item={item} base={base} />
          )
        })
      }
    </ul>
  )
}

function IconMerge({ color = '#333' }) {
  return (
    <svg aria-hidden="true" className="" height="16" version="1.1" viewBox="0 0 12 16" width="12">
      <path
        fill={color}
        d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
      />
    </svg>
  )
}

class Item extends Component {
  constructor(...props) {
    super(...props)
    this.state = {
      display: false,
    }
  }

  handleDetails() {
    console.log(this.state.display)
    this.setState({
      display: !this.state.display,
    })
  }

  render = () => {
    const { item, base } = this.props
    return (
      <li className="issue-item">
        <section className="i-s-main">
          <Link to={`${base}/${item.number}`} className="i-s-head">
            {item.state === 'open' ? <IconMerge style={{ color: '#278b52' }} color="#278b52" /> : ''}
            {item.title}
          </Link>
          <a href="javascript:" className="i-s-details" onClick={::this.handleDetails}>Details</a>
          <p>#{item.number} opened {fromNow(item.created_at)} by&nbsp;
            <Link
              to={`/user/${item.user.login}/profile`}
            >
              {item.user.login}
            </Link>
          </p>
        </section>
        <section className="issue-body" style={{ display: this.state.display ? 'block' : 'none' }}>
          <pre dangerouslySetInnerHTML={{ __html: item.body }} />
        </section>
      </li>
    )
  }
}
