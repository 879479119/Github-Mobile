import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import formatDate from "../../../utils/formatDate";
import {commonFetch, commonRelease} from "../../../views/QueueRedux";
import addDataFetch from "../../../redux/addDataFetch";
import {connect} from "react-redux";
import Chart from "./Chart/Chart";
import cls from "classnames";

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

		let sumArr = [], start= '', end= '', series = [], max = 1, failed = false
		//FIXME: unknown error: contribution changes
		if(contributor.result){
			try{
				series = contributor.result.data.data.concat().reverse()
				series.forEach((item, index)=>{
					if(index === 0){
						start = formatDate(item.weeks[0].w * 1000, 4)
						end = formatDate(item.weeks[item.weeks.length - 1].w * 1000, 4)

						sumArr = item.weeks.concat([])
						//init the array and return to avoid loop

						return
					}
					item.weeks.forEach((t, i)=>{
						sumArr[i].a += t.a
						sumArr[i].d += t.d
						sumArr[i].c += t.c
						if(t.c > max) max = t.c
					})
				})
			}catch(e) {
				if(contributor.result.data.meta.status === "202 Accepted"){
					failed = true
				}
			}
		}

		return (
			<div className="contributors" style={{marginTop: 20}}>
				<h5 className={cls({"void": !start})}>{start + ' - ' + end}</h5>
				<h6>Contributions to master, excluding merge commits</h6>
				{ failed ? 'retry' : <Chart data={sumArr} type="smooth-path" className="main-chart" /> }
				<div className="contribute-user">
					<ul>
						{
							series.map((t,i)=>{
								let a  = t.author, add = 0, del = 0
								t.weeks.forEach((item => {
									add += item.a
									del += item.d
								}))
								return (
									<li key={'li'+i}>
										<img src={a.avatar_url} alt="face"/>
										<section>
											<Link to={'/profile/'+a.login} >{a.login}</Link>
											<p className="details">
												<span>Commits: {t.total}</span>
												<span>/{add} ++/</span>
												<span>{del} --</span></p>
										</section>
										<Chart max={max} data={t.weeks} type="smooth-path" level="simple" width={480} height={80} fill="#fb8532" className="c-small" />
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		)
	}
}