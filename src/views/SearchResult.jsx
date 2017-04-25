import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Input, Layout} from "antd";
import {commonSearch} from "./SearchResultRedux";
import "./SearchResult.scss";
import {changeRouter} from "../views/HomeRedux";

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
				InnerContent = <SearchError search={::this.search}/>
				break
		}

		return (
			<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 100 }}>
				{InnerContent}
			</Content>
		)
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
	return (
		<div className="search-show">
			{
				result.data.data.items.map((item,index)=>(
					<div key={'p'+index}>
						<h5>{item.name}</h5>
						<p>{item.description}</p>
					</div>
				))
			}
		</div>
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