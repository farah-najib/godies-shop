import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BASE_URL } from '../utils/Utils'
import { Product } from '../types/BortakvallAPI.types'
import BortakvallAPI from '../services/BortakvallAPI'
import '../assets/scss/detail.scss'

interface ProductDetailModalProps {
    productId: string
    show: boolean
    onHide: () => void
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
    productId,
    show,
    onHide
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [product, setProduct] = useState<Product | null>(null)

    const productCache = React.useRef<{ [key: string]: Product }>({})

    const getProduct = async () => {
        if (productCache.current[productId]) {
            setProduct(productCache.current[productId])
            return
        }
        try {
            setIsLoading(true)
            const data = await BortakvallAPI.getProductById(productId)
            productCache.current[productId] = data
            setProduct(data)
        } catch (error) {
            console.error('Error fetching product:', error)
        } finally {
            setIsLoading(false)
        }
    }
     const decodeHtmlEntities = (text: string) => {
         const element = document.createElement('div')
         element.innerHTML = text
         return element.textContent || element.innerText || ''
     }

    useEffect(() => {
        if (show) {
            getProduct()
        }
    }, [show, productId])

    return (
        <Modal show={show} onHide={onHide} className="product-modal">
            <Modal.Header closeButton>
                <Modal.Title>{product?.name || 'Loading...'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {product?.images?.large && (
                            <img
                                src={`${BASE_URL}${product.images.large}`}
                                alt={product.name}
                                className="img-fluid"
                            />
                        )}
                        <p>{decodeHtmlEntities(product?.description)}</p>
                        <h5>{product?.price} SEK</h5>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductDetailModal
