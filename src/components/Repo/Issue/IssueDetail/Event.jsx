import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"
import {Icon} from "antd";
import {Link} from "react-router-dom";
import {fromNow} from "../../../../utils/formatDate"
import "./Event.scss"

export default class Event extends PureComponent {
	static propType = {}

	constructor(...props) {
		super(...props)
	}

	componentDidMount() {

	}

	render() {
		const {event} = this.props.detail
		switch (event){
			case "cross-referenced": return <CrossReference detail={this.props.detail}/>
		}
		return (
			<div>{this.props.detail.actor.login} - {this.props.detail.event}</div>
		)
	}
}

function CrossReference({detail}) {
	return (
		<div className="cross-referenced">
			<p className="icon"><Icon type="flag" style={{marginTop: 6}}/></p>
			<section>
				<img src={detail.actor.avatar_url} alt="face"/>
				<Link to={`/user/${detail.actor.login}`}>{detail.actor.login}</Link>
				referenced this issue {fromNow(detail.created_at)}
				<p>{detail.source.issue.title} <span>&nbsp;&nbsp;&nbsp;#{detail.source.issue.number}</span></p>
			</section>
			<p className="state">{detail.source.issue.state === "closed" ? <span><Icon type="usb"/>merged</span> : ''}</p>
		</div>
	)
}

function Reference({detail}) {

}