import React, {Component, PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchTrending} from "../../views/TrendingRedux"
import {Link} from "react-router-dom";
import {Button, Icon, Tooltip} from "antd";
import Following from "../Common/Following"
import "./List.scss"

@connect((state=>({
	route: state.common.route,
	trending: state.trending,
	followingList: state.common.following
})), {fetchTrending})
export default class DeveloperList extends Component {
	componentDidMount(){
		const {language, span, fetchTrending} = this.props
		fetchTrending('dev', language, span)
	}

	render(){
		const {language, span, trending, followingList} = this.props
		let content = <p>123</p>

		if(trending.status === 0){
			content = (
				<section>

				</section>
			)
		}else if(trending.status === 1){
			content =
				<section>
					<Icon type="loading" />
				</section>
		}else if(trending.status === 2){
			content = <List data={trending.result} list={followingList} />
		}

		return content
	}
}

export class List extends PureComponent {

	render(){
		const {data, simple= false, list} = this.props
		return renderList({data, simple, list})
	}
}

function renderList({data, simple, list}) {
	return (
		<section className="developer-list">
			<ul>
				{
					data.map((item, index)=>{
						return (
							<Following key={index} item={item} simple={simple} list={list}/>
						)
					})
				}
			</ul>
		</section>
	)
}