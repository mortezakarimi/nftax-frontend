import {Container, Nav, Navbar} from 'react-bootstrap'
import {siteTitle} from './layout'
import {UsersService} from '../lib/services/users.service'

export default function Menu() {
  const handleLogout = async () => {
    await UsersService.logout()
  }

  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Container>
        <Navbar.Brand href='#home'>{siteTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/auth/login'>Login</Nav.Link>
            <Nav.Link href='#logout' onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
