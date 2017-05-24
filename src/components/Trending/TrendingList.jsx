import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchTrending} from "../../views/TrendingRedux"

@connect((state=>({
	route: state.common.route,
	trending: state.trending
})), {fetchTrending})
export default class TrendingList extends Component {
	componentDidMount(){
		const {language, span, fetchTrending} = this.props
		fetchTrending('repo', language, span)
	}
	render(){
		const {language, span, trending} = this.props
		console.info(trending)
		return (
			<p>trending list {language} - {span}</p>
		)
	}
}