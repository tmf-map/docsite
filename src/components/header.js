/** @jsx jsx */
import { jsx, Header, Container, Flex, useColorMode } from 'theme-ui'
import MenuButton from './menu-button'
import NavLink from './nav-link'
import Button from './button'

const modes = ['light', 'dark', 'deep', 'swiss']

export default ({ menuOpen, setMenuOpen, nav }) => {
  const [mode, setMode] = useColorMode()

  const cycleMode = e => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

  return (
    <Header
      sx={{
        flexShrink: 0,
        borderBottom: '1px solid #d4dadf',
        boxShadow: '0 3px 8px 0 rgba(116, 129, 141, 0.1)',
        bg: '#fff',
      }}>
      <Container>
        <Flex sx={{ justifyContent: 'space-between' }}>
          <Flex sx={{ alignItems: 'center' }}>
            <MenuButton
              onClick={e => {
                setMenuOpen(!menuOpen)
                if (!nav.current) return
                const navLink = nav.current.querySelector('a')
                if (navLink) navLink.focus()
              }}
            />
            <NavLink to="/">Theme UI</NavLink>
          </Flex>
          <Flex>
            <NavLink href="https://github.com/system-ui/theme-ui">
              GitHub
            </NavLink>
            <Button
              sx={{
                ml: 2,
              }}
              onClick={cycleMode}>
              {mode}
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Header>
  )
}
