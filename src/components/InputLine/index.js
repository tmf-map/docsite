import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class InputLine extends Component {
  render () {
    let {styleType, type, validationState, help, ...others} = this.props
    return (
      <div>
        <input className={`${prefixCls}-input-line`} type={type} name={name} {...others} />
        {!validationState && <div className={`${prefixCls}-input-line__help`}>{help}</div>}
      </div>
    )
  }
}

InputLine.propTypes = {
  styleType: PropTypes.string,
  type: PropTypes.string,
  validationState: PropTypes.bool,
  help: PropTypes.string
}

InputLine.defaultProps = {
  styleType: 'default',
  type: 'text'
}

export default InputLine
