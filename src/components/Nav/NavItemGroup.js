import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

class NavItemGroup extends React.Component {
  render () {
    const { children, className, title, indent, ...other } = this.props
    let indentStyle

    if (indent) {
      indentStyle = { paddingLeft: `${indent}px` }
    }
    const childrenWithNewProps = React.Children.map(children, child => {
      return React.cloneElement(child, {
        indent: (indent - 8) * 2
      })
    })
    return (
      <li className={cx(`${prefixCls}-nav__item-group`, className)} {...other}>
        <div className={`${prefixCls}-nav__item-group-title`} style={indentStyle}>{title}</div>
        {childrenWithNewProps && <ul>{childrenWithNewProps}</ul>}
      </li>
    )
  }
}

NavItemGroup.propTypes = {
  className: PropTypes.string,
  indent: PropTypes.number,

  // 分组的导航项项
  children: PropTypes.node.isRequired,

  // 分组导航标题，可以是文本字符串，也可以是 React 元素
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default NavItemGroup
