import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"
import {Icon} from "antd";
import {Link} from "react-router-dom";
import {fromNow} from "../../../../utils/formatDate"
import request from "../../../../utils/request"
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
			case "commented": return <span/>
			case "closed": return <Closed detail={this.props.detail} />
			case "subscribed": return <span/>
			case "referenced": return <Reference detail={this.props.detail}/>
		}
		return <span/>
	}
}

function CrossReference({detail}) {
	return (
		<div className="cross-referenced issue-event">
			<p className="icon"><Icon type="flag"/></p>
			<section>
				<img src={detail.actor.avatar_url} alt="face"/>
				<Link to={`/user/${detail.actor.login}`}>{detail.actor.login}</Link>
				&nbsp;&nbsp;referenced this issue {fromNow(detail.created_at)}
				<p>{detail.source.issue.title} <span>&nbsp;&nbsp;&nbsp;#{detail.source.issue.number}</span></p>
			</section>
			<p className="state">{detail.source.issue.state === "closed" ? <span><Icon type="usb"/>merged</span> : ''}</p>
		</div>
	)
}


class Reference extends PureComponent{
	constructor(...props){
		super(...props)
		this.state = {
			data: {},
			loading: true,
			base: {
				owner: null,
				repo: null
			},
			shown: false
		}
	}
	componentDidMount() {
		const {detail: {commit_id, url}} = this.props
		let [,owner, repo] = url.match(/\/repos\/([^/]+)\/([^/]+)/)
		//change the state detail
		this.setState({
			base: {
				owner, repo
			}
		})
		request(`/api/repos/getCommit`, {
			owner, repo, sha: commit_id
		}).then(res => res.json()).then(json => {
			this.setState({
				data: json.data.data,
				loading: false
			})
			console.info(123,json)
		})
	}
	toggle(){
		this.setState({
			shown: !this.state.shown
		})
	}
	render(){
		const {detail} = this.props

		let Detail = () => {
			let msg = this.state.data.commit.message
			let [,pr_number, owner, branch, title, issue_number] = msg.match(/#(\d+) from ([^/]+)\/([^/\n↵]+)[↵\n]*(.*)#(\d+)$/)

			return (
				<div className="referenced-detail-item">
					<Icon type="swap-right"/>
					<img src={detail.actor.avatar_url} alt="face"/>
					<Link to={`/repo/${this.state.owner}/${this.state.repo}/commit/${this.state.data.sha}`}>Merge Pull Request From </Link>
					<Link to={`/user/${owner}/profile`}>{owner}</Link>/
					<Link to={`/repo/${owner}/${this.state.repo}/branch/${branch}`}>{branch}</Link>
					<span onClick={::this.toggle}><Icon type="ellipsis" /></span>
					<p style={{display: this.state.shown ? 'block' : 'none'}}>
						{title} <Link to={`/repo/${this.state.owner}/${this.state.repo}/issue/${issue_number}`}>#{issue_number}</Link>
					</p>
				</div>
			)
		}

		return (
			<div className="referenced">
				<div className="issue-event">
					<p className="icon"><Icon type="flag"/></p>
					<section>
						<img src={detail.actor.avatar_url} alt="face"/>
						<Link to={`/user/${detail.actor.login}`}>{detail.actor.login}</Link>
						&nbsp;&nbsp;added a commit that referenced this issue {fromNow(detail.created_at)}
					</section>
				</div>
				<div className="referenced-detail">{this.state.loading ? <Icon type="loading" /> : <Detail/> }</div>
				<div className="hr"/>
			</div>
		)


	}
}

function Closed({detail}) {
	return (
		<div className="closed">
			<div className="issue-event">
				<p className="icon"><Icon type="close-circle-o"/></p>
				<section>
					<img src={detail.actor.avatar_url} alt="face"/>
					<Link to={`/user/${detail.actor.login}`}>{detail.actor.login}</Link>
					&nbsp;&nbsp;closed this issue {fromNow(detail.created_at)}
				</section>
			</div>
			<div className="hr"/>
		</div>
	)
}