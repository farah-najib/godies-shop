import React, { useState } from 'react'
import { submitOrder } from '../services/BortakvallAPI'
import {
    OrderRequest,
    OrderResponse,
    ApiResponse,
    CartItems
} from '../types/BortakvallAPI.types'
import { useLocalStorage } from 'usehooks-ts'
import '../assets/scss/Form.scss'

export const CheckoutForm: React.FC = () => {
    const [cartItems, setCartItems] = useLocalStorage<CartItems>('cart', {})
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })
    const [orderSuccess, setOrderSuccess] = useState<OrderResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    const validateForm = () => {
        const { firstName, lastName, address, postcode, city, email } = formData
        return firstName && lastName && address && postcode && city && email
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleOrder = async () => {
        if (!validateForm()) {
            setError('Please fill in all required fields correctly.')
            return
        }

        const orderItems = Object.values(cartItems).map((item) => ({
            product_id: item.product.id,
            qty: item.quantity,
            item_price: item.product.price,
            item_total: item.product.price * item.quantity
        }))

        const totalPrice = Object.values(cartItems).reduce(
            (accumulator, item) =>
                accumulator + item.product.price * item.quantity,
            0
        )

        const orderRequest: OrderRequest = {
            customer_first_name: formData.firstName,
            customer_last_name: formData.lastName,
            customer_address: formData.address,
            customer_postcode: formData.postcode,
            customer_city: formData.city,
            customer_email: formData.email,
            customer_phone: formData.phone || undefined,
            order_total: totalPrice,
            order_items: orderItems
        }

        try {
            const response: ApiResponse<OrderResponse> = await submitOrder(
                orderRequest
            )

            if (response.status === 'success') {
                setOrderSuccess(response.data) // Access the actual OrderResponse data
                localStorage.removeItem('cart') // Clear cart after successful order

                // Force re-render by setting cartItems to an empty object
                setCartItems({}) // Reset cart in localStorage and force update
            } else {
                setError(
                    response.message ||
                        'Failed to place order. Please try again.'
                )
            }
        } catch (e) {
            console.error('Order submission error:', e)
            setError(
                'An error occurred while placing your order. Please try again.'
            )
        }
    }

    if (orderSuccess) {
        return (
            <div>
                <h2>Thank you for your order!</h2>
                <p>Order Number: {orderSuccess.id}</p>
                <p>Order Total: {orderSuccess.order_total} SEK</p>
            </div>
        )
    }

    return (
        <div className="checkout-form">
            <h2>Checkout</h2>
            {error && <p className="error">{error}</p>}
            <input
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
            />
            <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
            />
            <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
            />
            <input
                name="postcode"
                placeholder="Postcode"
                value={formData.postcode}
                onChange={handleChange}
            />
            <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
            />
            <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                type="email"
            />
            <input
                name="phone"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={handleChange}
            />
            <button onClick={handleOrder}>Place Order</button>
        </div>
    )
}