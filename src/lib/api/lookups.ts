/**
 * Lookups & References API Service
 */
import { get } from '@/lib/http'
import type { LookupItem, Country, Currency, UnitCategory, UnitConversion } from './types'

export const lookupsApi = {
  /** Fetch multiple lookup types in one request */
  getMultiple(types: string[]) {
    return get<Record<string, LookupItem[]>>('/lookups', {
      params: { types: types.join(',') },
    })
  },

  /** Fetch a single lookup type */
  getSingle(type: string) {
    return get<LookupItem[]>(`/lookups/${type}`)
  },
}

export const referencesApi = {
  countries(params?: { region?: string; search?: string; active_only?: boolean }) {
    return get<Country[]>('/references/countries', { params })
  },

  countryDetail(id: number) {
    return get<Country>(`/references/countries/${id}`)
  },

  currencies(params?: { search?: string; active_only?: boolean }) {
    return get<Currency[]>('/references/currencies', { params })
  },

  currencyDetail(id: number) {
    return get<Currency>(`/references/currencies/${id}`)
  },

  units() {
    return get<UnitCategory[]>('/references/units')
  },

  unitsByCategory(category: string) {
    return get<UnitCategory>(`/references/units/${category}`)
  },

  convertUnit(from: string, to: string, value: number) {
    return get<UnitConversion>('/references/units/convert', {
      params: { from, to, value },
    })
  },
}
