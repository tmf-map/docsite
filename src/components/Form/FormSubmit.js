import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Button from '../Button'
import Spinner from '../Spinner'

class FormSubmit extends Component {
  constructor (props, context) {
    super()
    const { form } = context
    form.submit = this
    this.state = {
      process: false
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timer)
    this.toggleProcess = () => {}
  }

  handleClick = () => {
    const { onClick } = this.props
    const { form } = this.context
    onClick && onClick()
    if (form.props.onSubmit) {
      form.handleSubmit()
    } else {
      form.save()
    }
  }

  /**
   * @public
   * @name toggleProcess
   * @param  {boolean} process 是否切换到处理中模式
   * @description 控制按钮状态是否为处理中，用于表单提交成功前的等待提醒，
   * 调用 Form save 方法且表单验证通过后自动调用该接口
   */
  toggleProcess (process) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({ process })
    }, process ? 150 : 0)
  }

  render () {
    const { children, className, onClick, ...other } = this.props
    const { process } = this.state
    return (
      <Button
        className={cx(`${prefixCls}-form__submit`, className)}
        onClick={this.handleClick}
        disabled={process}
        {...other}
      >
        {process ? <Spinner height={20} /> : children}
      </Button>
    )
  }
}

FormSubmit.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
}

FormSubmit.contextTypes = {
  form: PropTypes.object
}

export default FormSubmit
