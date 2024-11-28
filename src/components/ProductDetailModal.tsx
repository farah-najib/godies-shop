import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { BASE_URL } from '../utils/Utils'
import { Product } from '../types/BortakvallAPI.types'
import BortakvallAPI from '../services/BortakvallAPI'
import { FaShareAlt } from 'react-icons/fa'
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
    const [isLoading, setIsLoading] = useState(true)
    const [product, setProduct] = useState<Product | null>(null)

    const getProduct = async () => {
        try {
            setIsLoading(true)
            const data = await BortakvallAPI.getProductById(productId)
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
    }) // Lägg till `show` som en dependency

    return (
        <Modal show={show} onHide={onHide} className="product-modal">
            <Modal.Header closeButton className="modal-header">
                <Modal.Title className="modal-title">
                    {product?.name || 'Loading...'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="product-detail">
                        {product?.images?.large && (
                            <img
                                src={`${BASE_URL}${product.images.large}`}
                                alt={product?.name}
                                className="img-fluid"
                            />
                        )}
                        <p className="product-description">
                            {decodeHtmlEntities(product?.description || '')}
                        </p>
                        <h5 className="product-price">{product?.price} SEK</h5>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <Button variant="primary" className="btn-share">
                    <FaShareAlt />
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ProductDetailModal
