import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

class Nav extends Component {
  constructor (props) {
    super()
    this.state = {
      selectedId: props.selectedId || ''
    }
  }

  getChildContext () {
    return {
      nav: this
    }
  }

  handleItemClick (props, e) {
    this.setState({selectedId: props.id})
    this.props.onItemClick && this.props.onItemClick(props, e)
  }

  render () {
    const { children, className, width, indent, ...other } = this.props

    delete other.selectedId
    delete other.onItemClick

    if (width) {
      other.style = Object.assign(other.style || {}, { width })
    }

    const childrenWithNewProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        indent
      })
    })

    return (
      <div className={cx(`${prefixCls}-nav`, className)} {...other}>
        <ul>{childrenWithNewProps}</ul>
      </div>
    )
  }
}

Nav.childContextTypes = {
  nav: PropTypes.instanceOf(Nav)
}

Nav.propTypes = {

  children: PropTypes.node,

  className: PropTypes.string,

  // 当前选中的导航项的 id
  selectedId: PropTypes.string.isRequired,

  // 导航缩进宽度
  indent: PropTypes.number,

  // 导航宽度
  width: PropTypes.number,

  // 叶子节点 NavItem 点击事件，参数为当前 NavItem 的 props 以及 event 对象
  onItemClick: PropTypes.func
}

Nav.defaultProps = {
  indent: 24
}

export default Nav
