import React from 'react'

export default function (props) {
	return (
		<div>
			<p>trending</p>
			<section>
				{props.children}
			</section>
		</div>
	)
}