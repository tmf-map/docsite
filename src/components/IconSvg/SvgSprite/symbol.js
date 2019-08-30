import React from 'react'
import PropTypes from 'prop-types'

export default class Symbol extends React.Component {
  render () {
    const {svg, name, viewBox, className, ...other} = this.props.symbol

    return (
      <symbol
        {...other}
        key={name}
        id={this.attribute('id', name, svg)}
        viewBox={this.attribute('viewBox', viewBox, svg)}
        className={this.attribute('class', className, svg)}
        dangerouslySetInnerHTML={this.extractChildren(svg)}
      />
    )
  }

  attribute (name, value, svg) {
    const pattern = new RegExp(`${name}=(?:"|')([^("|')]*)(?:"|')`)

    if (!value) {
      let svgOpenTag = svg.startsWith('<svg') ? svg.match(/<svg[^>]*>/)[0] : null
      value = svgOpenTag && pattern.test(svgOpenTag) ? svgOpenTag.match(pattern)[1] : null
    }

    return value
  }

  extractChildren (svg) {
    return {__html: svg.replace(/<svg[^>]*>|<\/svg>/g, '')} // remove svg tags
  }
}

Symbol.propTypes = {
  symbol: PropTypes.shape({
    svg: PropTypes.string.isRequired,
    name: PropTypes.string,
    viewBox: PropTypes.string,
    className: PropTypes.string
  }).isRequired
}
