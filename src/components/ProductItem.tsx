import { Card, Button } from 'react-bootstrap'
import {
    MdAddShoppingCart,
    MdRemove,
    MdRemoveShoppingCart
} from 'react-icons/md'
import { Product, CartItems } from '../types/BortakvallAPI.types.ts'
import { BASE_URL } from '../utils/Utils.tsx'
import { useLocalStorage } from 'usehooks-ts'
import ProductDetailModal from './ProductDetailModal'
import { useState } from 'react'
import ProductTags from './ProductTags.tsx'

import {
    addOrUpdateProduct,
    removeProductQuantity,
    removeProductCompletely
} from '../utils/CartUtils.tsx'

interface ProductProps {
    product: Product
}

const ProductItem: React.FC<ProductProps> = ({ product }) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItems>('cart', {})
    const [showDetailModal, setShowDetailModal] = useState(false)

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

    return (
        <>
            <Card className="card shop-item" style={{ width: '18rem' }}>
                <Card.Img
                    className="thumb"
                    variant="top"
                    src={`${BASE_URL}${product.images.thumbnail}`}
                />
                <Card.Body className="price">
                    <Card.Text className="title">{product.name}</Card.Text>
                    <div className="desc">
                        <ProductTags tags={product.tags} />
                        {/*renderTags()*/}
                    </div>

                    <Card.Text>{product.price.toFixed(2)}</Card.Text>
                    <Button
                        variant="link"
                        onClick={() => setShowDetailModal(true)}
                    >
                        Read More
                    </Button>
                    <div className="button-group">
                        <Button
                            className="btn add-btn"
                            variant="link"
                            onClick={() => handleAddProduct(product, 1)}
                        >
                            <MdAddShoppingCart />
                        </Button>
                        {cartItems[product.id]?.quantity > 0 && (
                            <Button
                                variant="link"
                                className="btn quantity-btn"
                                onClick={() =>
                                    handleRemoveQuantity(product.id, 1)
                                }
                            >
                                <Card.Text>
                                    {cartItems[product.id]?.quantity}
                                </Card.Text>
                                <MdRemove />
                            </Button>
                        )}
                        {cartItems[product.id]?.quantity > 0 && (
                            <Button
                                variant="link"
                                className="btn remove-btn"
                                onClick={() => handleRemoveProduct(product.id)}
                            >
                                <MdRemoveShoppingCart />
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
            <ProductDetailModal
                productId={product.id}
                show={showDetailModal}
                onHide={() => setShowDetailModal(false)}
            />
        </>
    )
}

export default ProductItem
