import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, Select, Spin} from "antd";
import "./index.scss";
import {commonFetch, commonRelease} from "../../../views/RepoRedux";
import addDataFetch from '../../../redux/addDataFetch'
import {connect} from "react-redux";
import formatDate from "../../../utils/formatDate";

const ButtonGroup = Button.Group

@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class extends Component{
	drawGraph(){

	}
	componentDidMount(){
		const { commonFetch, owner, repo } = this.props

		// for(let i = 0;i < API.length;i ++){
		// 	if(this.getData(API[i]).status === 3){}
		// 	else commonFetch(API[i], {owner, repo, path:''})
		// }
	}
	render = () => {
		const { owner, repo } = this.props
		const btn = ['Contributors','Traffic','Commits','Code frequency','Punch card','Network','Members','Dependents']
		return (
			<div className="main-body">
				<ButtonGroup onClick={::this.drawGraph}>
					{btn.map((item, index) => (
						<Button key={'g-'+index} type={'default'} size={'large'}>{item}</Button>
					))}
				</ButtonGroup>
				{this.props.children}
			</div>
		)
	}
}