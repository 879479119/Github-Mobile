import React, {Component} from "react"
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import "./index.scss"
import {commonFetch, commonRelease} from "../../../views/QueueRedux";
import addDataFetch from '../../../redux/addDataFetch'
import {Icon, Card, Tooltip} from 'antd'
import reflect from "../../../utils/languages"
import emojizer from "../../../utils/emojizer"
import formatDate from "../../../utils/formatDate"

import RecentEvent from "./RecentEvent"
import CommitTable from "./CommitTable"
import Percentage from "./Percentage"

export const API = [
	'/api/repos/getForUser',
	'/api/users/getForUser',
	'/api/activity/getEventsForUser',
	'/api/orgs/getForUser'
]

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class Profile extends Component{
	componentDidMount(){

		const { commonFetch, user } = this.props
		let username = this.props.match.params.username

		if(this.getData(API[2]).status === 3 || user === username){}
		else commonFetch(API[2], {username})
		if(this.getData(API[3]).status === 3 || user === username){}
		else commonFetch(API[3], {username})
	}
	render = () => {

		let username = this.props.match.params.username
		let repos = this.getData(API[0])
		let userInfo = this.getData(API[1])
		let events = this.getData(API[2])
		let orgs = this.getData(API[3])
		let content = ''
		let percentage = [], evtData = [], orgData = []

		let user = {
			avatar_url: '',
			bio: '',
			blog: "",
			company: "",
			created_at:	"2015-06-03T06:35:45Z",
			email: "767444690@qq.com",
			followers: 24,
			following: 13,
			id: 12726506,
			location: "",
			login: "",
			name: "",
			public_repos: 18,
			type: "User",
		}


		if(repos.status === 3){
			let arr = repos.result.data.data.concat()

			//prepare for the repo part
			arr.sort((prev, cur) => {
				if(prev.stargazers_count > cur.stargazers_count) return -1
				else return 1
			})
			content = arr.splice(0,6).map((item, index)=>{
				return (
					<Card style={{width: 360}} key={'c'+index}>
						<h5>lll <Link to={`/repo/${username}/${item.name}`}>{item.name}</Link></h5>
						<p>{emojizer(item.description, false)}</p>
						<p>
							{item.language === '' ? '' : <span><span className="icon-lang" style={{background: reflect[item.language].color}}/>{item.language}</span>}
							<span><Icon type="star" /> {item.stargazers_count} </span>
							<span><Icon type="usb" /> {item.forks_count} </span>
						</p>
					</Card>
				)
			})

			//prepare for the percentage part
			let lang = {}, co = 0
			arr.forEach((item, i)=>{
				if(item.language in lang){
					percentage[lang[item.language]].count ++
				}else{
					lang[item.language] = co ++
					percentage.push({
						name: item.language,
						count: 1
					})
				}
			})
		}

		if(events.status === 3){
			evtData = events.result.data.data
		}

		if(userInfo.status === 3){
			user = Object.assign(user, userInfo.result.data.data)
		}

		if(orgs.status === 3){
			orgData = orgs.result.data.data
		}

		return (
				<div className="main-body">
					<div className="main-part">
						<UserInfo info={user} org={orgData}/>
						<div className="user-repos">
							{content}
							{/*<CommitTable/>*/}
						</div>
					</div>
					<div className="aside">
						<Percentage percentage={percentage}>
							<p className="chart-lang">Language Chart</p>
						</Percentage>
						<RecentEvent data={evtData}/>
					</div>
				</div>
		)
	}
}

function UserInfo({info, org}) {

	return (
		<div className="user-info">
			<ul>
				<li className="face"><img src={info.avatar_url} alt="face"/></li>
				<li>
					<p>Account: <a href={`https://github.com/${info.login}`}>{info.login}</a></p>
					<p>Username: <span>{info.name}</span></p>
					<p>Bio: <span>{info.bio}</span></p>
					<p>Joined at: <span>{formatDate(info.created_at)}</span></p>
				</li>
				<li>
					<p>Email: <a href={`mailto: ${info.email}`}>{info.email}</a></p>
					<p>Blog: <a href={info.blog} className="blog">{info.blog}</a></p>
					<p>Location: <span>{info.location}</span></p>
					<div className="org">
						<p>Organization:</p>
						{org.map((item, index)=>(
							<section key={index}>
								<Tooltip overlay={item.login}>
									<Link to={`/org/${item.login}`}><img src={item.avatar_url} alt="org"/></Link>
								</Tooltip>
							</section>
						))}
					</div>
				</li>
			</ul>
		</div>
	)
}