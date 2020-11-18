import  { useEffect } from 'react'
import CartItem from '../components/CartItem.tsx'
import ListGroup from 'react-bootstrap/ListGroup'
import { useLocalStorage } from 'usehooks-ts'
import { CartItems, Product } from '../types/BortakvallAPI.types.ts'
import { useNavigate, useLocation } from 'react-router-dom' // Import useLocation
import '../assets/scss/Cartlist.scss'

import {
    addOrUpdateProduct,
    removeProductQuantity,
    removeProductCompletely
} from '../utils/CartUtils.tsx'

const CartPage = () => {
    const [cartItems, setCartItems] = useLocalStorage<CartItems>('cart', {})

    const handleAddProduct = (product: Product, quantity: number) => {
        setCartItems((prevCartItems) =>
            addOrUpdateProduct(prevCartItems, product.id, product, quantity)
        )
    }

    const handleRemoveQuantity = (productId: string, quantity: number) => {
        setCartItems((prevCartItems) =>
            removeProductQuantity(prevCartItems, productId, quantity)
        )
    }

    const handleRemoveProduct = (productId: string) => {
        setCartItems((prevCartItems) =>
            removeProductCompletely(prevCartItems, productId)
        )
    }

    const totalPrice = Object.values(cartItems).reduce(
        (accumulator, item) => accumulator + item.product.price * item.quantity,
        0
    )

    const navigate = useNavigate() // Use history to navigate to the checkout page
    const location = useLocation() // Access the current location object

    // Scroll to top whenever the location (route) changes
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location]) // Dependency array includes 'location' to scroll to top on route change

    const handleCheckout = () => {
        if (Object.keys(cartItems).length > 0) {
            navigate('/checkout')
        } else {
            alert('Your cart is empty!')
        }
    }
    return (
        <>
            <h1 className="mb-3">Cart</h1>
            <ListGroup className="item-list">
                {Object.values(cartItems).map((product, index) => (
                    <CartItem
                        key={index}
                        product={product.product}
                        quantity={product.quantity}
                        handleAddProduct={handleAddProduct}
                        handleRemoveProduct={handleRemoveProduct}
                        handleRemoveQuantity={handleRemoveQuantity}
                    />
                ))}
            </ListGroup>
            <div className="total-container">
                Total:<span>{totalPrice}</span>
            </div>
            <button
                onClick={handleCheckout}
                disabled={Object.keys(cartItems).length === 0}
                className="checkout-btn"
            >
                Go to Checkout
            </button>
        </>
    )
}

export default CartPage
