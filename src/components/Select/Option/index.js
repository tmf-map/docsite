import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import TextOverflow from '../../TextOverflow'
import Icon from '../../Icon'
import './index.less'

const Option = props => {
  const { children, className, data, value, selected, active, ...other } = props
  const classNames = cx(
    `${prefixCls}-select__option`,
    {
      [`${prefixCls}-select__option_active`]: active,
      [`${prefixCls}-select__option_selected`]: selected
    },
    className
  )
  return (
    <li className={classNames} {...other}>
      <TextOverflow>
        <div>{children}</div>
      </TextOverflow>
      {selected && <Icon type="check" className={`${prefixCls}-select__option-icon_selected`} />}
    </li>
  )
}

Option.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  data: PropTypes.object,

  // 值，与 Select value 对应，数据类型也要一致
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  selected: PropTypes.bool,
  active: PropTypes.bool
}

export default Option
