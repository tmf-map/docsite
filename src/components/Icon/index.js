import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import '../../styles/iconfont.less'

const Icon = props => {
  const { className, type, ...other } = props
  return (
    <i className={cx(`${prefixCls}-icon icon`, 'icon-' + type, className)} {...other} />
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  // 图标类型，https://fontawesome.com/v4.7.0/icons/
  type: PropTypes.string.isRequired
}

export default Icon
