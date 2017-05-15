import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, Select, Spin} from "antd";
import {commonFetch, commonRelease} from "../../../views/RepoRedux";
import addDataFetch from '../../../redux/addDataFetch'
import {connect} from "react-redux";
import Chart from "./Chart"
import formatDate from "../../../utils/formatDate";

export const API = '/api/repos/getStatsContributors'

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class extends Component{
	componentDidMount(){
		const { commonFetch, owner, repo } = this.props

		if(this.getData(API).status === 3){}
		else commonFetch(API, {owner, repo})
	}
	render = () => {
		const { owner, repo } = this.props
		let contributor = this.getData(API)

		return (
			<div><Chart data={contributor.result}/></div>
		)
	}
}