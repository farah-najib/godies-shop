import React from 'react'
import { Badge } from 'react-bootstrap'
import { Tag } from '../types/BortakvallAPI.types'
import { Link } from 'react-router-dom'
// Define the props interface for the ProductTags component
interface ProductTagsProps {
    tags: Tag // Array of tags
    //onTagClick: (tagId: number) => void // Function that takes a tag ID and returns nothing
}

// Helper function to assign color variants based on the tag name
const getBadgeVariant = (tagName: string): string => {
    switch (tagName.toLowerCase()) {
        case 'gelatinfri':
            return 'success'
        case 'palmoljefri':
            return 'warning'
        case 'vegansk':
            return 'primary'
        case 'nyhet!':
            return 'danger'
        default:
            return 'info'
    }
}

const ProductTags: React.FC<ProductTagsProps> = ({ tags  }) => {
    //, onTagClick
    return (
        <div>
            {tags && tags.length > 0 ? (
                tags.map((tag) => (
                    <Link
                        key={tag.id} // Use tag id for unique key
                        to={`/products/tag/${tag.id}`} // Link to ProducutByTags with the tagId
                        style={{ textDecoration: 'none' }} // Optional, to remove default link styling
                    >
                        <Badge
                            key={tag.id}
                            bg={getBadgeVariant(tag.name)}
                            className="m-1"
                            style={{ cursor: 'pointer' }}
                            //onClick={() => onTagClick(tag.id)}
                        >
                            {tag.name}
                        </Badge>
                    </Link>
                ))
            ) : (
                <Badge bg="secondary" className="m-1">
                    No tags available
                </Badge>
            )}
        </div>
    )
}

export default ProductTags
