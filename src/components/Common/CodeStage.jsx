import React, { Component } from 'react'

class CodeStage extends Component {
  render() {
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
