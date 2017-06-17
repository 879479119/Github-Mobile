import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"

export default class Header extends Component {
	static propType = {
		issue: PropTypes.array.isRequired
	}

	constructor(...props) {
		super(...props)
	}

	componentDidMount() {

	}

	render() {
		const {issue} = this.props
		return (
			<div>
				<h2>{issue.title}</h2>
				<p>{issue.body}</p>
			</div>
		)
	}
}