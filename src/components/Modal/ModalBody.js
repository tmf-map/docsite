import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const ModalBody = props => {
  const { children, className, ...other } = props
  return (
    <div
      className={cx(`${prefixCls}-modal__modal-body`, className)}
      {...other}
    >
      {children}
    </div>
  )
}

ModalBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default ModalBody
