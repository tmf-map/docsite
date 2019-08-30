import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './index.less'

const Spinner = props => {
  const { className, style, height, ...other } = props

  if (typeof height !== 'undefined') {
    other.style = Object.assign(style || {}, {
      fontSize: height + 'px'
    })
  }

  return (
    <div className={cx(`${prefixCls}-spinner`, className)} {...other}>
      <div className={`${prefixCls}-spinner__circle`} />
    </div>
  )
}

Spinner.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,

  // 高度，默认 30px，宽度与高度相同
  height: PropTypes.number
}

export default Spinner
