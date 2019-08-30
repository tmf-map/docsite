import React from 'react'
import Center from 'widgets/Center'
import Markdown from 'widgets/Markdown'
import Footer from 'widgets/Footer'
import ScrollUp from 'widgets/ScrollUp'
import BackToTop from 'earth-ui/lib/BackToTop'
import html from '../../../README.zh-CN.md'
import config from '../config'
import './index.less'

export default () => {
  return (
    <ScrollUp>
      <div className="guide">
        <Center>
          <Markdown html={html} />
        </Center>
        <Footer />
        <BackToTop {...config.backToTop} />
      </div>
    </ScrollUp>
  )
}
