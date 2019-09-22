/** @jsx jsx */
import { jsx } from 'theme-ui'
import { AccordionNav } from '@theme-ui/sidenav'
import NavLink from './nav-link'
import Sidebar from '../sidebar.mdx'

const components = {
  wrapper: AccordionNav,
  a: NavLink,
}

export default props => (
  <Sidebar
    {...props}
    components={components}
    sx={{
      width: 480,
      flex: 'none',
      pt: 40,
      pr: 20,
      pb: 60,
      pl: 200,
      mt: [64, 0],
    }}
  />
)
