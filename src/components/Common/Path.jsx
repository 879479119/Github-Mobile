import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"
import {Link} from "react-router-dom"
import {Breadcrumb} from "antd"
import {withRouter} from "react-router-dom";

@withRouter
export default class Path extends PureComponent {
	static propType = {}

	constructor(...props) {
		super(...props)
	}

	componentDidMount() {

	}

	render() {
		let [,branch,path] = this.props.location.pathname.match(/\/code\/([^/]*)(.*)$/)
		let crumbs = path.split('/')
		crumbs.shift()
		let _this = this, base = ''

		return (
			<Breadcrumb style={{ margin: '12px 0' }}>
				<Breadcrumb.Item key="home"><PLink p={''}>{this.props.repo}</PLink></Breadcrumb.Item>
				{
					crumbs.map((item, index) => (
						<Breadcrumb.Item key={'b'+index} ><PLink p={base += '/' + item}>{item}</PLink></Breadcrumb.Item>
					))
				}
			</Breadcrumb>
		)

		function PLink({p, children}) {
			return (
				<Link to={`/repo/${_this.props.user}/${_this.props.repo}/code/${branch}`+p}>{children}</Link>
			)
		}
	}
}

