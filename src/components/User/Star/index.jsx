import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "./index.scss";
import {commonFetch, commonRelease} from "../../../views/QueueRedux";
import addDataFetch from "../../../redux/addDataFetch";
import RepoList from "../../Search/Repo"
import {Card, Icon, Tooltip} from "antd";
export const API = [
	'/api/activity/getStarredReposForUser',
]

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class Profile extends Component{
	componentDidMount(){
		const { commonFetch } = this.props
		let username = this.props.match.params.username

		if(this.getData(API[0]).status === 3){}
		else commonFetch(API[0], {username})
	}
	render = () => {
		let repos = this.getData(API[0])

		let username = this.props.match.params.username
		if(repos.status === 3){
			return (
				<RepoList result={repos.result.data.data} className="user-repo-list" />
			)
		}
		return (
			<div>Loading</div>
		)
	}
}