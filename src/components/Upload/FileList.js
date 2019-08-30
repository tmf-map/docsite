import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Icon from '../Icon'
import './index.less'

class FileList extends Component {
  handleClick (item) {
    this.props.onRemove(item)
  }
  render () {
    return (
      <div className={`${prefixCls}-upload__filelist`}>
        {
          this.props.data.map((item, index) => {
            return (
              <div key={index} className={`${prefixCls}-upload__filelist_row`}>
                <span>{item.name}</span>
                <span>{item.percent}%</span>
                <Icon type="upload" style={{display: item.state === 0 ? '' : 'none'}} />
                <Icon type="check-circle" style={{paddingRight: '10px', color: 'green', display: item.state === 1 ? '' : 'none'}} />
                <Icon type="times-circle" style={{paddingRight: '10px', color: 'red', display: item.state === 2 ? '' : 'none'}} />
                <Icon type="trash" style={{color: 'gray', cursor: 'pointer'}} onClick={this.handleClick.bind(this, item)} />
              </div>
            )
          })
        }
      </div>
    )
  }
}

FileList.propTypes = {
  data: PropTypes.array,
  onRemove: PropTypes.func
}

export default FileList
