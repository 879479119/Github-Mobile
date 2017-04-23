import React, {Component} from "react"
import "./Profile.scss"

import RecentEvent from "./RecentEvent"
import CommitTable from "./CommitTable"
import Percentage from "./Percentage"

import { Layout, Menu, Icon, Card } from 'antd'
const { Content } = Layout

export default class Profile extends Component{
	render = () => {
		return (
			<Content style={{ background: '#fff', padding: 24, paddingTop: 0, margin: 0, minHeight: 400 }}>
				<Menu
					selectedKeys={['overview']}
					mode="horizontal"
				>
					<Menu.Item key="overview">
						<Icon type="idcard" />Overview
					</Menu.Item>
					<Menu.Item key="repo">
						<Icon type="database" />Repositories
					</Menu.Item>
					<Menu.Item key="star">
						<Icon type="star-o" />Stars
					</Menu.Item>
					<Menu.Item key="follower">Followers</Menu.Item>
					<Menu.Item key="following">Following</Menu.Item>
				</Menu>
				<div className="main-body">
					<div className="repos">
						<Card style={{width: 360,height: 110}}>
							<h5>lll <a href="#">react-native</a></h5>
							<p>A SVG shadow component powered with react-native-svg,which can provide shadow on svg,which can provide shadow on svg,which can provide shadow on svg,which can provide shadow on svg,which can provide shadow on svg,which can provide shadow on Android like iOS ^_^</p>
							<p>Javascript <Icon type="star" /> 46 <Icon type="usb" /> 4 </p>
						</Card>
						<Card style={{width: 360}}>
							<h5>lll <a href="#">react-native</a></h5>
							<p>A SVG shadow component powered with react-naticomponent powered with react-naticomponent powered with react-native-svg,which can provide shadow on Android like iOS ^_^</p>
							<p>Javascript <Icon type="star" /> 46 <Icon type="usb" /> 4 </p>
						</Card>
						<Card style={{width: 360}}>
							<h5>lll <a href="#">react-native</a></h5>
							<p>A SVG shadow component powered with react-native-svg,which can provide shadow on Android like iOS ^_^</p>
							<p>Javascript <Icon type="star" /> 46 <Icon type="usb" /> 4 </p>
						</Card>
						<Card style={{width: 360}}>
							<h5>lll <a href="#">react-native</a></h5>
							<p>A SVG shadow component powered with react-native-svg,which can provide shadow on Android like iOS ^_^</p>
							<p>Javascript <Icon type="star" /> 46 <Icon type="usb" /> 4 </p>
						</Card>
						<Card style={{width: 360}}>
							<h5>lll <a href="#">react-native</a></h5>
							<p>A SVG shadow component powered with react-native-svg,which can provide shadow on Android like iOS ^_^</p>
							<p>Javascript <Icon type="star" /> 46 <Icon type="usb" /> 4 </p>
						</Card>
						<Card style={{width: 360}}>
							<h5>lll <a href="#">react-native</a></h5>
							<p>A SVG shadow component powered with react-native-svg,which can provide shadow on Android like iOS ^_^</p>
							<p>Javascript <Icon type="star" /> 46 <Icon type="usb" /> 4 </p>
						</Card>
					</div>
					<div className="aside">
						<Percentage percentage={[25,20,20,15,10,10]}>
							<p className="chart-lang">Language Chart</p>
						</Percentage>
						<RecentEvent/>
					</div>
				</div>
				<CommitTable/>
			</Content>
		)
	}
}