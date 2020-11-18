import { CiCircleMinus, CiCirclePlus } from 'react-icons/ci'
import { MdDelete } from 'react-icons/md'

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Product } from '../types/BortakvallAPI.types.ts'

import { BASE_URL } from '../utils/Utils.tsx'
//import '../assets/scss/Cartlist.scss'

interface Props {
    product: Product
    quantity: number
    handleAddProduct: (product: Product, quantity: number) => void
    handleRemoveQuantity: (productId: string, quantity: number) => void
    handleRemoveProduct: (productId: string) => void
}
const CartItem: React.FC<Props> = ({
    product,
    quantity,
    handleAddProduct,
    handleRemoveProduct,
    handleRemoveQuantity
}) => {
    return (
        <ListGroup.Item className="item" key={product.name}>
            <img
                className="item-img"
                src={`${BASE_URL}${product.images.thumbnail}`}
            />

            <div className="item-info">
                <div className="item-name">{product.name}</div>
                <div className="price">
                    {product.price.toFixed(2)} * {quantity}
                </div>
                <div className="tags">tagname</div>
            </div>

            <Button
                variant="link"
                className="quantity-button"
                onClick={() => handleAddProduct(product, 1)}
            >
                <CiCirclePlus />
            </Button>
            <Button
                variant="link"
                className="quantity-button"
                onClick={() => handleRemoveQuantity(product.id, 1)}
            >
                <CiCircleMinus />
            </Button>

            <Button
                variant="link"
                className="quantity-button"
                onClick={() => handleRemoveProduct(product.id)}
            >
                <MdDelete />
            </Button>
        </ListGroup.Item>
    )
}
export default CartItem
