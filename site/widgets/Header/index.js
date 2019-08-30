import React from 'react'
import { Link } from '@reach/router'
import Button from 'earth-ui/lib/Button'
import { Row, Col } from 'earth-ui/lib/Layout'
import { Dropdown, DropdownToggle, DropdownMenu } from 'earth-ui/lib/Dropdown'
import Icon from 'earth-ui/lib/Icon'
import pkg from '../../../package.json'
import './index.less'

// TODO: will be replaced in next @reach/router
const NavLink = ({ className, activeClassName, partial, ...props }) => (
  <Link
    getProps={({ isCurrent, isPartiallyCurrent }) => {
      const condition = partial ? isPartiallyCurrent : isCurrent
      return condition
        ? { className: `${className} active` }
        : { className }
    }}
    {...props}
  />
)

const renderNav = () => {
  return (
    <ul>
      <li><NavLink to="/" activeClassName="active">首页</NavLink></li>
      <li><NavLink to="/guide" activeClassName="active">指南</NavLink></li>
      <li><NavLink to="/components" activeClassName="active" partial>组件</NavLink></li>
      <li><NavLink to="/changelog" activeClassName="active">更新日志</NavLink></li>
    </ul>
  )
}

class Header extends React.Component {
  render () {
    return (
      <Row className="header" fluid>
        <Col>
          <Link to="/" className="header__logo">
            <img src="../../img/earth_text_white.png" className="header__logo-text" />
            {/* <svg dangerouslySetInnerHTML={{__html: '<use xlink:href="#logo"></use>'}} /> */}
            <sub>v{`${pkg.version}`}</sub>
          </Link>
        </Col>
        <Col className="header__nav">
          {renderNav()}
        </Col>
        <Col right>
          <Dropdown ref="dropdown">
            <DropdownToggle className="header__nav-toggle">
              <Button icon="bars" transparent />
            </DropdownToggle>
            <DropdownMenu
              onClick={() => this.refs.dropdown.close()}
              className="header__nav-toggle-popover"
              align="middle"
            >
              {renderNav()}
            </DropdownMenu>
          </Dropdown>
          <a
            href="https://github.com/G-Explorer/earth-ui"
            target="_blank"
            className="header__github"
          >
            <Icon type="github" />
          </a>
        </Col>
      </Row>
    )
  }
}

export default Header
