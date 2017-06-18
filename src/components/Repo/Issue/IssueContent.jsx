import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, Input, Select} from "antd";
import "./index.scss";
import addDataFetch from "../../../redux/addDataFetch";
import {commonFetch, commonRelease} from "../../../views/QueueRedux";
import {connect} from "react-redux";
import "./IssueContent.scss"
import Header from "./IssueDetail/Header"
import Comment from "./IssueDetail/Comment"
import Event from "./IssueDetail/Event"
import ListModified from "./ListModified";
import IssueList from "./IssueList"

const InputGroup = Input.Group
const Option = Select.Option
const ButtonGroup = Button.Group
const API = [
	'/api/issues/get',
	'/api/issues/getComments',
	'/api/issues/getEventsTimeline'
]

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class extends Component{
	componentDidMount(){
		const { commonFetch } = this.props
		const {username, repo, sid} = this.props.match.params

		for(let i = 0;i < API.length;i ++){
			if(this.getData(API[i]).status === 3){}
			else commonFetch(API[i], {owner: username, repo, issue_number: sid, number: sid})
		}
	}
	render = () => {
		const {username, repo, sid} = this.props.match.params.username
		//map the data we need
		let issue = this.getData(API[0])
		let comments = this.getData(API[1])
		let timeline = this.getData(API[2])

		//combine the components we need
		let header = "",
			list = ""
		if(issue.status === 3){
			header = <Header issue={issue.result.data.data} />
		}

		if(comments.status === 3 && timeline.status === 3){
			let time = comments.result.data.data.concat(timeline.result.data.data)
			time.sort((prev, cur)=> {
				if(prev.created_at > cur.created_at) return 1
				if(prev.created_at < cur.created_at) return -1
				return 0
			})
			list = time.map((item, index) => {
				if(item.event){
					return (
						<Event key={item.id} detail={item}/>
					)
				}else{
					return (
						<Comment key={item.id} detail={item}/>
					)
				}
			})
		}

		/**
		 * combine all the factors into a timeline
		 *  - header, general information of this issue
		 *  - first comment, the issue itself
		 *  - comments, the comments array mix with all the timeline events
		 *  - text editor, add your comment
		 */
		return (
			<div className="main-body " style={{position: "relative"}}>
				{header}
				<div className="timeline">
					<Comment detail={issue.result ? issue.result.data.data : {}}/>
					{list}
				</div>
			</div>
		)
	}
}