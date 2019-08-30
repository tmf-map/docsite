import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'
import { Nav, SubNav, NavItemGroup, NavItem } from 'earth-ui/lib/Nav'
import { Layout, LayoutSidebar, LayoutContent } from 'widgets/Layout'
import components from './components.json'

class Components extends React.Component {
  constructor (props) {
    super()
    this.componentsMap = {}
    this.state = {
      open: false
    }
  }

  toggle (open) {
    this.setState({ open })
  }

  switchRoute (route) {
    if (route) {
      navigate(`/components/${route}`)
    }
  }

  handleItemClick = props => {
    this.toggle(false)
    this.switchRoute(props.id)
  }

  renderTitle (component) {
    const { name, cn } = this.componentsMap[component]
    return (
      <h2 className="components__title" style={{marginTop: '0px'}}>{cn + ' ' + name}</h2>
    )
  }

  renderNavItem (item, position) {
    this.componentsMap[item.name] = item
    if (position === 'outside') {
      return (
        <NavItem key={item.name} id={item.name} title={item.cn} />
      )
    }
    return (
      <NavItem key={item.name} id={item.name}>
        <span>{item.name}</span><span className="chinese">{item.cn}</span>
      </NavItem>
    )
  }

  renderNavItemGroup (itemGroup) {
    return (
      <NavItemGroup title={itemGroup.group} key={itemGroup.group}>
        {itemGroup.components.map(component => this.renderNavItem(component))}
      </NavItemGroup>
    )
  }

  render () {
    const { open } = this.state
    const { children, '*': component } = this.props
    return (
      <div className="components">
        <Layout open={open} onToggle={open => this.toggle(open)}>
          <LayoutSidebar>
            <Nav
              selectedId={component}
              onItemClick={this.handleItemClick}
              width={280}
              indent={40}
            >
              {components.map(item => {
                if (!item.components) {
                  return this.renderNavItem(item, 'outside')
                }
                return (
                  <SubNav key={item.name} title={item.cn} defaultOpen>
                    {item.components.map(itemGroup => {
                      if (itemGroup.group) {
                        return this.renderNavItemGroup(itemGroup)
                      }
                      return this.renderNavItem(itemGroup)
                    })}
                  </SubNav>
                )
              })}
            </Nav>
          </LayoutSidebar>
          <LayoutContent>
            {component && this.renderTitle(component)}
            {children}
          </LayoutContent>
        </Layout>
      </div>
    )
  }
}

Components.propTypes = {
  children: PropTypes.node,
  '*': PropTypes.string
}

export default Components
