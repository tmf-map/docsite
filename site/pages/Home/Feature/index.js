import React from 'react'
import PropType from 'prop-types'
import { Col } from 'earth-ui/lib/Layout'
import './index.less'

const Feature = props => {
  const { icon, title, children, ...other } = props
  return (
    <Col col="md-3 sm-6" className="home__feature" {...other}>
      {/* <img width="100" height="100" src={icon} /> */}
      <h2>{title}</h2>
      <p>{children}</p>
    </Col>
  )
}

Feature.propTypes = {
  icon: PropType.string,
  title: PropType.string,
  children: PropType.node
}

export default Feature
