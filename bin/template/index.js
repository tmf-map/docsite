import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './index.less'

class <%= name %> extends Component {
  constructor () {
    super()
    this.state = {

    }
  }

  render () {
    const { className, ...other } = this.props
    return (
      <div className={cx('cmui-<%= className %>', className)} {...other}>
        something...
      </div>
    )
  }
}

<%= name %>.propTypes = {
  className: PropTypes.string,

  // intro to test prop
  test: PropTypes.string
}

export default <%= name %>
