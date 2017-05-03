import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Input, Layout, Menu, Pagination} from "antd";
import {commonSearch} from "./SearchResultRedux";
import "./SearchResult.scss";
import {changeRouter} from "../views/HomeRedux";
import repo from "../utils/repos";
import Repo from "../components/Search/Repo";
import Filter from '../components/Common/Filter'

function onChange(pageNumber) {
	console.log('Page: ', pageNumber);
}

const {Content} = Layout
const {Search} = Input

@withRouter
@connect((state=>({
	route: state.common.route,
	result: state.search.result,
	status: state.search.status,
	type: state.search.type
})), {commonSearch,changeRouter})
export default class SearchResult extends Component{
	componentDidMount(){
		const { location: {search}, history } = this.props
		let value = search.match(/query=([\w%0-9]+)/)[1]

		this.props.commonSearch({q:value,type:'Repositories'})
	}
	search(val){
		this.props.changeRouter(`/search?query=${encodeURI(val)}`)
	}
	render = () => {
		const { result, status, type } = this.props

		let InnerContent = null
		switch (status){
			case 0:
				InnerContent = <SearchEmpty/>
				break
			case 1:
				InnerContent = <SearchLoad/>
				break
			case 2:
				InnerContent = <SearchShow result={result} type={type}/>
				break
			case 3:
				InnerContent = <SearchShow search={::this.search} result={repo} type={type}/>
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
	const {result, type} = props
	if(result.items === 0){
		return <p>Empty Content</p>
	}

	let nav = ["Repositories","Code","Commits","Issues","Wikis","Users"],
		top = nav.map(item=>({
			title: item,
			count: type === item ? result.total_count : -1
		}))

	return (
		<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
			<h2>Result for {"CDN"}</h2>
			<Menu
				selectedKeys={['1']}
				mode="horizontal"
			    className="search-show"
			>
				{
					top.map((item, index)=>(
						<Menu.Item key={'item'+index}>{item.title}
							{item.count >= 0 ? <span className="count">{item.count}</span> : ''}
						</Menu.Item>
					))
				}
			</Menu>
			<div className="main-body">
				<Repo result={result}/>
				<div style={{textAlign:"center"}}><Pagination showQuickJumper defaultCurrent={1} defaultPageSize={30} total={result.total_count} onChange={onChange} style={{display: 'inline-block',marginTop: 30}}/></div>
				<Filter data={['Best Match', 'Stars', 'Forks', 'Updated']} defaultSelected="Best Match" sort={true} style={{position:'absolute',top: 0,right: 30,boxShadow: 'rgba(0,0,0,0.05) 1px 1px 2px'}}/>
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