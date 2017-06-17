import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import "./index.scss";
import {commonFetch, commonRelease} from "../../../views/QueueRedux";
import addDataFetch from "../../../redux/addDataFetch";
import {List as FollowerList} from "../../Trending/DeveloperList"
import {Card, Icon, Tooltip} from "antd";
export const API = [
	'/api/users/getFollowingForUser',
]

@withRouter
@connect(state=>({
	queue: state.queue,
	list: state.common.following
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
		let following = this.getData(API[0])

		let username = this.props.match.params.username
		if(following.status === 3){
			return (
				<FollowerList data={following.result.data.data} simple={true} list={this.props.list} />
			)
		}
		return (
			<div>Loading</div>
		)
	}
}