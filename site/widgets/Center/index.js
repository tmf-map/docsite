import React from 'react'
import PropTypes from 'prop-types'
import './index.less'

const Center = props => {
  return (
    <div className="center">
      {props.children}
    </div>
  )
}

Center.propTypes = {
  children: PropTypes.node
}

export default Center
