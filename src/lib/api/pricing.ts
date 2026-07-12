/**
 * Pricing Engine API Service
 */
import { get, post } from '@/lib/http'
import type {
  PriceResolution,
  PriceResolvePayload,
  DiscountResult,
  DiscountApplyPayload,
  PriceList,
  PriceListPayload,
  Discount,
  DiscountPayload,
  Promotion,
  PromotionPayload,
} from './types'

export const pricingApi = {
  resolve(tenantId: number, payload: PriceResolvePayload) {
    return post<PriceResolution>('/pricing/resolve', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  applyDiscount(tenantId: number, payload: DiscountApplyPayload) {
    return post<DiscountResult>('/pricing/discount', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}

export const priceListsApi = {
  list(tenantId: number) {
    return get<PriceList[]>('/pricing/price-lists', {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  create(tenantId: number, payload: PriceListPayload) {
    return post<PriceList>('/pricing/price-lists', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}

export const discountsApi = {
  list(tenantId: number) {
    return get<Discount[]>('/pricing/discounts', {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  create(tenantId: number, payload: DiscountPayload) {
    return post<Discount>('/pricing/discounts', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}

export const promotionsApi = {
  list(tenantId: number) {
    return get<Promotion[]>('/pricing/promotions', {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  create(tenantId: number, payload: PromotionPayload) {
    return post<Promotion>('/pricing/promotions', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}
