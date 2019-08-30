import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import cx from 'classnames'
import Popover from '../Popover'
import './index.less'
import '../Tooltip/index.less'

class TextOverflow extends Component {
  render () {
    const { children, className, ...other } = this.props
    return (
      <Popover
        className={cx(`${prefixCls}-tooltip__popover`, className)}
        content={children.props.children}
        shouldOpen={() => {
          if (!this.rootNode) {
            this.rootNode = ReactDOM.findDOMNode(this)
          }
          return this.rootNode.offsetWidth < this.rootNode.scrollWidth
        }}
        {...other}
      >
        {React.cloneElement(children, {
          className: cx(children.props.className, `${prefixCls}-text-overflow`)
        })}
      </Popover>
    )
  }
}

TextOverflow.defaultProps = {
  direction: 'up',
  align: 'middle'
}

TextOverflow.propTypes = {

  className: PropTypes.string,

  children: PropTypes.element.isRequired,

  // 提示框位置方向，默认 `up`
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),

  // 提示框对齐方式，默认 `middle`
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle'])
}

export default TextOverflow
