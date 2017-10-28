import React, { Component } from 'react'
import CodeTree from '../CodeTree'

export default class DirExplore extends Component {
  state = {
    path: this.props.defaultPath,
  }
  pathChanged(path) {
    this.setState({
      path,
    })
  }
  render() {
    const {
      owner, repo, getFile,
    } = this.props
    let { path } = this.state
    const treePath = [path]
    let i = 1
    while ((path = path.replace(/\/([^/]*)$/, '')) && i++ < 3) {
      treePath.push(path)
    }
    if (path === '') treePath.push('')
    treePath.splice(3)
    return (
      <section className="file-content" style={{ display: 'flex' }}>
        {
          treePath.reverse().map((item, index) => {
            if (index > 2) return ''
            return <CodeTree path={item} className="tree" simple callback={::this.pathChanged} getFile={getFile} owner={owner} repo={repo} />
          })
        }
      </section>
    )
  }
}
