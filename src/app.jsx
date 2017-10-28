import 'babel-core/register'
import 'babel-polyfill'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.min.css'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import Router from './routes'
import configStore, { history } from './redux/store'
import rootStore from './redux/reducers'
import './styles/common.scss'

const store = configStore(rootStore, {})

class Page extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }
  render = () => (
    <Provider store={this.props.store}>
      {Router({ history: this.props.history })}
    </Provider>
  )
}

ReactDOM.render(
  <Page store={store} history={history} />
  , document.getElementById('container'),
)

// noinspection JSUnresolvedVariable
if (module.hot) {
  // noinspection JSUnresolvedVariable
  module.hot.accept()
}
