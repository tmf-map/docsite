import React from 'react'
import Button from 'earth-ui/lib/Button'
import ScrollUp from 'widgets/ScrollUp'
import './index.less'

const NotFound = (props) => {
  return (
    <ScrollUp>
      <div className="not-found">
        <h1>404</h1>
        <p>您访问的页面不存在，也可能被移除了</p>
        <Button onClick={() => window.history.back()}>返回</Button>
      </div>
    </ScrollUp>
  )
}

export default NotFound
