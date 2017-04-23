import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Layout} from "antd";
import {commonSearch} from "./SearchResultRedux";
const {Content} = Layout

@withRouter
@connect((state=>({
	result: state.search.result,
	status: state.search.status
})), {commonSearch})
export default class SearchResult extends Component{
	componentDidMount(){
		const { location: {search}, history } = this.props
		let value = search.match(/query=([\w%0-9]+)/)[1]

		this.props.commonSearch(value)
	}
	render = () => {
		const { result, status } = this.props
		let content = null
		switch (status){
			case 0:
				content = <p>nothing</p>
				break
			case 1:
				content = <p>loading...</p>
				break
			case 2:
				content = (
					<div>
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
				break
			case 3:
				content = <p>error</p>
				break
		}

		return (
			<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 400 }}>
				{content}
			</Content>
		)
	}
}