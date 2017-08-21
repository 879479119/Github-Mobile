import React from "react";
import {Link} from "react-router-dom";
import "./User.scss";
import {Icon} from "antd";

export default function User({ owner, style={} }) {
	if(owner === undefined){
		owner = {
			login: 'login',
			avatar_url: '',
			id: '',
			type: 'User',
		}
	}
	return(
		<div className="user-small" style={style}>
			<Link to={`/Profile/${owner.login}`}>
				<img src={owner.avatar_url} alt={owner.id}/>
				<h4><Icon type={owner.type === 'User' ? 'user':'team'} />{owner.login}</h4>
			</Link>
		</div>
	)
}
