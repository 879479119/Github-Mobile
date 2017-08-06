import 'babel-core/register'
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import React, { Component } from 'react'
import 'antd/dist/antd.min.css'
import PropTypes from 'prop-types'
import configStore, { history } from './redux/store'
import rootStore from './redux/reducers'

import Router from './routes'
import './styles/common.scss'

const store = configStore(rootStore, {});

class Page extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  render = () => (
    <Provider store={this.props.store}>
      {Router({ history: this.props.history })}
    </Provider>)
}

ReactDOM.render(
  <Page store={store} history={history} />,
  window.document.getElementById('container'),
)

// noinspection JSUnresolvedVariable
if (module.hot) {
  //  noinspection JSUnresolvedVariable
  module.hot.accept()
}
