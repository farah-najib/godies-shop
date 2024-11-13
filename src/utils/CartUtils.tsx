import { CartItems, Product } from '../types/BortakvallAPI.types'
// Add or update a product in the cart
export const addOrUpdateProduct = (
    cartItems: CartItems,
    productId: string,
    product: Product,
    quantity: number
): CartItems => {
    return {
        ...cartItems,
        [productId]: {
            product,
            quantity: (cartItems[productId]?.quantity || 0) + quantity
        }
    }
}

// Remove a specific quantity of a product or remove it entirely if quantity reaches zero
export const removeProductQuantity = (
    cartItems: CartItems,
    productId: string,
    quantity: number
): CartItems => {
    const existingProduct = cartItems[productId]
    if (!existingProduct) return cartItems

    const newQuantity = existingProduct.quantity - quantity
    if (newQuantity > 0) {
        // Update quantity if it's greater than zero
        return {
            ...cartItems,
            [productId]: {
                ...existingProduct,
                quantity: newQuantity
            }
        }
    } else {
        // Remove product from the cart entirely
        const { [productId]: _, ...remainingItems } = cartItems
        return remainingItems
    }
}

// Completely remove a product from the cart
export const removeProductCompletely = (
    cartItems: CartItems,
    productId: string
): CartItems => {
    const { [productId]: _, ...remainingItems } = cartItems
    return remainingItems
}
