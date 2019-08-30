import React from 'react'
import PropTypes from 'prop-types'

const IconSvg = props => {
  let otherProps = Object.assign({}, props)
  delete otherProps.id
  delete otherProps.color
  delete otherProps.width
  delete otherProps.height

  return (
    <svg {...otherProps} style={{width: props.width, height: props.height}}>
      <use xlinkHref={`#${props.id}`} style={{ fill: props.color }} />
    </svg>
  )
}

IconSvg.propTypes = {
  id: PropTypes.string.required,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
}

IconSvg.defaultProps = {
  color: '#555',
  width: '32',
  height: '32'
}

export default IconSvg
