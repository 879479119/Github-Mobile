import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"
import {Link} from "react-router-dom";
import {fromNow} from "../../../../utils/formatDate"
import {Icon} from "antd";
import "./Comment.scss"

export default class Comment extends Component {
	static propType = {}

	constructor(...props) {
		super(...props)
	}

	componentDidMount() {

	}

	render() {
		if(!('body' in this.props.detail)){
			return <p>loading</p>
		}
		const {detail} = this.props
		return (
			<div className="comment-card">
				<div className="cc-face">
					<Link to={`/user/${detail.user.login}/profile`}>
						<img src={detail.user.avatar_url} alt="face"/>
					</Link>
				</div>
				<div className="cc-cell">
					<section className="cc-header">
						<p>
							<Link to={`/user/${detail.user.login}/profile`}>{detail.user.login}</Link>
							&nbsp;&nbsp;&nbsp;commented {fromNow(detail.created_at)}
						</p>
						<p>
							<Icon type="smile-o" />
						</p>
					</section>
					<section className="cc-body">
						<p>
							{detail.body}
						</p>
					</section>
				</div>
			</div>
		)
	}
}