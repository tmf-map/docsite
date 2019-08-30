import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import ClearableInput from '../../ClearableInput'

const FormInput = (props, context) => {
  const { children, className, onChange, ...other } = props
  const { form, formItem } = context
  other.value = form.getItemValue(formItem)
  other.onChange = value => {
    form.setItemValue(formItem, value)
    onChange && onChange(value)
  }
  return <ClearableInput className={cx(`${prefixCls}-form__input`, className)} {...other} forbidClearable />
}

FormInput.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
}

FormInput.contextTypes = {
  form: PropTypes.object.isRequired,
  formItem: PropTypes.object.isRequired
}

export default FormInput
