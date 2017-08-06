import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"

export default function({...props}) {

	return <CodeStage {...props}/>
}

class CodeStage extends Component {
	static propType = {}

	constructor(...props) {
		super(...props)
	}
	componentDidMount() {

	}
	render() {
		return (
			<div key="code" >

				<pre style={{marginTop: 20, padding: 30, background: "#fafafa"}}>{this.props.content}</pre>
			</div>
		)
	}
}