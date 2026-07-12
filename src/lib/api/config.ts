/**
 * Config API Service
 */
import { get, put, del } from '@/lib/http'
import type { ConfigItem, ConfigSetPayload, ConfigBulkPayload } from './types'

export const configApi = {
  listGroups() {
    return get<string[]>('/configs')
  },

  getGroup(group: string) {
    return get<ConfigItem[]>(`/configs/${group}`)
  },

  set(group: string, payload: ConfigSetPayload) {
    return put(`/configs/${group}`, payload)
  },

  bulkSet(group: string, payload: ConfigBulkPayload) {
    return put(`/configs/${group}/bulk`, payload)
  },

  remove(group: string, key: string) {
    return del(`/configs/${group}/${key}`)
  },
}
