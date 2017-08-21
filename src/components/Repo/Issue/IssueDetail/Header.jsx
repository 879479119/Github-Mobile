import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"
import {Button, Icon} from "antd"
import "./Header.scss"
import {Link} from "react-router-dom";
import {fromNow} from "../../../../utils/formatDate"

export default class Header extends PureComponent {
	static propType = {
		issue: PropTypes.object.isRequired
	}

	constructor(...props) {
		super(...props)
	}

	componentDidMount() {

	}

	render() {
		const {issue} = this.props
		return (
			<div className="issue-c-header">
				<section className="ich-title">
					<h2>{issue.title} <span className="number" >#{issue.number}</span></h2>
					<State user={issue.user.login} state={issue.state} comments={issue.comments} created_at={issue.created_at} />
				</section>
				<section className="control-panel">
					<Button type="primary">New Issue</Button>
				</section>
			</div>
		)
	}
}

function State({state, user, comments, created_at}) {
	let icon = '', text = ''
	if(state === 'open'){
		icon = 'info-circle-o'
		text = 'open'
	}else if(state === 'closed'){
		icon = 'close-circle-o'
		text = 'closed'
	}else if(state === 'closed'){
		icon = 'close-circle-o'
		text = 'closed'
	}
	return (
		<p>
			<span className={cls("ich-state", text)}>
				<Icon type={icon} /> {text}
			</span>
			<span>
				<Link to={`/user/${user}/profile`}>{user}</Link>
				&nbsp;&nbsp;&nbsp;created this issue {fromNow(created_at)} ~ {comments} comments
			</span>
		</p>
	)
}