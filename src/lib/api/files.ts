/**
 * Files API Service
 */
import { get, del, post, upload } from '@/lib/http'
import type { FileRecord, FileAccessPayload } from './types'

export const filesApi = {
  upload(formData: FormData, onProgress?: (percent: number) => void) {
    return upload<FileRecord>('/files', formData, onProgress)
  },

  metadata(fileId: number) {
    return get<FileRecord>(`/files/${fileId}`)
  },

  remove(fileId: number) {
    return del(`/files/${fileId}`)
  },

  download(fileId: number) {
    // Use the http download helper for blob handling
    return import('@/lib/http').then((m) => m.download(`/files/${fileId}/download`))
  },

  grantAccess(fileId: number, payload: FileAccessPayload) {
    return post(`/files/${fileId}/access`, payload)
  },

  revokeAccess(fileId: number, payload: Omit<FileAccessPayload, 'access_level'>) {
    return del(`/files/${fileId}/access`, { data: payload })
  },

  byEntity(entityType: string, entityId: string) {
    return get<FileRecord[]>(`/files/entity/${entityType}/${entityId}`)
  },
}
