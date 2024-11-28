import React from 'react'
import { Badge } from 'react-bootstrap'
import { Tag } from '../types/BortakvallAPI.types'


interface ProductTagsProps {
    tags: Tag[]

}


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

    return (
        <div>
            {tags && tags.length > 0 ? (
                tags.map((tag) => (

                        <Badge
                            key={tag.id}
                            bg={getBadgeVariant(tag.name)}
                            className="m-1"
                            style={{ cursor: 'pointer' }}
                            //onClick={() => onTagClick(tag.id)}
                        >
                            {tag.name}
                        </Badge>

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
