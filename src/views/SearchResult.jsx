import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Input, Layout, Menu} from "antd";
import {commonSearch} from "./SearchResultRedux";
import "./SearchResult.scss";
import {changeRouter} from "../views/HomeRedux";
import repo from "../utils/repos";
import Repo from "../components/Search/Repo";

const {Content} = Layout
const {Search} = Input

@withRouter
@connect((state=>({
	route: state.common.route,
	result: state.search.result,
	status: state.search.status
})), {commonSearch,changeRouter})
export default class SearchResult extends Component{
	componentDidMount(){
		const { location: {search}, history } = this.props
		let value = search.match(/query=([\w%0-9]+)/)[1]

		this.props.commonSearch(value)
	}
	search(val){
		this.props.changeRouter(`/search?query=${encodeURI(val)}`)
	}
	render = () => {
		const { result, status } = this.props
		let InnerContent = null
		switch (status){
			case 0:
				InnerContent = <SearchEmpty/>
				break
			case 1:
				InnerContent = <SearchLoad/>
				break
			case 2:
				InnerContent = <SearchShow result={result}/>
				break
			case 3:
				InnerContent = <SearchShow search={::this.search} result={repo}/>
				break
		}

		return InnerContent
	}
}

function SearchEmpty(props) {
	return (
		<div className="search-empty">
			<img src="/assets/search.svg" alt=""/>
			<h1>Find what you want <span className="emoji">😃</span></h1>
			<Search style={{width: 500}} onSearch={props.search} />
			<p>advanced search in building</p>
		</div>
	)
}

function SearchLoad(props) {
	return (
		<div className="search-loading">
			<p>loading</p>
		</div>
	)
}

function SearchShow(props) {
	const {result} = props
	if(result.items === 0){
		return <p>Empty Content</p>
	}
	return (
		<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
			<h2>Result for {"CDN"}</h2>
			<Menu
				selectedKeys={['1']}
				mode="horizontal"
			    className="search-show"
			>
				<Menu.Item key="1">Repositories</Menu.Item>
				<Menu.Item key="2">
					<a href="#" className="head-example" >Code <span className="count">12</span></a>
				</Menu.Item>
				<Menu.Item key="3">Commits</Menu.Item>
				<Menu.Item key="4">Issues</Menu.Item>
				<Menu.Item key="5">Wikis</Menu.Item>
				<Menu.Item key="6">Users</Menu.Item>
			</Menu>
			<div className="main-body">
				<Repo result={result}/>
			</div>
		</Content>
	)
}


function SearchError(props) {
	return (
		<div className="search-error">
			<img src="/assets/search.svg" alt=""/>
			<h1>Something Error When Search <span className="emoji">😕</span></h1>
			<Search style={{width: 500}} onSearch={props.search} />
			<p>Please check your network x_x</p>
		</div>
	)
}