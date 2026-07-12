/**
 * Parties API Service
 */
import { get, post, del } from '@/lib/http'
import type { Party, PersonPayload, OrganizationPayload } from './types'

export const partiesApi = {
  list(
    tenantId: number,
    params?: { search?: string; type?: 'person' | 'organization'; role?: string },
  ) {
    return get<Party[]>('/parties', {
      params,
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  detail(tenantId: number, partyId: number) {
    return get<Party>(`/parties/${partyId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  remove(tenantId: number, partyId: number) {
    return del(`/parties/${partyId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  createPerson(tenantId: number, payload: PersonPayload) {
    return post<Party>('/parties/persons', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  createOrganization(tenantId: number, payload: OrganizationPayload) {
    return post<Party>('/parties/organizations', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}
