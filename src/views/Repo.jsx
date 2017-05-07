import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Icon, Layout, Menu, Button, Select} from "antd";
import "./Repo.scss";
import { commonFetch, commonRelease} from "./RepoRedux";
import {connect} from "react-redux";
import CodeTree from "../components/Repo/CodeTree"
import User from "../components/Repo/User"
import LanguageBar from "../components/Repo/LanguageBar"
import formatDate from "../utils/formatDate"

const {Content} = Layout
const Option = Select.Option
const ButtonGroup = Button.Group
const API = [
	'/api/repos/get',
	'/api/repos/getContent',
	'/api/repos/getLanguages'
]

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
export default class extends Component{
	componentDidMount(){
		const { location, commonFetch } = this.props
		let [,,owner,repo] = location.pathname.split('/')

		commonFetch(API[0], {owner, repo})
		commonFetch(API[1], {owner, repo, path:''})
		commonFetch(API[2], {owner, repo})
	}
	getData(url){
		const { queue, commonRelease } = this.props
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
		const { location } = this.props
		let [,,owner,repo] = location.pathname.split('/')
		let details = this.getData(API[0])
		let content = this.getData(API[1]), fragment
		let languages = this.getData(API[2])

		//the files' detail
		if(content.status === 3){
			fragment = <CodeTree list={content.result.data.data} style={{display:'inline-block'}}/>
		}else{
			fragment = <p>loading</p>
		}

		let description = '',
			user = ''
		//the repo's profile
		if(details.status === 3){
			description = details.result.data.data.description
			user = <User style={{position: 'absolute',top: 0,right: 0}} owner={details.result.data.data.owner} />
		}else{
			description = ''
		}

		return (
			<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
				<h2><Link to={'/Profile/'+owner}>{owner}</Link>/<Link to={'/repo/'+owner+'/'+repo}>{repo}</Link></h2>
				<section className="title-panel">
					<ButtonGroup>
						<Button size={'small'}><Icon type="eye-o" />Watch</Button>
						<Button size={'small'} type={'dashed'}>{details.result ? details.result.data.data.subscribers_count : 0}</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button size={'small'}><Icon type="star-o" />Star</Button>
						<Button size={'small'} type={'dashed'}>{details.result ? details.result.data.data.stargazers_count : 0}</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button size={'small'}><Icon type="usb" />Fork</Button>
						<Button size={'small'} type={'dashed'}>{details.result ? details.result.data.data.forks : 0}</Button>
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
					<p className="description">{description}</p>
					<LanguageBar lang={languages.result ? languages.result.data.data : {}} />
					{fragment}
					<div className="right-part">
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
						{user}
					</div>
				</div>
			</Content>
		)
	}
}