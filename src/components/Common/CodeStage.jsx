import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"
import "../../lib/syntaxhighlighter"
import "../../lib/theme.css"

export default class CodeStage extends Component {
	static propType = {}

	constructor(...props) {
		super(...props)
	}
	componentDidUpdate(){
		Syntaxhighlighter.default.highlight()
	}
	componentDidMount() {

	}
	render() {
		return (
			<div key="code" >
				<pre className="brush: js">{this.props.content}</pre>
			</div>
		)
	}
}