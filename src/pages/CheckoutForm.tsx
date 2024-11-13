import React, { useState } from 'react'
import { submitOrder } from '../services/BortakvallAPI'
import { OrderRequest, OrderResponse } from '../types/BortakvallAPI.types'
import { CartItems } from '../types/BortakvallAPI.types'
import { useLocalStorage } from 'usehooks-ts'
import '../assets/scss/Form.scss'
export const CheckoutForm: React.FC = () => {
    const [cartItems, setCartItems] = useLocalStorage<CartItems>('cart', {})

    const [formData, setFormData] = useState({
        firstName: 'Dummy',
        lastName: 'Dummy',
        address: 'Dummy',
        postcode: '0123',
        city: 'Dummy',
        email: 'dummy@dummy.com',
        phone: '0123'
    })
    const [orderSuccess, setOrderSuccess] = useState<OrderResponse | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleOrder = async () => {
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
            const response = await submitOrder(orderRequest)
            setOrderSuccess(response)
            localStorage.removeItem('cart') // Clear cart after successful order
        } catch (e) {
            setError('Failed to place order. Please try again.')
        }
    }

    if (orderSuccess) {
        console.log(orderSuccess)
        return (
            <div>
                Thank you for your order! Order Number: {orderSuccess.data.id}
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
                defaultValue="Dummy"
                onChange={handleChange}
            />
            <input
                name="lastName"
                placeholder="Last Name"
                defaultValue="Dummy"
                onChange={handleChange}
            />
            <input
                name="address"
                placeholder="Address"
                defaultValue="Dummy"
                onChange={handleChange}
            />
            <input
                name="postcode"
                placeholder="Postcode"
                defaultValue="0123"
                onChange={handleChange}
            />
            <input
                name="city"
                placeholder="City"
                defaultValue="Dummy"
                onChange={handleChange}
            />
            <input
                name="email"
                placeholder="Email"
                defaultValue="dummy@dummy.com"
                onChange={handleChange}
                type="email"
            />
            <input
                name="phone"
                placeholder="Phone (optional)"
                defaultValue="0123"
                onChange={handleChange}
            />
            <button onClick={handleOrder}>Place Order</button>
        </div>
    )
}
