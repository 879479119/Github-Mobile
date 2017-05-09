import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, Select, Spin} from "antd";
import "./index.scss";
import {commonFetch, commonRelease} from "../../../views/RepoRedux";
import {connect} from "react-redux";
import CodeTree from "./CodeTree";
import User from "./User";
import LanguageBar from "./LanguageBar";
import CommitBar from "./CommitBar";
import formatDate from "../../../utils/formatDate";

const Option = Select.Option
const ButtonGroup = Button.Group
const API = [
	'/api/repos/getContent',
	'/api/repos/getLanguages',
	'/api/modified/repos/readme',
	'/api/repos/getStatsParticipation'
]

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
export default class extends Component{
	componentDidMount(){
		const { commonFetch, owner, repo } = this.props

		commonFetch(API[0], {owner, repo, path:''})
		commonFetch(API[1], {owner, repo})
		commonFetch(API[2], {owner, repo})
		commonFetch(API[3], {owner, repo})
	}
	getData(url){
		const { queue } = this.props
		let data = {}
		queue.data.map(item=>{
			if(item.url === url){
				data = item
				//TODO: this is a hack, maybe there is a better way to do this
				// if(item.status === 3) setTimeout(()=>{commonRelease(url)},0)
			}
		})
		return data
	}
	render = () => {
		const { location, owner, repo, details } = this.props
		let content = this.getData(API[0])
		let languages = this.getData(API[1])
		let readme = this.getData(API[2])
		let commits = this.getData(API[3])

		return (
			<div className="main-body">
				<p className="description">{details.result ? details.result.data.data.description : <span style={{width: 500,background:"#ecf6fd",display:"inline-block",height:20,opacity:0.5}} />}</p>
				<LanguageBar lang={languages.result ? languages.result.data.data : {}} />
				{(()=> {
					let fragment
					if (content.status === 3) {
						fragment = <CodeTree list={content.result.data.data} style={{display: 'inline-block'}}/>
					} else if (content.status === 2) {
						fragment = <p>error</p>
					} else {
						fragment = <section className="loading" style={{minHeight: 250, textAlign: 'center', display: 'inline-block'}}><Spin style={{marginTop: 100}}/></section>
					}
					return fragment
				})()}
				<div className="right-part">
					<div className="repo-header">
						<section className="operation">
							<Select defaultValue="master" style={{ width: 120 }}>
								<Option value="master">Master</Option>
								<Option value="lucy">Others</Option>
							</Select>
							<ButtonGroup style={{float:'right'}}>
								<Button>Create new file</Button>
								<Button>Upload files</Button>
								<Button>Find file</Button>
							</ButtonGroup>
						</section>
						<section>
							<Button>New pull request</Button>
							<Button type='primary'  style={{float:'right'}}>Clone or download</Button>
						</section>
						<section className="timeline">
							<span>Created: <em>{details.result ? formatDate(details.result.data.data.created_at, true) : '_'}</em></span>
							<span>Pushed: <em>{details.result ? formatDate(details.result.data.data.pushed_at, true) : '_'}</em></span>
							<span>Updated: <em>{details.result ? formatDate(details.result.data.data.updated_at, true) : '_'}</em></span>
						</section>
						<User style={{position: 'absolute',top: 0,right: 0}} owner={details.result ? details.result.data.data.owner : {}} />
					</div>
					<CommitBar data={commits.result ? commits.result.data.data : {all:[0]}} />
				</div>
				<article dangerouslySetInnerHTML={{__html:readme.result ? readme.result.data.readme : 0}} className="readme"/>
			</div>
		)
	}
}