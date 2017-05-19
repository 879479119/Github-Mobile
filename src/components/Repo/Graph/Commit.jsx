import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Select, Spin} from "antd";
import formatDate from "../../../utils/formatDate"
import {commonFetch, commonRelease} from "../../../views/RepoRedux";
import addDataFetch from '../../../redux/addDataFetch'
import {connect} from "react-redux";
import Chart from "./Chart/Chart"
import cls from "classnames"

export const API = '/api/repos/getStatsCommitActivity'

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
		let failed = false
		let dataByWeek = [], dataByDay = []
		if(commit.result){

			if(!Array.isArray(commit.result.data.data)) failed = true
			else{
				let result = commit.result.data.data.concat()

				result.map((item, index)=>{
					dataByWeek[index] = {
						c: item.total,
						w: item.week
					}
				})

				dataByDay = result[8].days
			}
		}

		return (
			<div className="commits" style={{marginTop: 20}}>
				<h2>Commits of the year</h2>
				{ failed ? 'retry' :<Chart type="bar" data={dataByWeek} height={200} /> }
				<h2 style={{marginTop: 20}} >Commits of the selected week</h2>
				{ failed ? 'retry' :<Chart type="linear" data={dataByDay} height={200} /> }
			</div>
		)
	}
}