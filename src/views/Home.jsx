import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeA } from '../views/HomeRedux'

@connect(state=>({a: state.common.a}), { changeA })
export default class Home extends Component{
	componentWillMount(){
		let code = null
		try{
			code = location.search.match(/code=(\w*)/)[1]
		}catch(e) {
			code = null
		}

		if(code){
			fetch("/user/register",{
				method: "POST",
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				credentials: 'include',
				body: "code=" + code
			}).then(res => res.text()).then(res=>{
				console.log(res)
			})
		}
	}
	componentDidMount(){
		console.log(localStorage.getItem("key"))
		// if(!localStorage.getItem("key")){
		// 	window.location = "https://github.com/login/oauth/authorize?scope=admin&client_id=af4fdd0b77c3a4073f0c"
		// }
	}
	render(){
		setTimeout(() => this.props.changeA(5),5000)
		return (
			<div><a href="https://github.com/login/oauth/authorize?scope=admin&client_id=af4fdd0b77c3a4073f0c">Auth</a></div>
		)
	}
}