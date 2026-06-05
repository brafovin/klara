import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') localStorage.removeItem('token')
    }
    return Promise.reject(error)
  }
)

export const productApi = {
  getAll: (params?: Record<string, string | number>) => api.get('/products', { params }),
  getBySlug: (slug: string) => api.get(`/products/${slug}`),
  getFeatured: () => api.get('/products/featured'),
}

export const authApi = {
  login: (data: { email: string; password: string }) => api.post('/auth/login', data),
  register: (data: { name: string; email: string; password: string }) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  getWishlist: () => api.get('/auth/wishlist'),
  toggleWishlist: (productId: string) => api.post(`/auth/wishlist/${productId}`),
}

export const orderApi = {
  create: (data: Record<string, unknown>) => api.post('/orders', data),
  getById: (id: string) => api.get(`/orders/${id}`),
  getMyOrders: () => api.get('/orders/my'),
  validateCoupon: (data: { code: string; orderTotal: number }) => api.post('/orders/validate-coupon', data),
}

export const paymentApi = {
  createStripeIntent: (orderId: string) => api.post('/payments/stripe/create-intent', { orderId }),
  updatePayment: (data: Record<string, unknown>) => api.post('/payments/update', data),
}

export const reviewApi = {
  getForProduct: (productId: string) => api.get(`/reviews/${productId}`),
  create: (productId: string, data: Record<string, unknown>) => api.post(`/reviews/${productId}`, data),
}

export const adminApi = {
  getDashboard: () => api.get('/admin/dashboard'),
  getOrders: (params?: Record<string, string | number>) => api.get('/admin/orders', { params }),
  updateOrderStatus: (id: string, data: Record<string, string>) => api.put(`/admin/orders/${id}`, data),
  getUsers: () => api.get('/admin/users'),
  getCoupons: () => api.get('/admin/coupons'),
  createCoupon: (data: Record<string, unknown>) => api.post('/admin/coupons', data),
}

export default api
