import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BASE_URL } from '../utils/Utils'
import { Product } from '../types/BortakvallAPI.types'
import BortakvallAPI from '../services/BortakvallAPI'
import { useQuery } from '@tanstack/react-query'
import '../assets/scss/detail.scss'

interface ProductDetailModalProps {
    productId: string
    show: boolean
    onHide: () => void
}

const fetchProduct = async (productId: string): Promise<Product> => {
    const data = await BortakvallAPI.getProductById(productId)
    return data
}

const decodeHtmlEntities = (text: string) => {
    const element = document.createElement('div')
    element.innerHTML = text
    return element.textContent || element.innerText || ''
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
    productId,
    show,
    onHide
}) => {
    const {
        data: product,
        isLoading,
        error
    } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProduct(productId),
        enabled: show,
        staleTime: 1000 * 60 * 5 
    })

    return (
        <Modal show={show} onHide={onHide} className="product-modal">
            <Modal.Header closeButton>
                <Modal.Title>{product?.name || 'Loading...'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error loading product details. Please try again.</p>
                ) : (
                    <div className="product-detail">
                        {product?.images?.large && (
                            <img
                                src={`${BASE_URL}${product.images.large}`}
                                alt={product.name}
                                className="img-fluid"
                            />
                        )}
                        <p className="product-description">
                            {decodeHtmlEntities(product?.description ?? '')}
                        </p>
                        <h5 className="product-price">{product?.price} SEK</h5>
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
