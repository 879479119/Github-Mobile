import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeA } from '../views/HomeRedux'

@connect(state=>({a: state.common.a}), { changeA })
export default class Home extends Component{
	render(){
		setTimeout(() => this.props.changeA(5),5000)
		return (
			<div>pddddddddddddddddddd</div>
		)
	}
}