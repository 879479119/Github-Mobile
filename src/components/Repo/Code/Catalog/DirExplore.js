import React, { Component } from 'react'
import { find } from 'lodash'
import PropTypes from 'prop-types'
import CodeTree from '../CodeTree'

export default class DirExplore extends Component {
  static propTypes = {
    defaultPath: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  pathChanged = (path) => {
    this.props.onChange(path)
  }
  render() {
    const {
      owner, repo, getFile, content,
    } = this.props
    const { defaultPath: path } = this.props
    let t = content
    const treePath = path.split('/')
    const ret = []
    console.info(t)
    if (t.children.length !== 0) {
      for (let i = 0; i < treePath.length; i += 1) {
        if (t.path === treePath[i]) {
          ret.push(t)
          if (treePath[i + 1]) {
            t = find(t.children, { path: treePath[i + 1] })
          }
        }
      }
    }
    console.info(ret)
    return (
      <section className="file-content" style={{ display: 'flex' }}>
        {
          ret.slice(-3).map((item) => {
            return (<CodeTree
              path={item.path}
              key={item.path}
              className="tree"
              simple
              onChange={this.pathChanged}
              list={item.children.map((p) => p.detail)}
              getFile={getFile}
              owner={owner}
              repo={repo}
            />)
          })
        }
      </section>
    )
  }
}
