import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, Select, Spin} from "antd";
import "./index.scss";
import {commonFetch, commonRelease} from "../../../views/QueueRedux";
import addDataFetch from '../../../redux/addDataFetch'
import {connect} from "react-redux";
import formatDate from "../../../utils/formatDate";
import {FormattedMessage} from "react-intl"
import PropTypes from "prop-types"
import ChangeLog from "./ChangeLog"


const Option = Select.Option
const ButtonGroup = Button.Group
export const API = [
	'/api/repos/getCommit',
]

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class extends Component{
	static contextTypes = {
		details: PropTypes.object
	}
	componentDidMount(){
		const { commonFetch } = this.props,
			owner = this.props.match.params.username,
			repo = this.props.match.params.repo,
			sha = this.props.match.params.sha

			if(this.getData(API[0]).status === 3){}
			else commonFetch(API[0], {owner, repo, sha})
	}
	render = () => {
		const { details } = this.context,
			owner = this.props.match.params.username,
			repo = this.props.match.params.repo

		let commit = this.getData(API[0])

		let content = ''
		if(commit.result){
			content = commit.result.data.data.files.map((item, index) => (
				<ChangeLog file={item} key={index}/>
			))
		}

		return (
			<div className="main-body">
				{content}
			</div>
		)
	}
}