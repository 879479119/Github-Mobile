import React from "react";
import {Breadcrumb} from "antd";
import {Link} from "react-router-dom";

export default function (props) {
	let {location} = props,
		crumbs = location.match(/\/([\w-+%])+/g).map(t=>t.slice(1))
	return (
		<Breadcrumb style={{ margin: '12px 0' }}>
			<Breadcrumb.Item key="home">Github</Breadcrumb.Item>
			{
				crumbs.map((item, index) => (
					<Breadcrumb.Item key={'b'+index} ><Link to={location}/>{item}</Breadcrumb.Item>
				))
			}
		</Breadcrumb>
	)
}