import React, {Component} from "react";
import "./Home.scss";
import {connect} from "react-redux";
import {changeA} from "../views/HomeRedux";
import { withRouter } from 'react-router-dom'
import {Breadcrumb, Icon, Input, Layout, Menu} from "antd";
const { SubMenu } = Menu
const { Search } = Input
const { Header, Sider } = Layout;

@withRouter
@connect(state=>({a: state.common.a}), { changeA, load:() => dispatch => {return dispatch({type: 'LOAD_DASHBOARD'})}})
export default class Home extends Component{
	componentWillMount(){
		let code = null
		try{
			code = location.search.match(/code=(\w*)/)[1]
		}catch(e) {
			code = null
		}

		if(code){
			fetch("/user/register",{
				method: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				credentials: 'include',
				body: "code=" + code
			}).then(res => res.text()).then(res=>{
				console.log(res)
			})
		}
	}
	componentDidMount(){
		this.props.load()
	}
	searchContent(val){
		this.props.history.push(`/search?query=${encodeURI(val)}`)
	}

	render = () => {
		const {commits} = this.props
		return (
			<Layout>
				<Header className="header">
					<div className="logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['2']}
						className="left-menu"
						style={{ lineHeight: '64px' }}
					>
						<Menu.Item key="0"><Search placeholder="Search" style={{width: 200,marginTop:20}} onSearch={::this.searchContent} /></Menu.Item>
						<Menu.Item key="1">Pull requests</Menu.Item>
						<Menu.Item key="2">Issues</Menu.Item>
						<Menu.Item key="3">Gist</Menu.Item>
					</Menu>
					<Menu
						theme="dark"
						mode="horizontal"
						style={{ lineHeight: '64px' }}
						className="right-menu"
					>
						<Menu.Item key="1">Pull requests</Menu.Item>
						<Menu.Item key="2">Issues</Menu.Item>
					</Menu>
				</Header>
				<Layout>
					<Sider width={200} style={{ background: '#fff' }}>
						<div className="user-face-main">
							<img src="/assets/face.jpg" alt="face" className="uf-pic"/>
							<h4>RockSAMA</h4>
							<h5>879479119</h5>
							<p>Tech Otaku Save World</p>
						</div>
						<Menu
							mode="inline"
							defaultSelectedKeys={['1']}
							defaultOpenKeys={['sub1']}
							style={{ height: '100%' }}
						>
							<SubMenu key="sub1" title={<span><Icon type="user" />User Center</span>}>
								<Menu.Item key="1">Repos</Menu.Item>
								<Menu.Item key="2">Issues</Menu.Item>
								<Menu.Item key="3">Pull Requests</Menu.Item>
								<Menu.Item key="4">Gist</Menu.Item>
							</SubMenu>
							<SubMenu key="sub2" title={<span><Icon type="laptop" />Explore</span>}>
								<Menu.Item key="5">Activity</Menu.Item>
								<Menu.Item key="6">Hot</Menu.Item>
								<Menu.Item key="7">Follow</Menu.Item>
								<Menu.Item key="8">History</Menu.Item>
							</SubMenu>
							<SubMenu key="sub3" title={<span><Icon type="notification" />Trending</span>}>
								<Menu.Item key="9">This Week</Menu.Item>
							</SubMenu>
						</Menu>
					</Sider>
					<Layout style={{ padding: '0 24px 24px' }}>
						<Breadcrumb style={{ margin: '12px 0' }}>
							<Breadcrumb.Item>Github</Breadcrumb.Item>
							<Breadcrumb.Item>User Center</Breadcrumb.Item>
							<Breadcrumb.Item>Profile</Breadcrumb.Item>
						</Breadcrumb>
						{this.props.children}
					</Layout>
				</Layout>
			</Layout>
		)
	}
}