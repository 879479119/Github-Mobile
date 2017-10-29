import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { spring, StaggeredMotion } from 'react-motion'
import './Table.scss'

class Item extends Component {
  // noinspection JSMethodCanBeStatic
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  // noinspection JSUnusedGlobalSymbols,JSMethodCanBeStatic
  componentWillEnter(callback) {
    console.log('component will enter')
    callback()
  }

  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  componentDidEnter() {
    console.log('component did enter')
  }

  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  componentWillLeave(callback) {
    console.log('component will leave')
    callback()
  }

  render() {
    const { item, callback } = this.props

    return (
      <div onClick={callback} className="ppp">
        {item}
        <spn>123</spn>
      </div>
    )
  }
}

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = { item: 'me' }
    this.handleAdd = this.handleAdd.bind(this)
  }
  handleAdd() {
    this.setState({ p: 0 })
  }

  handleRemove() {
    this.setState({ item: null })
  }

  render() {
    const { item } = this.state
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <ReactCSSTransitionGroup
          transitionName="example"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnterTimeout={5000}
          transitionLeaveTimeout={3000}
        >
          {item ? <Item key="2" item={item} p={this.state.p} callback={::this.handleRemove} /> : ''}
        </ReactCSSTransitionGroup>
        <StaggeredMotion
          defaultStyles={[{ h: 0 }, { h: 0 }, { h: 0 }]}
          styles={prevInterpolatedStyles => prevInterpolatedStyles.map(() => {
            return { h: spring(200) }
          })}
        >
          {interpolatingStyles =>
            (
              <div>
                {interpolatingStyles.map(style => <div style={{ border: '1px solid', height: style.h }} />)}
              </div>
            )
          }
        </StaggeredMotion>
      </div>
    )
  }
}
