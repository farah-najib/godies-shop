import BortakvallAPI from '../services/BortakvallAPI'
import { useParams } from 'react-router-dom'
import { Product} from '../types/BortakvallAPI.types'
import ProductItem from '../components/ProductItem'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { useQuery } from '@tanstack/react-query'
import RiseLoader from 'react-spinners/RiseLoader'



const ProducutByTags: React.FC = () => {
    //const { tagId } = useParams<{ tagId: string }>() // Get the tagId from the URL
      const { tagId } = useParams<{ tagId: string }>()

      // Since tagId is guaranteed to be a string, we use a type assertion
      const safeTagId = tagId as string
    const {
        data ,
        isLoading,
        error
    } = useQuery({
        queryKey: ['productsByTag', tagId],
        queryFn: () => BortakvallAPI.getTagById(safeTagId),
        enabled: !!tagId // Only run query if tagId is provided
    })

    if (error) return <div>Error loading products</div>


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
            {data && (
                <Row className="gx-3 gy-2">
                    {data.map((product: Product, index: number) => (
                        <Col key={index} xs={8} lg={4} className="card-col">
                            <ProductItem key={index} product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default ProducutByTags
