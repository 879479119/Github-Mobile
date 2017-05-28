import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Icon, Layout, Menu, Affix, Button} from "antd";
import "./Trending.scss";
import {changeRouter} from "../layouts/HomeRedux";
import {changeLang, changeSpan, changeType, fetchTrending} from "../views/TrendingRedux"
import Filter from "../components/Common/Filter";

const {Content} = Layout
const SubMenu = Menu.SubMenu

@withRouter
@connect((state=>({
	route: state.common.route,
	trending: state.trending
})), {changeRouter, changeSpan, changeLang, changeType, fetchTrending})
export default class Trending extends Component{
	changeSpanOrType(e){
		//I don't like the design of selection, so it's replaced with menu
		if(['daily','weekly','monthly'].indexOf(e.key) > -1){
			this.props.changeSpan(e.key)
		}else if(['dev','repo'].indexOf(e.key) > -1){
			this.props.changeType(e.key)
		}
	}

	changeLang(e){
		//I don't like the design of selection, so it's replaced with menu
		if(e.target.getAttribute('data-lang') === void 0) return
		this.props.changeLang(e.target.getAttribute('data-lang'))
	}

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

		//TODO: get the shown ones from server as the user like
		let shownLanguages = ['C','HTML','Java','Javascript','Python','Ruby','TypeScript']

		let LinkWrap = function ({lang, span, text}) {
			return <Link to={`/trending${developer ? '/developers' : ''}/${lang}?span=${span}`} data-lang={lang}>{text}</Link>
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
						    onClick={::this.changeSpanOrType}
						>
							<Menu.Item key="repo">
								<Link to={'/trending'} style={{color: developer ? '' : '#108ee9'}}><Icon type="book" />Repository</Link>
							</Menu.Item>
							<Menu.Item key="dev">
								<Link to={'/trending/developers'} style={{color: developer ? '#108ee9' : ''}}><Icon type="user" />Developer</Link>
							</Menu.Item>
							<SubMenu title={<span><Icon type="filter" />Time</span>}>
								<Menu.Item key="daily"><Link to={`/trending${developer ? '/developers' : ''}/${language}?span=daily`}>by Daily</Link></Menu.Item>
								<Menu.Item key="weekly"><Link to={`/trending${developer ? '/developers' : ''}/${language}?span=weekly`}>by Weekly</Link></Menu.Item>
								<Menu.Item key="monthly"><Link to={`/trending${developer ? '/developers' : ''}/${language}?span=monthly`}>by Monthly</Link></Menu.Item>
							</SubMenu>
						</Menu>
						{children}
					</section>
					{/*<Affix offsetTop={20}>*/}
						<section className="t-right-part">
							<ul onClick={::this.changeLang}>
								<li key=''><LinkWrap span={span} lang="" text="All languages" /></li>
								<li key='unknown'><LinkWrap span={span} lang="unknown" text="Unknown languages" /></li>
								{
									shownLanguages.map((item, index)=>(
										<li key={item.toLowerCase()}><LinkWrap span={span} lang={item.toLowerCase().replace(' ','+')} text={item} /></li>
									))
								}
							</ul>
						</section>
					{/*</Affix>*/}
				</div>
			</Content>
		)
	}
}
