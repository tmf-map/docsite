import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import xhr from '../xhr'
import FileList from './FileList'
import Button from '../Button/index'
import './index.less'

class Upload extends Component {
  constructor () {
    super()
    this.state = {
      data: {},
      list: []
    }
  }

  handleClick = e => {
    if (this.props.button && e.target.localName !== 'button') return
    const fileEl = this.refs.file
    fileEl.value = ''
    fileEl.click()
  }

  handleChange = event => {
    const el = event.target
    const files = el.files
    const onUplading = this.props.onUplading
    const onUpload = this.props.onUpload
    onUplading && onUplading(0)
    onUpload ? onUpload(files) : this.upload(files)
    el.value = ''
  }

  upload (files) {
    const onUplading = this.props.onUplading
    const self = this
    const arr = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      arr.push({
        name: file.name,
        size: file.size,
        type: file.type,
        state: 0
      })

      // todo: remove
      xhr.header = {
        userId: window.runtime ? window.runtime.userId : ''
      }

      ;(function (self, file, index) {
        const fd = new FormData()
        fd.append(self.props.fileName || 'files', file)
        xhr({
          type: 'post',
          url: self.props.action,
          data: fd,
          beforeSend (xhr) {
            // 侦查当前附件上传情况
            xhr.upload.onprogress = function (evt) {
              const loaded = evt.loaded
              const tot = evt.total
              const per = Math.floor(100 * loaded / tot) // 已经上传的百分比
              const list = self.state.list.slice(0)
              const f = list[index]
              f.percent = per
              onUplading && onUplading(per)
              self.setState({
                list
              })
            }
          },
          success (data) {
            const list = self.state.list.slice(0)
            const f = list[index]
            f.state = 1
            self.setState({
              data,
              list
            })
            if (typeof self.props.onComplete === 'function') {
              self.props.onComplete(data, list)
            }
          },
          error (msg) {
            const list = self.state.list.slice(0)
            const f = list[index]
            f.state = 2
            self.setState({
              list
            })
            if (typeof self.props.onComplete === 'function') {
              self.props.onComplete(msg, list)
            }
          },
          complete () {}
        })
      })(self, file, i)
    }

    this.setState({
      list: arr
    })
  }

  handleRemove = currItem => {
    const self = this
    const arr = this.state.list.slice(0)
    arr.map((item, index) => {
      if (item === currItem) {
        arr.splice(index, 1)
        self.setState({
          list: arr
        })
      }
    })
  }

  render () {
    const { className, action, fileName, multiple, onUplading, onComplete, showFileList, button, onUpload, ...other } = this.props
    return (
      <div className={cx(`${prefixCls}-upload`, className)} {...other}>
        <input ref="file" onChange={this.handleChange} type="file" multiple={!!multiple} style={{display: 'none'}} />
        <div className={`${prefixCls}-upload__children`} onClick={this.handleClick}>
          {this.props.children}
        </div>
        {button && button.name &&
          <Button {...button} onClick={this.handleClick}>{button.name}</Button>
        }
        {showFileList &&
          <div className={`${prefixCls}-upload__listbox`}>
            <FileList data={this.state.list} onRemove={this.handleRemove} />
          </div>
        }
      </div>
    )
  }
}

Upload.propTypes = {

  children: PropTypes.node,

  className: PropTypes.string,

  // 上传的地址
  action: PropTypes.string,

  // 上传按钮内容和样式
  button: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.string,
    icon: PropTypes.string,
    circle: PropTypes.bool,
    transparent: PropTypes.bool
  }),

  // 上传文件名称，默认为files
  fileName: PropTypes.string,

  // 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。
  multiple: PropTypes.bool,

  // 文件上传进行中事件
  onUplading: PropTypes.func,

  onUpload: PropTypes.func,

  // 上传文件完成时的回调函数，前提用户没有自定义onUpload方法方可生效
  onComplete: PropTypes.func,

  // 是否显示文件上传列表
  showFileList: PropTypes.bool

}

export default Upload
