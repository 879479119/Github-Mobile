import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"
import CodeTree from "../CodeTree"
import request from "../../../../utils/request"

export default class DirExplore extends Component {
	static propType = {}

	constructor(...props) {
		super(...props)
		this.state = {
			path: this.props.defaultPath
		}
	}

	componentDidMount() {
		const {defaultPath} = this.props

	}

	pathChanged(path){
		this.setState({
			path
		})
	}

	render() {
		let { callback, owner, repo } = this.props
		let path = this.state.path

		let treePath = [path], i = 1
		while((path = path.replace(/\/([^/]*)$/,'')) && i ++ < 3){
			treePath.push(path)
		}
		if(path === '') treePath.push('')
		treePath.splice(3)

		return (
			<section className="file-content">
				{
					treePath.reverse().map((item, index) => {
						if(index > 2) return
						return <CodeTree key={item} path={item} className="tree" simple={true} callback={::this.pathChanged} owner={owner} repo={repo} />
					})
				}
			</section>
		)
	}
}