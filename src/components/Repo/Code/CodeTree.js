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
  constructor(...props) {
    super(...props)
    this.state = {
      directory: [],
      loading: true,
      fileDetail: undefined,
    }
  }
  async componentDidMount() {
    const { path } = this.props

    const result = await this.updatePath(path)

    if (result.data.data.length) {
      this.setState({ directory: result.data.data })  // eslint-disable-line
    } else {
      this.setState({ fileDetail: result.data.data }) // eslint-disable-line
      this.props.getFile(result.data.data.content)
    }
  }
  async updatePath(path) {
    const { owner, repo } = this.props
    this.setState({
      loading: true,
    })
    const content = await request('/api/repos/getContent', {
      owner,
      repo,
      path,
    })
    this.setState({
      loading: false,
    })
    const ret = await content.json()
    return ret
  }
  clickHandler(event) {
    let path = ''
    if (event.target.href && (path = event.target.href.replace(/.*code\/master/, ''))) {
      const { callback } = this.props
      callback(path)
    }
  }
  render() {
    const {
      style, simple = false, className, repo, owner,
    } = this.props
    const list = this.state.directory.slice()
    for (let i = 0; i < list.length; i++) {
      if (list[i].type === 'dir') list.unshift(...list.splice(i, 1))
    }
    if (this.state.loading === true) {
      return (
        <div className={cls('code-tree', className)} style={Object.assign({}, style, { width: 300 })}>
          <Spin />
        </div>
      )
    }
    if (this.state.fileDetail) {
      const data = this.state.fileDetail
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
      }
      return (
        <div className={cls('code-tree', 'file-type', className)} style={style}>
          <section className="bg_black">
            <div className="bg_white">
              <h3 style={{ color }}>&lt;{lang}/&gt;</h3>
              <p>{data.name}</p>
            </div>
            <p className="download" ><Icon type="download" />&nbsp;&nbsp;<a download href={data.download_url}>download</a></p>
          </section>
        </div>
      )
    }

    return (
      <div className={cls('code-tree', className)} style={style} onClick={::this.clickHandler}>
        <ul>{
          list.map(item =>
            <HoverItem item={item} simple={simple} repo={repo} owner={owner} />)
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
  constructor({ ...props }) {
    super(...props)
    this.state = {
      sent: false,
      loading: true,
      list: [],
    }
  }
  async handleHover(e) {
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
      <Tooltip overlay={overlay} overlayClassName="tooltip-modified" onVisibleChange={::this.handleHover} mouseEnterDelay={0.5}>
        {super.render()}
      </Tooltip>
    )
  }
}
