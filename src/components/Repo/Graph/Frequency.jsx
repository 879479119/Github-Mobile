import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Select, Spin} from "antd";
import formatDate from "../../../utils/formatDate"
import {commonFetch, commonRelease} from "../../../../../Github-Mobile/aaaaa/views/QueueRedux";
import {graph_commit_select} from "../../../../../Github-Mobile/aaaaa/views/RepoRedux";
import addDataFetch from '../../../redux/addDataFetch'
import {connect} from "react-redux";
import Chart from "./Chart/Chart"
import cls from "classnames"

export const API = '/api/repos/getStatsCodeFrequency'

@withRouter
@connect(state=>({
	queue: state.queue,
	repoState: state.repo
}),{ commonFetch, commonRelease, graph_commit_select})
@addDataFetch
export default class extends Component{
	componentDidMount(){
		const { commonFetch } = this.props,
			owner = this.props.match.params.username,
			repo = this.props.match.params.repo

		if(this.getData(API).status === 3){}
		else commonFetch(API, {owner, repo})
	}
	render = () => {
		const { owner, repo, repoState } = this.props
		let frequency = this.getData(API)
		let failed = false
		let dataByWeek = []

		if(frequency.result){

			if(!Array.isArray(frequency.result.data.data)) failed = true
			else{
				let result = frequency.result.data.data.concat()

				result.map((item, index)=>{
					dataByWeek[index] = {
						c: item[1],
						w: item[0],
						a: item[1],
						d: item[2],
					}
				})
			}
		}

		return (
			<div className="commits" style={{marginTop: 20}} >
				<h2>Code Frequency</h2>
				{ failed ? 'retry' :<Chart type="area" data={dataByWeek} height={600} /> }
			</div>
		)
	}
}
