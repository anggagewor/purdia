/**
 * Catalog API Service (Products, Categories, Brands)
 */
import { get, post, del } from '@/lib/http'
import type {
  Product,
  ProductPayload,
  Category,
  CategoryPayload,
  Brand,
  BrandPayload,
} from './types'

export const productsApi = {
  list(
    tenantId: number,
    params?: {
      search?: string
      category_id?: number
      brand_id?: number
      type?: string
      per_page?: number
    },
  ) {
    return get<Product[]>('/catalog/products', {
      params,
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  create(tenantId: number, payload: ProductPayload) {
    return post<Product>('/catalog/products', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  detail(tenantId: number, productId: number) {
    return get<Product>(`/catalog/products/${productId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  remove(tenantId: number, productId: number) {
    return del(`/catalog/products/${productId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}

export const categoriesApi = {
  list(tenantId: number) {
    return get<Category[]>('/catalog/categories', {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  create(tenantId: number, payload: CategoryPayload) {
    return post<Category>('/catalog/categories', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  detail(tenantId: number, categoryId: number) {
    return get<Category>(`/catalog/categories/${categoryId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  remove(tenantId: number, categoryId: number) {
    return del(`/catalog/categories/${categoryId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}

export const brandsApi = {
  list(tenantId: number) {
    return get<Brand[]>('/catalog/brands', {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  create(tenantId: number, payload: BrandPayload) {
    return post<Brand>('/catalog/brands', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  detail(tenantId: number, brandId: number) {
    return get<Brand>(`/catalog/brands/${brandId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  remove(tenantId: number, brandId: number) {
    return del(`/catalog/brands/${brandId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}
