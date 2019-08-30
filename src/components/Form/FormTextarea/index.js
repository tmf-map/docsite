import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import './index.less'

const FormTextarea = (props, context) => {
  const { children, className, onChange, minWidth, minHeight, width, ...other } = props
  const { form, formItem } = context
  let value = form.getItemValue(formItem)
  if (!value && value !== 0) {
    value = ''
  }
  other.value = value
  other.onChange = e => {
    form.setItemValue(formItem, e.target.value)
    onChange && onChange(e)
  }
  if (width) {
    other.style = Object.assign(other.style || {}, { width })
  }
  if (minWidth) {
    other.style = Object.assign(other.style || {}, { minWidth })
  }
  if (minHeight) {
    other.style = Object.assign(other.style || {}, { minHeight })
  }
  return <textarea className={cx(`${prefixCls}-form__textarea`, className)} {...other} />
}

FormTextarea.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  // onChange事件
  onChange: PropTypes.func,

  // 宽度大小，单位为px
  width: PropTypes.number,

  // 最小宽度
  minWidth: PropTypes.number,

  // 最小高度
  minHeight: PropTypes.number
}

FormTextarea.contextTypes = {
  form: PropTypes.object.isRequired,
  formItem: PropTypes.object.isRequired
}

export default FormTextarea
