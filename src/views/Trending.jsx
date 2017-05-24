import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Icon, Layout, Menu} from "antd";
import "./Trending.scss";
import {changeRouter} from "../views/HomeRedux";
import Filter from "../components/Common/Filter";

const {Content} = Layout
const SubMenu = Menu.SubMenu

@withRouter
@connect((state=>({
	route: state.common.route,
})), {changeRouter})
export default class  SearchResult extends Component{
	render = () => {
		const { location, children } = this.props
		let route = location.pathname.split('/'),
			language = route[2] || '',
			p = location.search.match(/span=(\w*)/),
			span = p ? p[1] : 'daily',
			developer = false

		if(route[2] === 'developers'){
			language = route[3] || ''
			developer = true
		}

		return (
			<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
				<h1>Trending in open source</h1>
				<h3>See what the GitHub community is most excited about today.</h3>
				<div className="trending">
					<section className="t-left-part">
						<Menu
							selectedKeys={[developer ? 'dev' : 'repo']}
							mode="horizontal"
						>
							<Menu.Item key="repo">
								<Icon type="book" />Repository
							</Menu.Item>
							<Menu.Item key="dev">
								<Icon type="user" />Developer
							</Menu.Item>
							<SubMenu title={<span><Icon type="filter" />Time</span>}>
								<Menu.Item key="daily">by Daily</Menu.Item>
								<Menu.Item key="weekly">by Weekly</Menu.Item>
								<Menu.Item key="monthly">by Monthly</Menu.Item>
							</SubMenu>
						</Menu>
						{children}
					</section>
					<section className="t-right-part">
						<Filter type="filter" data={['123','234','345']} />
					</section>
				</div>
			</Content>
		)
	}
}
