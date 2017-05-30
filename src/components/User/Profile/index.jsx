import React, {Component} from "react"
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";
import "./index.scss"
import {commonFetch, commonRelease} from "../../../views/QueueRedux";
import addDataFetch from '../../../redux/addDataFetch'
import {Icon, Card} from 'antd'
import reflect from "../../../utils/languages"
import emojizer from "../../../utils/emojizer"

import RecentEvent from "./RecentEvent"
import CommitTable from "./CommitTable"
import Percentage from "./Percentage"

export const API = [
	'/api/repos/getForUser',
	'/api/users/getForUser',
]

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class Profile extends Component{
	render = () => {

		let username = this.props.match.params.username
		let repos = this.getData(API[0])
		let userInfo = this.getData(API[1])
		let content = ''

		if(repos.status === 3){
			let arr = repos.result.data.data.concat()
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
		}

		return (
				<div className="main-body">
					<div className="user-repos">
						{content}
						<CommitTable/>
					</div>
					<div className="aside">
						<Percentage percentage={[25,20,20,15,10,10]}>
							<p className="chart-lang">Language Chart</p>
						</Percentage>
						<RecentEvent/>
					</div>
				</div>
		)
	}
}