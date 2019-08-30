import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Button from 'earth-ui/lib/Button'
import Pre from 'widgets/Pre'
import './index.less'

class Demo extends Component {
  constructor (props) {
    super()
    this.state = {
      open: false
    }
  }

  // componentDidMount() {
  //   this.codeHeight = ReactDOM.findDOMNode(this.refs.pre).offsetHeight
  // }

  handleToggle = () => {
    this.setState({open: !this.state.open})
  }

  render () {
    const { className, title, desc, code, children } = this.props
    const { open } = this.state
    const classNames = cx('demo', {
      'demo__open': open
    }, className)
    return (
      <div className={classNames}>
        <h2 className="demo__title">{title}</h2>
        <div className="demo__content">{children}</div>
        {desc && <div className="demo__desc">{desc}</div>}
        <div className="demo__toggle">
          <Button transparent icon="angle-double-right" onClick={this.handleToggle}>
            代码
          </Button>
        </div>
        <div className="demo__code" ref="pre">
          <Pre transparent>{code}</Pre>
        </div>
      </div>
    )
  }
}

Demo.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  code: PropTypes.string
}

export default Demo
