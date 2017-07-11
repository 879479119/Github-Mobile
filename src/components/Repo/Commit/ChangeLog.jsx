import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"

export default class ChangeLog extends PureComponent {
	static propType = {}

	constructor(...props) {
		super(...props)
	}

	componentDidMount() {

	}

	render() {
		const {file} = this.props

		// let text = file.patch.replace(/\\n/,)

		return (
			<div className="commit-cell">{stringify(file.patch)}</div>
		)
	}
}

function stringify(file) {
	let lines = file.split('\n')
	let left = 0, right = 0
	let domNode = lines.map((line, index) => {
		let result = ''
		let division = line.match(/^@@ -(\d+),(\d+) \+(\d+),(\d+) @@.*/)
		if(division !== null){
			//refresh the start position
			left = + division[1]
			right = + division[3]
			console.info(left, right)
			return <tr className="c-more"><td colSpan={2}>more</td><td><pre>{line}</pre></td></tr>
		}

		if(/^-.*/.test(line)){
			return <tr className="c-del"><td>{left ++}</td><td> </td><td><pre>{line}</pre></td></tr>
		}

		if(/^\+.*/.test(line)){
			return <tr className="c-add"><td> </td><td>{right ++}</td><td><pre>{line}</pre></td></tr>
		}

		return <tr className="c-normal"><td>{left ++}</td><td>{right ++}</td><td><pre>{line}</pre></td></tr>
	})
	return <table className="commit-compare-table">{domNode}</table>
}