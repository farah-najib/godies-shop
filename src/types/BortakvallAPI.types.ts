export type ApiResponse<T> = {
    status: string
    data: T
}

export type Product = {
    id: string
    name: string
    description: string
    price: number
    on_sale: boolean
    images: Images
    stock_status: string
    stock_quantity: number
    tags: Tag // tags: Tag[]
}

export type Images = {
    thumbnail: string
    large: string
}

export type Tag = {
    id: string
    name: string
    slug: string
}
// export type ProductsByTagId = {
//     id: string
//     name: string
//     slug: string
//     product: Product[]
// }


export type CartItems = {
    [productId: string]: { product: Product; quantity: number }
}

export type OrderRequest = {
    customer_first_name: string
    customer_last_name: string
    customer_address: string
    customer_postcode: string
    customer_city: string
    customer_email: string
    customer_phone?: string
    order_total: number
    order_items: {
        product_id: number
        qty: number
        item_price: number
        item_total: number
    }[]
}

export type OrderResponse = {
    order_number: string
    message: string
}
