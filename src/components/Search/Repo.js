import React from 'react'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import cls from 'classnames'
import { fromNow } from '../../utils/formatDate'
import './Repo.scss'
import LANGUAGES from '../../utils/languages'
import emojizer from '../../utils/emojizer'

export default function ({ result, className }) {
  let array = []
  if (Object.prototype.toString.call(result) === '[object Array]') {
    array = result
  } else {
    array = result.items
  }
  return (
    <div className={cls('repo-container', className)}>
      <ul>
        {
          array.map((item) => {
            const color = item.language ? LANGUAGES[item.language]['color'] : ''
            return (
              <li className="repo-item" key={item.id}>
                <section className="first">
                  {item.fork ? <span><Icon type="usb" />&nbsp;&nbsp;&nbsp;</span> : ''}
                  <Link to={`/repo/${item.owner.login}/${item.name}`}>{item.full_name}</Link>
                  <p>{emojizer(item.description, false)}</p>
                  <em>Updated {fromNow(item.pushed_at)}</em>
                </section>
                <section className="second">
                  <p><span className="badge" style={{ background: color }} />{item.language}</p>
                  <p className="score"><Icon type="trophy" />{item.score}</p>
                </section>
                <section className="third">
                  <p><Icon type="star" />{item.stargazers_count}</p>
                  <p><Icon type="usb" />{item.forks_count}</p>
                  <p><Icon type="solution" />{item.open_issues}</p>
                </section>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
