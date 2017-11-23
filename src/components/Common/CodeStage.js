import React, { Component } from 'react'
import { Spin } from 'antd'

class CodeStage extends Component {
  render() {
    const { loading } = this.props
    if (loading) {
      return (
        <div key="code" >
          <Spin />
        </div>
      )
    }
    return (
      <div key="code" >
        <pre style={{ marginTop: 20, padding: 30, background: '#fafafa' }}>{this.props.content}</pre>
      </div>
    )
  }
}

export default function ({ ...props }) {
  return <CodeStage {...props} />
}
