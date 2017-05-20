import React, {Component} from "react";
import {connect} from "react-redux";
import {IntlProvider, addLocaleData} from 'react-intl'
import {changeLanguage} from "../views/HomeRedux"
import zhLocaleData from 'react-intl/locale-data/zh'
import zh from '../i18n/zh-CN'
import en from '../i18n/en-US'

addLocaleData([...zh,...en])
//fix the 'fallback' problem by using the following data
addLocaleData(zhLocaleData)

@connect(state=>({
	language: state.common.language
}), { changeLanguage })
export default class Internationalization extends Component{
	//noinspection JSMethodCanBeStatic
	render(){
		let {language, children, changeLanguage} = this.props
		try {
			language = localStorage.getItem('language') || navigator.language.split('-')[0]
		}catch (e){
			console.log('cannot get the language of browser')
		}
		return (
			<IntlProvider locale={language} messages={language === "zh" ? zh : en}>
				{children}
			</IntlProvider>
		)
	}
}