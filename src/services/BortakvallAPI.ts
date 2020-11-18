import axios from 'axios'
import type {
    ApiResponse,
    Product,
    OrderRequest,
    OrderResponse,
    Tag
} from '../types/BortakvallAPI.types'
import { BASE_URL, FAKE_DELAY, USER_ID } from '../utils/Utils'
console.log(BASE_URL)
// Create axios instance
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

// Generic GET function with support for ApiResponse<T>
const get = async <T>(endpoint: string): Promise<T> => {
    const response = await axiosInstance().get<ApiResponse<T>>(endpoint)
    if (FAKE_DELAY) {
        await new Promise((r) => setTimeout(r, FAKE_DELAY))
    }
    return response.data.data
}

// Generic POST function with type parameters for response and payload
const post = async <Response, Payload>(
    endpoint: string,
    data: Payload
): Promise<Response> => {
    const response = await axiosInstance().post<Response>(endpoint, data)
    return response.data
}

// API functions
export const getProducts = async (): Promise<Product[]> => {
    return get<Product[]>('/api/v2/products')
}

export const getProductById = async (productId: string): Promise<Product> => {
    return get<Product>(`/api/v2/products/${productId}`)
}

export const getTags = async (): Promise<Tag[]> => {
    return get<Tag[]>('/api/v2/tags')
}

export const getTagById = async (tagId: string): Promise<Product[]> => {
    return get<Product[]>(`/api/v2/tags/${tagId}`)
}

export const submitOrder = async (
    orderData: OrderRequest
): Promise<ApiResponse<OrderResponse>> => {
    return post<ApiResponse<OrderResponse>, OrderRequest>(
        `/api/v2/users/${USER_ID}/orders`,
        orderData
    )
}

export default {
    getProducts,
    getProductById,
    getTags,
    getTagById,
    submitOrder
}
