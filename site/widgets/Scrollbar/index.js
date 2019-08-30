import React from 'react'
import PropTypes from 'prop-types'
import { Scrollbars } from 'react-custom-scrollbars'
import cx from 'classnames'
import './index.less'

const Scrollbar = props => {
  const { children, className, ...other } = props
  return (
    <div className="scrollbar">
      <Scrollbars {...other} autoHideTimeout={500} autoHideDuration={200}>
        <div className={cx(className)}>{children}</div>
      </Scrollbars>
    </div>
  )
}

Scrollbar.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Scrollbar
