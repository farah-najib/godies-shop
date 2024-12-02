import { Card, Button } from 'react-bootstrap'
import { Badge } from 'react-bootstrap'
import {
    MdAddShoppingCart,
} from 'react-icons/md'
import { Product, CartItems} from '../types/BortakvallAPI.types.ts'
import { BASE_URL } from '../utils/Utils.tsx'
import { useLocalStorage } from 'usehooks-ts'
import ProductDetailModal from './ProductDetailModal'
import { useState } from 'react'
import ProductTags from './ProductTags.tsx'
import '../assets/scss/Card.scss'

import {
    addOrUpdateProduct,
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


    return (
        <>
            <Card className="card shop-item" style={{ width: '18rem' }}>
                <Card.Img
                    className="thumb"
                    variant="top"
                    src={`${BASE_URL}${product.images.thumbnail}`}
                />
                <Card.Body>
                    <Button
                            className="view-btn"
                            onClick={() => setShowDetailModal(true)}
                        >{product.name}</Button>
                    <div className="price">
                        <Card.Text>{product.price.toFixed(2)} SEK</Card.Text>

                    </div>
                    <hr />
                    <div className="desc">
                        <ProductTags tags={product.tags} />
                    </div>
                    <Button
                        className="btn add-btn"
                        variant="link"
                        onClick={() => handleAddProduct(product, 1)}
                    >
                        Add to cart
                        <Badge className="custom-badge ">
                            {cartItems[product.id]?.quantity}
                        </Badge>
                        <MdAddShoppingCart />
                    </Button>
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
