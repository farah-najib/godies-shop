import { useLocalStorage } from 'usehooks-ts'
import { CartItems } from '../types/BortakvallAPI.types'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { NavLink, Link } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

export const Navigation: React.FC = () => {
    const [cartItems] = useLocalStorage<CartItems>('cart', {})

    const productsCount: number = Object.keys(cartItems).length
    const { isDarkMode, toggleTheme } = useTheme()
    return (
        <Navbar bg="dark" variant="dark" expand="md" >
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Bortakväll
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} end to="/cart">
                            Cart{' '}
                            {productsCount > 0 && (
                                <Badge bg="primary">{productsCount}</Badge>
                            )}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Button variant="outline-secondary" onClick={toggleTheme}>
                    {isDarkMode ? '☀️' : '🌙'}
                </Button>
            </Container>
        </Navbar>
    )
}
