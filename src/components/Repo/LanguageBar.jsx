import React from "react";
import "./LanguageBar.scss";
import Reflect from "../../utils/languages"
import {Tooltip} from "antd"

export default function LanguageBar({ lang, style }) {
	let bar = [], sum = 0
	for(let p in lang) {
		//noinspection JSUnfilteredForInLoop
		sum += lang[p]
	}
	for(let attr in lang){
		//noinspection JSUnfilteredForInLoop
		let color = Reflect[attr]['color'],
			len = (lang[attr] / sum * 100).toFixed(2) + '%'
		//noinspection JSUnfilteredForInLoop
		bar.push(<Tooltip key={attr}  overlay={attr+' '+len} placement={'bottom'} style={{display:'inline-block'}}><figure style={{background:color, width:len}} /></Tooltip>)
	}
	return(
		<section style={style} className="lang-bar">{bar}</section>
	)
}
