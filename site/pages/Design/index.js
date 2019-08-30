import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Nav, NavItem } from 'earth-ui/lib/Nav'
import { Layout, LayoutSidebar, LayoutContent } from 'widgets/Layout'
import Markdown from 'widgets/Markdown'
import components from './navitems.json'

let renderMarkdown = md => {
  return <Markdown html={md.type} />
}

class Components extends Component {
  constructor () {
    super()
    this.componentsMap = {}
    this.state = {
      open: false
    }
  }

  toggle (open) {
    this.setState({ open })
  }

  render () {
    let { open } = this.state
    let { children } = this.props
    return (
      <Layout open={open} onToggle={open => this.toggle(open)}>
        <LayoutSidebar>
          <Nav href="/design" onItemClick={() => this.toggle(false)}>
            {components.map((item, i) => (
              item.components.length
                ? <NavItem
                  key={item.category}
                  title={item.cn}
                  defaultOpen
                >
                  {item.components.map((component, i) => {
                    this.componentsMap[component.name] = component
                    return (
                      <NavItem
                        key={component.name}
                        href={component.name}
                        title={component.cn}
                      />
                    )
                  })}
                </NavItem>
                : <NavItem
                  key={item.category}
                  href={item.category}
                  title={item.cn}
                />
            ))}
          </Nav>
        </LayoutSidebar>
        <LayoutContent>
          {renderMarkdown(children)}
        </LayoutContent>
      </Layout>
    )
  }
}

Components.propTypes = {
  children: PropTypes.node
}

export default Components
