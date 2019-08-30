import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { scrollTo, currentYPosition } from './scroll'
import Icon from '../Icon'

class BackToTop extends Component {
  constructor (props) {
    super(props)
    this.state = {
      style: {
        ...props.position,
        position: 'fixed',
        zIndex: 2000,
        paddingBottom: '50%',
        padding: '8px 12px',
        fontSize: props.fontSize,
        textAlign: 'center',
        whiteSpace: 'nowrap',
        width: props.text === '' && !props.icon && `${props.radius * 2}px`,
        height: props.text === '' && !props.icon && `${props.radius * 2}px`,
        opacity: 0,
        color: props.color,
        background: props.background,
        border: 'none',
        borderRadius: props.shape === 'round' ? '50%' : '0',
        cursor: 'pointer',
        outline: 'none',
        boxShadow: '0 2px 5px 0 rgba(0,0,0,.26)',
        transition: 'all .5s'
      },
      hover: false
    }
    this.handleScroll = this.handleScroll.bind(this)
  }

  componentWillMount () {
    const { icon, text } = this.props
    const iconStyle = {
      paddingRight: (text !== '' ? '10px' : '0')
    }
    if (icon === '') {
      this.ico = ''
    } else {
      this.ico = <Icon type={icon} style={iconStyle} />
    }
  }
  componentDidMount () {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const scrollY = currentYPosition()
    const show = scrollY > this.props.topDistance

    const { opacity } = this.state.style
    if (opacity === 0 && show) {
      this.setState({
        ...this.state,
        style: {
          ...this.state.style,
          opacity: 1,
          zIndex: 2000
        }
      })
    } else if (opacity === 1 && !show) {
      this.setState({
        ...this.state,
        style: {
          ...this.state.style,
          opacity: 0,
          zIndex: -1
        }
      })
    }
  }

  handleHover = (hover) => {
    this.setState({
      ...this.state,
      hover
    })
  }

  handleClickBack = () => {
    const scrollY = currentYPosition()
    scrollTo(0, scrollY / this.props.speed, this.props.timing)
  }

  render () {
    const { text, hover } = this.props

    return (
      <button
        ref={(instance) => { this.btn = instance }}
        style={this.state.hover ? { ...this.state.style, ...hover } : this.state.style}
        onClick={this.handleClickBack}
        onMouseOver={() => this.handleHover(true)}
        onMouseOut={() => this.handleHover(false)}
      >
        { this.ico }
        { text }
      </button>
    )
  }
}

BackToTop.defaultProps = {
  shape: 'default',
  text: '',
  icon: '',
  radius: 0,
  fontSize: '18px',
  position: {
    bottom: '10%',
    right: '5%'
  },
  color: 'white',
  background: 'rgba(0, 0, 0, .5)',
  hover: {
    background: 'rgba(0, 0, 0, .7)'
  },
  topDistance: 200,
  timing: 'linear',
  speed: 100
}

BackToTop.propTypes = {

  // 按钮形状，默认`default`无圆角， 可选`round`
  shape: PropTypes.oneOf(['default', 'round']),

  // 按钮圆角的大小
  radius: PropTypes.number,

  // 按钮中的文字
  text: PropTypes.string,

  // 文字字体大小，默认`18px`
  fontSize: PropTypes.string,

  // 按钮的 position, 包括 top, bottom, left, right, 默认`position: {bottom: '10%', right: '5%'}`
  position: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string
  }),

  // 按钮的图标类型
  icon: PropTypes.string,

  // 按钮文字颜色，默认`white`
  color: PropTypes.string,

  // 按钮的背景颜色， 默认`rgba(0, 0, 0, .5)`
  background: PropTypes.string,

  // 按钮hover时候的背景颜色， 默认`rgba(0, 0, 0, .7)`
  hover: PropTypes.object,

  // 按钮距离顶部的高度，默认`200`
  topDistance: PropTypes.number,

  // 按钮出现和消失的动画类型，默认`linear`，此外还有`easeIn/easeOut/easeInOut`
  timing: PropTypes.oneOf(['linear', 'easeIn', 'easeOut', 'easeInOut']),

  // 按钮出现和消失的速度，默认`100`
  speed: PropTypes.number
}

export default BackToTop
