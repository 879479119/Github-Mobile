import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Icon, Layout, Menu, Button} from "antd";
import "./Repo.scss";
import {fetchRepoContent, commonFetch, commonRelease} from "./RepoRedux";
import {connect} from "react-redux";

const {Content} = Layout
const ButtonGroup = Button.Group
const API = ['/api/repos/get']

@withRouter
@connect(state=>({
	queue: state.queue
}),{fetchRepoContent, commonFetch})
export default class extends Component{
	componentDidMount(){
		const { location, fetchRepoContent, commonFetch } = this.props
		let [,,owner,repo] = location.pathname.split('/')

		fetchRepoContent(owner, repo)
		commonFetch(API[0], {owner, repo})
	}
	render = () => {
		const { location, queue, commonRelease } = this.props
		let [,,owner,repo] = location.pathname.split('/')

		queue.data.map(item=>{
			if(item.url === API[0] && item.status === 3){
				console.log(item)
				commonRelease(API[0])
			}
		})
		return (
			<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
				<h2><Link to={'/Profile/'+owner}>{owner}</Link>/<Link to={'/repo/'+owner+'/'+repo}>{repo}</Link></h2>
				<section className="title-panel">
					<ButtonGroup>
						<Button size={'small'}><Icon type="eye-o" />Watch</Button>
						<Button size={'small'} type={'dashed'}>123</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button size={'small'}><Icon type="star-o" />Star</Button>
						<Button size={'small'} type={'dashed'}>123</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button size={'small'}><Icon type="usb" />Fork</Button>
						<Button size={'small'} type={'dashed'}>123</Button>
					</ButtonGroup>
				</section>
				<Menu
					selectedKeys={['1']}
					mode="horizontal"
				>
					<Menu.Item key="1">
						<Icon type="code-o" />Code
					</Menu.Item>
					<Menu.Item key="2">
						<Icon type="database" />Issues
					</Menu.Item>
					<Menu.Item key="3">
						<Icon type="usb" />Pull requests
					</Menu.Item>
					<Menu.Item key="4">
						<Icon type="schedule" />Projects
					</Menu.Item>
					<Menu.Item key="5">
						<Icon type="rocket" />Pulse
					</Menu.Item>
					<Menu.Item key="6">
						<Icon type="line-chart" />Graphs
					</Menu.Item>
				</Menu>
				<div className="main-body">

				</div>
			</Content>
		)
	}
}