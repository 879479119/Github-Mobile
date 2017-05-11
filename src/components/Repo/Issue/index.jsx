import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Button, Select, Input, Icon, Affix} from "antd";
import "./index.scss";
import addDataFetch from '../../../redux/addDataFetch'
import {commonFetch, commonRelease} from "../../../views/RepoRedux";
import {connect} from "react-redux";
import {fromNow} from "../../../utils/formatDate";
import cls from "classnames";
import brightness from '../../../utils/brightness'

const InputGroup = Input.Group
const Option = Select.Option
const ButtonGroup = Button.Group
const API = [
	'/api/issues/getForRepo',
	'/api/issues/getLabels'
]

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class extends Component{
	componentDidMount(){
		const { commonFetch, owner, repo } = this.props

		for(let i = 0;i < API.length;i ++){
			if(this.getData(API[i]).status === 3){}
			else commonFetch(API[i], {owner, repo})
		}
	}
	render = () => {
		const { owner, repo } = this.props,
			{ details } = this.context
		let issues = this.getData(API[0])
		let labels = this.getData(API[1])
		let base = `/repo/${owner}/${repo}/issue`

		return (
			<div className="main-body">
				<section className="issue-panel">
					<InputGroup compact style={{ position: 'relative', top: -2, display:'inline-block', width: 'auto'}}>
						<Select defaultValue="Filters">
							<Option value="1">Open issues and pull requests</Option>
							<Option value="2">Your issues</Option>
						</Select>
						<Input style={{ width: 300 }} defaultValue="is:issue is:open" />
					</InputGroup>
					<ButtonGroup style={{display: 'inline-block'}}>
						<Button>Labels</Button>
						<Button>Milestones</Button>
					</ButtonGroup>
					<Button type="primary" size="large">New issue</Button>
					<InputGroup compact style={{marginTop:12}} className="bar-filter">
						<Select defaultValue="Author">
							<Option value={'asd'}/>
						</Select>
						<Select defaultValue="Label">
							<Option value={'asd'}/>
						</Select>
						<Select defaultValue="Projects">
							<Option value={'asd'}/>
						</Select>
						<Select defaultValue="Milestones">
							<Option value={'asd'}/>
						</Select>
						<Select defaultValue="Assignee">
							<Option value={'asd'}/>
						</Select>
						<Select defaultValue="Sort">
							<Option value={'asd'}/>
						</Select>
					</InputGroup>
				</section>
				<section className="issue-card-container">
					<ul className="issues">
						{
							//TODO: judge if it's a user or an org
							issues.result ? issues.result.data.data.map((item, index) => (
								<li key={index} className="issue-item">
									<Link to={`${base}/${item.number}`} className="i-s-head">
										{item.state === 'open' ? <Icon type="exclamation-circle-o" style={{color:'#278b52'}} /> : ''}{item.title}
									</Link>
									<div>
										{
											item.labels.map((label, i)=> <Link
												key={i}
												to={`${base}?label=${label.name}`}
												className="label"
												style={{background: '#'+label.color || '#fff', color: label.default ? '#333' : '#fff'}}
											>{label.name}</Link>)
										}
									</div>
									{item.comments > 0 ? <Link to={`${base}/${item.number}`} className="i-s-comments"><Icon type="message" />{item.comments}</Link> : ''}
									<p>#{item.number} opened on {fromNow(item.created_at)} by <Link to={`/user/${item.user.login}/profile`}>{item.user.login}</Link></p>
								</li>
							)) : <p>loading</p>
						}
					</ul>
					<LabelList className="i-s-labels" base={base} list={labels.result ? labels.result.data.data : []} />
				</section>
			</div>
		)
	}
}

function LabelList({list, className, base, ...props}) {
	return (
	<Affix {...props} className={cls(className, "label-list")} offsetTop={30}>
			<h3>Labels in the repo:</h3>
			<ul>
				{
					list.map((item, index) => (
						<li key={index}><Link
							to={`${base}?label=${item.name}`}
							className="item"
							style={{background: '#'+item.color || '#fff', color: brightness(item.color) > 0.5 ? '#222' : '#fff'}}
						><Icon type="tag-o" style={{verticalAlign: 'bottom',color: brightness(item.color) > 0.5 ? '#222' : '#fff'}}/>{item.name}</Link></li>
					))
				}
			</ul>
	</Affix>


	)
}