/**
 * Documents (Numbering Engine) API Service
 */
import { get, post } from '@/lib/http'
import type { Sequence, SequencePayload, GeneratedDocument } from './types'

export const documentsApi = {
  listSequences(tenantId: number) {
    return get<Sequence[]>('/documents/sequences', {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  createSequence(tenantId: number, payload: SequencePayload) {
    return post<Sequence>('/documents/sequences', payload, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  sequenceDetail(tenantId: number, sequenceId: number) {
    return get<Sequence>(`/documents/sequences/${sequenceId}`, {
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },

  generate(tenantId: number, type: string, branchId?: number) {
    return post<GeneratedDocument>(
      '/documents/generate',
      { type, branch_id: branchId },
      {
        headers: { 'X-Tenant-Id': String(tenantId) },
      },
    )
  },

  preview(tenantId: number, type: string, branchId?: number) {
    return get<GeneratedDocument>('/documents/preview', {
      params: { type, branch_id: branchId },
      headers: { 'X-Tenant-Id': String(tenantId) },
    })
  },
}
