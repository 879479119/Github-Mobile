import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTrending} from "../../views/TrendingRedux"
import {Link} from "react-router-dom";
import {Button, Icon, Tooltip} from "antd";
import language from "../../utils/languages"
import "./List.scss"

@connect((state=>({
	route: state.common.route,
	trending: state.trending
})), {fetchTrending})
export default class TrendingList extends Component {
	componentDidMount(){
		const {language, span, fetchTrending} = this.props
		fetchTrending('repo', language, span)
	}
	// componentWillReceiveProps(next){
	// 	// console.info(next)
	// 	const {language, span, fetchTrending} = next
	// 	if(span !== this.props.trending.span || language !== this.props.trending.language){
	// 		fetchTrending('repo', language, span)
	// 		console.info(this.props.trending.span, span)
	// 	}
	// }
	render(){
		const {language, span, trending} = this.props
		let content = ''

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
		<section className="trending-list">
			<ul>
				{
					data.map((item, index)=>{
						let [,owner,repo] = item.repo.split('/'), stars
						if('daily' in item){
							stars = item.daily + ' stars today'
						}else if('weekly' in item){
							stars = item.weekly + ' stars this week'
						}else if('monthly' in item){
							stars = item.monthly + ' stars this month'
						}
						return (
							<li key={index}>
								<h4>
									<Link to={`/profile/${owner}`}>{owner}</Link> /&nbsp;
									<Link to={`/repo${item.repo}`}>{repo}</Link>
									<Button size="small" style={{float: 'right', marginTop: 8}}><Icon type="star-o" />Star</Button>
								</h4>
								<p className="desc">{item.description}</p>
								<p className="detail">
									<span><span className="dot" style={{background: language[item.language] ? language[item.language].color : '#eee'}}/>{item.language}</span>
									<span><Icon type="star" />{item.star}</span>
									<span><Icon type="usb" />{item.fork}</span>
									<span className="users">Built by
										{
											item.user.map((t, i)=>(
												<Tooltip overlay={t.contributor} key={i}>
													<img src={t.avatar} alt={t.contributor}/>
												</Tooltip>
											))
										}
									</span>
									<span className="addition">
										<Icon type="star"/>
										{stars}
									</span>
								</p>
							</li>
						)
					})
				}
			</ul>
		</section>
	)
}