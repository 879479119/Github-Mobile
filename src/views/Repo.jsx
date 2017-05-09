import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Icon, Layout, Menu, Button} from "antd";
import "./Repo.scss";
import { changeRouter } from "../views/HomeRedux";
import { commonFetch, commonRelease} from "./RepoRedux";
import {connect} from "react-redux";
import Code, {API as API_CODE} from "../components/Repo/Code"
import Issue from "../components/Repo/Issue"

const {Content} = Layout
const ButtonGroup = Button.Group
const API = [
	'/api/repos/get'
]

@withRouter
@connect(state=>({
	queue: state.queue,
	route: state.common.route
}),{ commonFetch, commonRelease, changeRouter})
export default class extends Component{
	constructor(...props){
		super(...props)
	}
	sendRequest(url, data){
		commonFetch(url, data)
	}
	menuHandler(e){
		const {changeRouter} = this.props,
			{owner, repo} = this.data
		const map = ['code','issue','pr','project','pulse','graph']
		changeRouter(`/repo/${owner}/${repo}/${e.key}`)
	}
	componentWillMount(){
		const {location} = this.props
		let [,,owner,repo] = location.pathname.split('/')
		//store it, maybe in other ways
		this.data = {
			owner, repo
		}
	}
	componentDidMount(){
		const { commonFetch } = this.props,
			{ owner, repo } = this.data
		commonFetch(API[0], {owner, repo})
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
		const { location, children } = this.props,
			{ owner, repo } = this.data
		let details = this.getData(API[0])
		let ShowComponent = Code

		let [,,,,tab='code'] = location.pathname.split('/')

		switch (tab){
			case 'code': ShowComponent = Code; break
			case 'issue': ShowComponent = Issue; break
		}

		return (
			<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
				<h2><Link to={'/Profile/'+owner}>{owner}</Link>/<Link to={'/repo/'+owner+'/'+repo}>{repo}</Link></h2>
				<section className="title-panel">
					<ButtonGroup>
						<Button size={'small'}><Icon type="eye-o" />Watch</Button>
						<Button size={'small'} type={'dashed'} style={{height:22, verticalAlign: 'top'}}>{details.result ? details.result.data.data.subscribers_count : <Icon type="loading"/>}</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button size={'small'}><Icon type="star-o" />Star</Button>
						<Button size={'small'} type={'dashed'} style={{height:22, verticalAlign: 'top'}}>{details.result ? details.result.data.data.stargazers_count : <Icon type="loading"/>}</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button size={'small'}><Icon type="usb" />Fork</Button>
						<Button size={'small'} type={'dashed'} style={{height:22, verticalAlign: 'top'}}>{details.result ? details.result.data.data.forks : <Icon type="loading"/>}</Button>
					</ButtonGroup>
				</section>
				<Menu
					selectedKeys={[tab]}
					mode="horizontal"
				    onClick={::this.menuHandler}
				>
					<Menu.Item key="code"><Icon type="code-o" />Code</Menu.Item>
					<Menu.Item key="issue"><Icon type="database" />Issues</Menu.Item>
					<Menu.Item key="pr"><Icon type="usb" />Pull requests</Menu.Item>
					<Menu.Item key="project"><Icon type="schedule" />Projects</Menu.Item>
					<Menu.Item key="pulse"><Icon type="rocket" />Pulse</Menu.Item>
					<Menu.Item key="graph"><Icon type="line-chart" />Graphs</Menu.Item>
				</Menu>
				<ShowComponent owner={owner} repo={repo} details={details} sendRequest={::this.sendRequest}/>
			</Content>
		)
	}
}