import React from 'react'
import PropTypes from 'prop-types'

class ScrollUp extends React.Component {
  componentDidMount () {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0)
    })
  }
  render () {
    return this.props.children
  }
}

ScrollUp.propTypes = {
  children: PropTypes.node
}

export default ScrollUp
