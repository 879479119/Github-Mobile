import React, { Component } from 'react'
import { find } from 'lodash'
import PropTypes from 'prop-types'
import CodeTree from '../CodeTree'

export default class DirExplore extends Component {
  static propTypes = {
    defaultPath: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
  }
  state = {
    path: this.props.defaultPath,
  }
  pathChanged = (path) => {
    this.setState({ path })
  }
  render() {
    const {
      owner, repo, getFile, content,
    } = this.props
    const { path } = this.state
    let t = content
    const treePath = path.split('/')
    const ret = []
    if (t.children.length !== 0) {
      for (let i = 0; i < treePath.length; i += 1) {
        if (t.path === treePath[i]) {
          ret.push(t.children)
          if (treePath[i + 1]) {
            t = find(t.children, { path: treePath[i + 1] })
          }
        }
      }
    }
    return (
      <section className="file-content" style={{ display: 'flex' }}>
        {
          ret.slice(-3).map((item) => {
            return (<CodeTree
              path={'/879479119'}
              className="tree"
              simple
              onChange={this.pathChanged}
              list={item.map((t) => t.detail)}
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
