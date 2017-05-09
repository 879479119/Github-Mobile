import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Button, Select, Input} from "antd";
import "./index.scss";
import addDataFetch from '../../../redux/addDataFetch'
import {commonFetch, commonRelease} from "../../../views/RepoRedux";
import {connect} from "react-redux";
import formatDate from "../../../utils/formatDate";

const InputGroup = Input.Group
const Option = Select.Option
const ButtonGroup = Button.Group
const API = [
	'/api/issues/getForRepo',
]


@withRouter
@connect(state=>({
	queue: state.queue
}),{ commonFetch, commonRelease})
@addDataFetch
export default class extends Component{
	componentDidMount(){
		const { commonFetch, owner, repo } = this.props

		commonFetch(API[0], {owner, repo, state: 'open'})
	}
	render = () => {
		const { owner, repo, details } = this.props
		let issues = this.getData(API[0])

		return (
			<div className="main-body">
				<section className="issue-panel">
					<InputGroup compact>
						<Select defaultValue="Zhejiang">
							<Option value="Zhejiang">Zhejiang</Option>
							<Option value="Jiangsu">Jiangsu</Option>
						</Select>
						<Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
					</InputGroup>
					<ButtonGroup>
						<Button>Labels</Button>
						<Button>Milestones</Button>
					</ButtonGroup>
					<Button type="primary">New issue</Button>
				</section>
				<section className="issue-card-container">

				</section>
			</div>
		)
	}
}