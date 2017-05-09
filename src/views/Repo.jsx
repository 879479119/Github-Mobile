import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Icon, Layout, Menu, Button} from "antd";
import "./Repo.scss";
import { commonFetch, commonRelease} from "./RepoRedux";
import {connect} from "react-redux";
import Code from "../components/Repo/Code"
const {Content} = Layout
const ButtonGroup = Button.Group
const API = [
	'/api/repos/get'
]

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
export default class extends Component{
	menuHandler(e){
		const {location} = this.props,
			{owner, repo} = this.data
		const map = ['code','issue','pr','project','pulse','graph']
		location.push(`/repo/${owner}/${repo}/${map[+e.key-1]}`)
	}
	componentWillMount(){
		const {location} = this.props
		let [,,owner,repo,tab] = location.pathname.split('/')
		//store it, maybe in other ways
		this.data = {
			owner, repo, tab
		}
		console.log(owner)
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
		const { location } = this.props,
			{ owner, repo } = this.data
		let details = this.getData(API[0])

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
					selectedKeys={['1']}
					mode="horizontal"
				    onClick={::this.menuHandler}
				>
					<Menu.Item key="1"><Icon type="code-o" />Code</Menu.Item>
					<Menu.Item key="2"><Icon type="database" />Issues</Menu.Item>
					<Menu.Item key="3"><Icon type="usb" />Pull requests</Menu.Item>
					<Menu.Item key="4"><Icon type="schedule" />Projects</Menu.Item>
					<Menu.Item key="5"><Icon type="rocket" />Pulse</Menu.Item>
					<Menu.Item key="6"><Icon type="line-chart" />Graphs</Menu.Item>
				</Menu>
				<Code owner={owner} repo={repo} details={details} />
			</Content>
		)
	}
}