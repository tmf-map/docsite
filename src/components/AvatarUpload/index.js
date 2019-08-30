import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Avatar from '../Avatar'
import './index.less'

class AvatarUpload extends Component {
  _handleClick = e => {
    const onClick = this.props.onClick
    if (onClick) {
      onClick(e)
    }
  }

  render () {
    let {shape, size, src, className, text} = this.props
    return (
      <div className={`${prefixCls}-avatar-upload`}>
        {src
          ? <div className={`${prefixCls}-avatar-upload__update`}>
            <Avatar src={src} shape={shape} size={size} onClick={this._handleClick} />
            <div onClick={this._handleClick}
              className={cx(
                `${prefixCls}-avatar-upload__cover`,
                {
                  [`${prefixCls}-avatar-upload__cover_${shape}`]: shape,
                  [`${prefixCls}-avatar-upload__cover_${size}`]: size
                },
                className
              )}>{text}</div>
          </div>
          : <div onClick={this._handleClick}
            className={cx(
              `${prefixCls}-avatar-upload__first`,
              {
                [`${prefixCls}-avatar-upload__shallow-cover_${shape}`]: shape,
                [`${prefixCls}-avatar-upload__shallow-cover_${size}`]: size
              },
              className
            )}>{text}</div>
        }
      </div>
    )
  }
}

AvatarUpload.propTypes = {
  className: PropTypes.string,

  // 头像的形状，默认`circle`，可选`square`
  shape: PropTypes.oneOf(['square', 'circle']),

  // 输入框大小
  size: PropTypes.oneOf(['lg', 'xl']),

  // 头像图片的地址
  src: PropTypes.string,

  // 头像中间说明文字/hover状态下的说明文字
  text: PropTypes.string,

  // 点击头像事件
  onClick: PropTypes.func
}

AvatarUpload.defaultProps = {
  shape: 'circle',
  src: ''
}

export default AvatarUpload
