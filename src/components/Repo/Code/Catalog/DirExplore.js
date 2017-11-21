import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CodeTree from '../CodeTree'

import { fileSystem } from '../../../../views/RepoRedux'

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
      owner, repo,
    } = this.props
    const { defaultPath: path } = this.props
    const ret = fileSystem.getSerializedList(path) || []
    return (
      <section className="file-content" style={{ display: 'flex' }}>
        {
          ret.slice(-3).map((item, i) => {
            return (<CodeTree
              path={item.path}
              key={item.path || i}
              className="tree"
              simple
              isFile={item.type === 'file' && item.children.length === 0}
              file={item.detail}
              onChange={this.pathChanged}
              list={item.children.map(p => p.detail)}
              owner={owner}
              repo={repo}
            />)
          })
        }
      </section>
    )
  }
}
