import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound'
import ProductsPage from './pages/ProductsPage'
import './assets/scss/App.scss'
import CartPage from './pages/CartPage'
import { Navigation } from './components/Navigation'
import { CheckoutForm } from './pages/CheckoutForm'
import useTheme from './hooks/useTheme'
import ProducutByTags from './pages/ProducutByTags'

function App() {
    const { isDarkMode } = useTheme()
    return (
        <div id="App" className={isDarkMode ? 'bg-dark text-white' : ''}>
            <Navigation />
            <Container className="py-3">
                <Routes>
                    <Route path="/" element={<ProductsPage />} />
                    <Route
                        path="/products/tag/:tagId"
                        element={<ProducutByTags />}
                    />{' '}
                    {/* Route for products by tag */}
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutForm />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </div>
    )
}

export default App
