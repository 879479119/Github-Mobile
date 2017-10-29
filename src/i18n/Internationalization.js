import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addLocaleData, IntlProvider } from 'react-intl'
import zhLocaleData from 'react-intl/locale-data/zh'
import zh from './zh-CN'
import en from './en-US'

addLocaleData([...zh, ...en])
// fix the 'fallback' problem by using the following data
addLocaleData(zhLocaleData)

@connect(state => ({
  language: state.common.language,
}), {})
export default class Internationalization extends Component {
  // noinspection JSMethodCanBeStatic
  render() {
    let { language = 'en' } = this.props
    try {
      language = window.localStorage.getItem('language') || window.navigator.language.split('-')[0]
    } catch (e) {
      console.log('cannot get the language of browser')
    }
    return (
      <IntlProvider locale={language} messages={language === 'zh' ? zh : en}>
        {this.props.children}
      </IntlProvider>
    )
  }
}
