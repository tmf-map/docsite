import React from 'react'
import Center from 'widgets/Center'
import Markdown from 'widgets/Markdown'
import Footer from 'widgets/Footer'
import BackToTop from 'earth-ui/lib/BackToTop'
import ScrollUp from 'widgets/ScrollUp'
import html from '../../../CHANGELOG.md'
import config from '../config'
import './index.less'

export default () => {
  return (
    <ScrollUp>
      <div className="changelog">
        <Center>
          <Markdown html={html} />
        </Center>
        <Footer />
        <BackToTop {...config.backToTop} />
      </div>
    </ScrollUp>
  )
}
