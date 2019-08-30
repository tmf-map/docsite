import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const DropdownToggle = props => {
  const { className, children, open, ...other } = props
  return (
    <div className={cx(`${prefixCls}-dropdown-toggle`, {
      [`${prefixCls}-dropdown-toggle_open`]: open
    }, className)} {...other}>
      {children}
    </div>
  )
}

DropdownToggle.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  open: PropTypes.bool
}

export default DropdownToggle
