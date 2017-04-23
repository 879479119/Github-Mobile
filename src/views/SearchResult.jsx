import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Layout} from "antd";
const { Content } = Layout
import {commonQuery} from './SearchResultRedux'

@withRouter
@connect((state=>({search: state.search})), {commonQuery})
export default class SearchResult extends Component{
	componentDidMount(){
		const { location: {search}, history } = this.props
		let value = search.match(/query=([\w%0-9]+)/)[1]
		
		this.props.commonQuery(value)
	}
	render = () => {
		const { location, history } = this.props

		return (
			<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
				<p>loading...</p>
			</Content>
		)
	}
}