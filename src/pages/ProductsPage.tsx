import BortakvallAPI from '../services/BortakvallAPI'
import { Product } from '../types/BortakvallAPI.types'
import ProductItem from '../components/ProductItem'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useQuery } from '@tanstack/react-query'
import RiseLoader from 'react-spinners/RiseLoader'

const ProductsPage = () => {
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: BortakvallAPI.getProducts
    })

    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center min-vh-100"
        >
            {isLoading && (
                <RiseLoader
                    color="#302a12"
                    cssOverride={{}}
                    loading
                    margin={3}
                    size={15}
                    speedMultiplier={2}
                />
            )}
            {products && (
                <Row className="gx-3 gy-2">
                    {products.map((product: Product, index: number) => (
                        <Col key={index} xs={8} lg={4} className="card-col">
                            <ProductItem key={index} product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default ProductsPage
