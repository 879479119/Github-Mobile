import React, { PureComponent, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Icon, Spin, Tooltip } from 'antd'
import cls from 'classnames'
import './CodeTree.scss'
import request from '../../../utils/request'
import formatSize from '../../../utils/formatSize'
import formatDate from '../../../utils/formatDate'
import emojizer from '../../../utils/emojizer'
import Lang from '../../../utils/languages'

export default class CodeTree extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }
  clickHandler = (event) => {
    let path = ''
    if (event.target.href && (path = event.target.href.replace(/.*code\/master/, ''))) {
      this.props.onChange(path)
    }
  }
  render() {
    const {
      style, simple = false, className, repo, owner,
    } = this.props
    const list = this.props.list.slice()
    for (let i = 0; i < list.length; i++) {
      if (list[i].type === 'dir') list.unshift(...list.splice(i, 1))
    }
    if (list.length === 0) {
      return (
        <div className={cls('code-tree', className)} style={Object.assign({}, style, { width: 300 })}>
          <Spin />
        </div>
      )
    }
    if (list[0].url === undefined) return null
    if (list[0].type === 'file' && list[0].content) {
      const data = list[0]
      let lang = ''
      let color = ''
      try {
        // FIXME: error with regexp
        lang = data.name.replace(/.*\./gi, '')
        const extensionMap = {
          js: 'JavaScript',
          php: 'PHP',
          rb: 'Ruby',
          html: 'HTML',
        }
        color = Lang[extensionMap[lang]]['color'] // eslint-disable-line
      } catch (E) {
        console.info('CANNOT FIND THE COLOR OF THE EXT')
        console.info(E)
      }
      return (
        <div className={cls('code-tree', 'file-type', className)} style={style}>
          <section className="bg_black">
            <div className="bg_white">
              <h3 style={{ color }}>&lt;{lang}/&gt;</h3>
              <p>{data.name}</p>
            </div>
            <p className="download" >
              <Icon type="download" />
              &nbsp;&nbsp;
              <a download href={data.download_url}>download</a>
            </p>
          </section>
        </div>
      )
    }

    return (
      <div className={cls('code-tree', className)} style={style} onClick={this.clickHandler}>
        <ul>
          {
            list.map((item, i) =>
              (<HoverItem
                key={i} //eslint-disable-line
                item={item}
                simple={simple}
                repo={repo}
                owner={owner}
              />))
          }
        </ul>
      </div>
    )
  }
}

class Item extends PureComponent {   // eslint-disable-line
  static contextTypes = {
    details: PropTypes.object,
  }
  render() {
    const { item, simple } = this.props
    // TODO: master temp
    const f = item.url.match(/repos\/(.+)\?ref/)[1].replace(/contents/, 'code/master')
    return (
      <li className={item.type}>
        <Link to={`/repo/${f}`} key={`/repo/${f}`}>
          <Icon type={item.type === 'file' ? 'file-text' : 'folder'} />{item.name}
        </Link>
        {simple ? null : <Link to={`/commit/${item.sha}`}>{item.sha}</Link>}
        <em>{item.size !== 0 ? formatSize(item.size) : ''}</em>
      </li>
    )
  }
}

class HoverItem extends Item {
  state = {
    sent: false,
    loading: true,
    list: [],
  }
  handleHover = async (e) => {
    const { item: { path }, repo, owner } = this.props
    if (e === true && this.state.sent === false) {
      const result = await request('/api/repos/getCommits', {
        owner,
        repo,
        path,
      })
      this.setState({
        sent: true,
      })
      const data = await result.json()
      this.setState({
        list: data.data.data,
        loading: false,
      })
    }
  }
  render() {
    let overlay = ''
    const { repo, owner } = this.props
    if (this.state.loading) {
      overlay = <Icon type="loading" />
    } else if (this.state.sent === true && this.state.list.length > 0) {
      // render the result list
      overlay = (
        <ul>
          {this.state.list.map(item => (
            <li>
              <Link to={`/repo/${owner}/${repo}/commit/${item.sha}`}>
                <span className="ct-message">{emojizer(item.commit.message, false)}</span>
                <span style={{ float: 'right' }}>{formatDate(item.commit.committer.date)}</span>
              </Link>
            </li>))}
        </ul>
      )
    } else {
      // error and reload
    }
    return (
      <Tooltip
        overlay={overlay}
        overlayClassName="tooltip-modified"
        onVisibleChange={this.handleHover}
        mouseEnterDelay={1}
      >
        {super.render()}
      </Tooltip>
    )
  }
}
