import React from "react";
import {fromNow} from "../../utils/formatDate";
import "./Repo.scss";
import {Icon} from "antd";
import LANGUAGES from '../../utils/languages'
import {Link} from 'react-router-dom'

export default function (props) {
	const {result} = props
	return (
		<div className="repo-container">
			<ul>
				{
					result.items.map((item, index)=>{

						const color = item.language ? LANGUAGES[item.language]['color'] : ''

						return (
							<li key={'s'+index} className="repo-item">
								<section className="first">
									<Link to={`/repo/${item.owner.login}/${item.name}`}>{item.full_name}</Link>
									<p>{item.description}</p>
									<em>Updated {fromNow(item.pushed_at)}</em>
								</section>
								<section className="second">
									<p><span className="badge" style={{background:color}} />{item.language}</p>
									<p className="score"><Icon type="trophy" />{item.score}</p>
								</section>
								<section className="third">
									<p><Icon type="star"/>{item.stargazers_count}</p>
									<p><Icon type="usb"/>{item.forks_count}</p>
									<p><Icon type="solution"/>{item.open_issues}</p>
								</section>
							</li>
						)
					})
				}
			</ul>
		</div>
	)
}