import React from 'react'
import { Link } from '@reach/router'
import Button from 'earth-ui/lib/Button'
import { Row, Col } from 'earth-ui/lib/Layout'
import Center from 'widgets/Center'
import Pre from 'widgets/Pre'
import Footer from 'widgets/Footer'
import BackToTop from 'earth-ui/lib/BackToTop'
import Feature from './Feature'
import config from '../config'
import pkg from '../../../package.json'
import './index.less'

const code = `
import Button from 'earth-ui/lib/Button'

class App extends Component {

  handleClick = () => {
    console.log('hello, earth-ui')
  }

  render () {
    return <Button onClick={this.handleClick} />
  }
}`

const Home = () => {
  return (
    <div className="home">
      <div className="home__banner">
        <Center>
          <div className="home__banner-center">
            <h2>Based on ReactJS</h2>
            <h1>Earth UI Components Library</h1>
            <em>最新版本：v{`${pkg.version}`}</em>
            <Link to="/guide#install" className="home__banner-install">
              <Button className="home__banner-btn">安装</Button>
            </Link>
            <Link to="/components" className="home__banner-start">
              <Button className="home__banner-btn">文档</Button>
            </Link>
          </div>
        </Center>
      </div>

      <div className="home__middle">
        <Center>
          <Row gutter>
            <Col col="md-6" className="home__middle-left">
              <h2>极简风格UI组件库</h2>
              <p>一套基于ReactJS的UI组件库，在视觉设计和组件使用上都崇信极简主义的风格。采用声明式和命令式组件在不同场景灵活搭配，更便捷，也更注重中前台的用户体验。</p>
            </Col>
            <Col col="md-6">
              <Pre className="home__middle-code">{code}</Pre>
            </Col>
          </Row>
        </Center>
      </div>

      <div className="home__features">
        <Center>
          <div className="home__features-head">
            <h1>组件库特点</h1>
            <p>Earth UI 基于 React 组件开发思想，致力于打造开箱即用、体验友好、功能完善的UI组件库。</p>
          </div>
          <Row>
            <Feature title="面向中前台" icon={require('./img/feature_0.png')}>
              面向中前台，对中前台的常见场景倾力打造极致的用户体验
            </Feature>
            <Feature title="简洁易用" icon={require('./img/feature_1.png')}>
              简洁的属性和接口定义，尽量减少开发者的使用复杂度
            </Feature>
            <Feature title="多种类型组件" icon={require('./img/feature_2.png')}>
              采用声明式和命令式组件在不同场景灵活搭配，更加便捷
            </Feature>
            <Feature title="完全免费" icon={require('./img/feature_3.png')}>
              基于 MIT 协议，免费开源
            </Feature>
          </Row>
        </Center>
      </div>

      <div className="home__bottom">
        <Center>
          <h1>工具和资源</h1>
          <p>正在完善中，敬请期待...</p>
        </Center>
      </div>
      <Footer />
      <BackToTop {...config.backToTop} />
    </div>
  )
}

export default Home
