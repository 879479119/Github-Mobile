import React, {Component, PureComponent} from "react"
import cls from "classnames"
import PropTypes from "prop-types"
import {Button, Icon} from "antd"
import {Link} from "react-router-dom"

/**
 * what is this component for?
 *      -> show if we need show follow or cancel follow towards a user
 */


export default class Following extends PureComponent {
	static propType = {
		list: PropTypes.array
	}

	constructor(...props) {
		super(...props)
	}

	componentDidMount() {

	}

	render(){
		/**
		 * here we need an optimization, if the list is too large, we may change it to a hash table
		 * TODO: hash table
		 */
		const {item, simple= false, list} = this.props

		let follow = <Button className="star" key={item.name} size="small" ><Icon type="user" />Follow</Button>

		if(item.type === 'User'){
			for(let i = 0;i < list.length;i ++){
				if(list[i].following_name === item.name || list[i].following_name === item.login){
					follow = <Button className="star" key={item.name} size="small" ><Icon type="user" />UnFollow</Button>
				}
			}
		}

		return (
			<li>
				<img src={item.avatar || item.avatar_url} alt=""/>
				<h4>
					<Link to={`/user/${item.name || item.login}/profile`} style={{fontSize: 16}}>{item.name || item.login}</Link>
					{item.full_name ? `(${item.full_name})` : ''}
					<br/>
					<Link to={`/repo/${item.name || item.login}/${item.repo}`}>{item.repo}</Link>
				</h4>
				{simple ? '' : <p>{item.description}</p>}
				{item.type === 'User' ? follow : ''}
			</li>
		)
	}
}