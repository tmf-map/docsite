import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

const ModalHeader = (props, context) => {
  const { children, className, title, ...other } = props
  return (
    <div className={cx(`${prefixCls}-modal__modal-header`, className)} {...other}>
      {title && (<div className={`${prefixCls}-modal__modal-header_default`}>{title}</div>)}
      {children}
    </div>
  )
}

ModalHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  // 导航栏标题，可以置空
  title: PropTypes.string
}

export default ModalHeader
