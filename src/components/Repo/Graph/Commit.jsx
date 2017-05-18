import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Select, Spin} from "antd";
import formatDate from "../../../utils/formatDate"
import {commonFetch, commonRelease} from "../../../views/RepoRedux";
import addDataFetch from '../../../redux/addDataFetch'
import {connect} from "react-redux";
import Chart from "./Chart/Chart"
import cls from "classnames"

export const API = '/api/repos/getStatsParticipation'

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
		let commit = this.getData(API)

		if(commit.result){

		}

		return (
			<div className="commits" style={{marginTop: 20}}>

			</div>
		)
	}
}