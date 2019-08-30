import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { Select, Option } from '../../Select'

const FormSelect = (props, context) => {
  const { children, className, onChange, ...other } = props
  const { form, formItem } = context
  other.value = form.getItemValue(formItem)
  other.onChange = value => {
    form.setItemValue(formItem, value)
    onChange && onChange(value)
  }
  return (
    <Select className={cx(`${prefixCls}-form__select`, className)} {...other}>
      {children}
    </Select>
  )
}

FormSelect.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
}

FormSelect.contextTypes = {
  form: PropTypes.object.isRequired,
  formItem: PropTypes.object.isRequired
}

export { FormSelect, Option }
