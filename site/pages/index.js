import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Header from 'widgets/Header'
import './index.less'

class App extends Component {
  componentWillUnmount () {
    document.getElementsByTagName('body')[0].removeEventListener('touchmove')
  }

  render () {
    let { children } = this.props
    return (
      <div className="wrapper">
        <Header />
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
}

export default App
