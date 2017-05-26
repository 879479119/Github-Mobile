import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTrending} from "../../views/TrendingRedux"
import {Link} from "react-router-dom";
import {Button, Icon, Tooltip} from "antd";
import "./List.scss"

@connect((state=>({
	route: state.common.route,
	trending: state.trending
})), {fetchTrending})
export default class DeveloperList extends Component {
	componentDidMount(){
		const {language, span, fetchTrending} = this.props
		fetchTrending('dev', language, span)
	}

	render(){
		const {language, span, trending} = this.props
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
			content = <List data={trending.result} />
		}

		return content
	}
}

function List({data}) {
	return (
		<section className="developer-list">
			<ul>
				{
					data.map((item, index)=>{

						return (
							<li key={index}>
								<img src={item.avatar} alt=""/>
								<h4>
									<Link to={`/profile/${item.name}`} style={{fontSize: 16}}>{item.name}</Link>
									{item.full_name ? `(${item.full_name})` : ''}
									<br/>
									<Link to={`/repo/${item.name}/${item.repo}`}>{item.repo}</Link>
								</h4>
								<p>{item.description}</p>
								{item.type === 'User' ? <Button className="star" key={item.name} size="small" ><Icon type="user" />Follow</Button> : ''}
							</li>
						)
					})
				}
			</ul>
		</section>
	)
}