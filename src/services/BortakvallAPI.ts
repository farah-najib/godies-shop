import axios from 'axios'
import type {
    ApiResponse,
    Product,
    OrderRequest,
    OrderResponse
} from '../types/BortakvallAPI.types'
import { BASE_URL, FAKE_DELAY, USER_ID } from '../utils/Utils'

import products from '../data/products.json'
const axiosInstance = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        timeout: 10000
    })
}

const get = async (endpoint: string) => {
    if (endpoint == '/api/v2/products') {
        return products.data
    } else {
        const id = endpoint.split('/').pop()
        const allIds = products.data.map((product) => product.id.toString())
        const indexOfProduct = allIds.indexOf(id)
        return products.data[indexOfProduct]
    }

    //I should make this function more generic where the ApiResponse take <T> rather than <Product[]> butI noticed this when I start working to get products by tagId endpoint .
    const response = await axiosInstance().get<ApiResponse<Product[]>>(endpoint)
    if (FAKE_DELAY) {
        await new Promise((r) => setTimeout(r, FAKE_DELAY))
    }
    return response.data.data
}
const post = async <Response, Payload>(endpoint: string, data: Payload) => {
    const response = await axiosInstance().post<Response>(endpoint, data)
    return response.data
}

export const getProducts = async () => {
    return get('/api/v2/products')
}

export const getProductById = async (productId: string) => {
    return get(`/api/v2/products/${productId}`)
}

export const getTags = async () => {
    return get('/api/v2/tags')
}

export const getTagById = async (tagId: string) => {
    return get(`/api/v2/tags/${tagId}`)
}

export const submitOrder = async (
    orderData: OrderRequest
): Promise<OrderResponse> => {
    return post(`/api/v2/users/${USER_ID}/orders`, orderData)
}

export const getOrders = async () => {
    return get(`/api/v2/users/${USER_ID}/orders`)
}

export const getOrderById = async (orderId: string) => {
    return get(`/api/v2/users/${USER_ID}/orders/${orderId}`)
}

export default {
    getProducts,
    getProductById,
    getTags,
    getTagById,
    submitOrder,
    getOrders,
    getOrderById
}
