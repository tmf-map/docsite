import React from 'react'
import PropTypes from 'prop-types'
import Symbol from './symbol'

export default class SvgSprite extends React.Component {
  render () {
    const {symbols, style, ...other} = this.props

    return (
      <svg {...other} style={style}
        xmlns="http://www.w3.org/2000/svg">
        {symbols.map(symbol => {
          return <Symbol key={symbol.name} symbol={symbol} />
        })}
      </svg>
    )
  }
}

SvgSprite.propTypes = {
  symbols: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ).isRequired,
  style: PropTypes.object
}

SvgSprite.defaultProps = {
  style: {display: 'none'}
}
