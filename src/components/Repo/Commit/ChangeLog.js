import React, { Component } from 'react'

export default class ChangeLog extends Component {
  render() {
    const { file } = this.props
    return (
      <div className="commit-cell">{stringify(file.patch)}</div>
    )
  }
}

function stringify(file) {
  const lines = file.split('\n')
  let left = 0
  let right = 0
  const domNode = lines.map((line) => {
    const division = line.match(/^@@ -(\d+),(\d+) \+(\d+),(\d+) @@.*/)
    if (division !== null) {
      // refresh the start position
      left = +division[1]
      right = +division[3]
      console.info(left, right)
      return <tr className="c-more"><td colSpan={2}>more</td><td><pre>{line}</pre></td></tr>
    }

    if (/^-.*/.test(line)) {
      return <tr className="c-del"><td>{left++}</td><td /><td><pre>{line}</pre></td></tr>
    }

    if (/^\+.*/.test(line)) {
      return <tr className="c-add"><td /><td>{right++}</td><td><pre>{line}</pre></td></tr>
    }

    return <tr className="c-normal"><td>{left++}</td><td>{right++}</td><td><pre>{line}</pre></td></tr>
  })
  return <table className="commit-compare-table">{domNode}</table>
}
