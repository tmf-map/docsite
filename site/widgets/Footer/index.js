import React, { PureComponent } from 'react'
import './index.less'

class Footer extends PureComponent {
  render () {
    return (
      <footer className="container">
        <div className="first-line">
          <div className="left">
            <h2>关于组件库</h2>
            <div className="intro">Earth UI - Earth Project React UI 组件库<br />
              在视觉设计和组件使用上都崇信极简主义的风格</div>
          </div>
          <div className="left">
            <h2>支付宝赞赏</h2>
            <div className="pay">
              <img src="/img/qrcode_alipay.jpg" alt="" />
            </div>
          </div>
          <div className="left">
            <h2>微信赞赏</h2>
            <div className="pay">
              <img src="/img/qrcode_wechat.jpg" alt="" />
            </div>
          </div>
          <div className="right">
            <h2>帮助</h2>
            <div className="help">
              <div><a href="https://github.com/G-Explorer/earth-ui">Github</a></div>
              <div><a href="https://g-explorer.slack.com">Slack 在线讨论</a></div>
              <div><a href="https://github.com/G-Explorer/earth-ui/issues/new">报告 Bug</a></div>
              <div><a href="https://github.com/G-Explorer/earth-ui/issues">讨论列表</a></div>
            </div>
          </div>
        </div>
        <div className="second-line">
          <div className="left" />
          <div className="right">
            <span>苏ICP备15056713号</span>
            <span>Copyright © Kimi Gao</span>
          </div>
        </div>
      </footer>
    )
  }
}

export default Footer
