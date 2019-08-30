import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import beautify from 'code-beautify'
import './index.less'

const Pre = props => {
  const { className, lang, transparent, children } = props
  const code = beautify(children, lang || 'js')
  return (
    <pre
      className={classnames('pre', {'pre--transparent': transparent}, className)}
      dangerouslySetInnerHTML={{__html: code}}
    />
  )
}

Pre.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  lang: PropTypes.string,
  transparent: PropTypes.bool
}

export default Pre
