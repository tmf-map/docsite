import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import classlist from 'classlist'
import cx from 'classnames'
import CoordinateFactory from './CoordinateFactory'

class PopoverContent extends Component {
  getChildContext () {
    return {
      popoverContent: this
    }
  }

  componentDidMount () {
    this.setPosition()
  }

  componentDidUpdate () {
    this.setPosition()
  }

  setPosition () {
    const { triggerNode, direction, align } = this.props
    const rootNode = ReactDOM.findDOMNode(this)
    rootNode.style.display = 'block'

    // Prevent accumulation
    if (this.positionClassNames) {
      classlist(rootNode).remove(...this.positionClassNames.split(' '))
    }
    const [computedDirection, computedAlign] = CoordinateFactory(
      triggerNode, rootNode, direction, align
    )
    this.positionClassNames = cx({
      [`${prefixCls}-popover_${computedDirection}`]: true,
      [`${prefixCls}-popover_align-${computedAlign}`]: !!computedAlign
    })
    classlist(rootNode).add(this.positionClassNames)
  }

  render () {
    const {
      children, className, triggerNode, triggerMode, direction, align, ...other
    } = this.props
    return (
      <div className={cx(`${prefixCls}-popover`, {
        [`${prefixCls}-popover_animation`]: triggerMode === 'hover'
      }, className)} {...other}>
        <div className={`${prefixCls}-popover__content`}>
          {children}
        </div>
      </div>
    )
  }
}

PopoverContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element
  ]),
  triggerNode: PropTypes.object,
  className: PropTypes.string,
  triggerMode: PropTypes.oneOf(['click', 'hover']),
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle'])
}

PopoverContent.childContextTypes = {
  popoverContent: PropTypes.instanceOf(PopoverContent)
}

export default PopoverContent
