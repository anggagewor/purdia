import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  secureSet,
  secureGet,
  secureRemove,
  secureClearAll,
  configureSecureStorage,
} from '../src/index'

// Mock localStorage for Node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
    get length() {
      return Object.keys(store).length
    },
    key: (index: number) => Object.keys(store)[index] ?? null,
  }
})()

// Mock Web Crypto API
const cryptoMock = {
  getRandomValues: <T extends ArrayBufferView>(array: T): T => {
    const bytes = array as unknown as Uint8Array
    for (let i = 0; i < bytes.length; i++) {
      bytes[i] = Math.floor(Math.random() * 256)
    }
    return array
  },
  subtle: {
    importKey: vi.fn().mockResolvedValue('mock-key-material'),
    deriveKey: vi.fn().mockResolvedValue('mock-derived-key'),
    encrypt: vi.fn().mockImplementation(async (_algo, _key, data: BufferSource) => {
      // Simple mock: just return the data as-is (no real encryption)
      const input = new Uint8Array(data as ArrayBuffer)
      return input.buffer
    }),
    decrypt: vi.fn().mockImplementation(async (_algo, _key, data: BufferSource) => {
      // Simple mock: just return the data as-is (no real decryption)
      const input = new Uint8Array(data as ArrayBuffer)
      return input.buffer
    }),
  },
}

describe('@purdia/crypto', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', localStorageMock)
    vi.stubGlobal('crypto', cryptoMock)
    localStorageMock.clear()
    configureSecureStorage({ prefix: 'test_' })
  })

  describe('secureSet + secureGet', () => {
    it('stores and retrieves a value', async () => {
      await secureSet('token', 'my-secret-token')
      const result = await secureGet('token')
      expect(result).toBe('my-secret-token')
    })

    it('returns null for non-existent key', async () => {
      const result = await secureGet('nonexistent')
      expect(result).toBeNull()
    })
  })

  describe('secureRemove', () => {
    it('removes a stored value', async () => {
      await secureSet('token', 'my-secret')
      secureRemove('token')
      // After cache is cleared by remove, need to check storage directly
      expect(localStorageMock.getItem('test_token')).toBeNull()
    })
  })

  describe('secureClearAll', () => {
    it('removes all prefixed items from localStorage', async () => {
      await secureSet('a', 'value-a')
      await secureSet('b', 'value-b')
      // Add a non-prefixed item
      localStorageMock.setItem('other_key', 'should-stay')

      secureClearAll()

      expect(localStorageMock.getItem('test_a')).toBeNull()
      expect(localStorageMock.getItem('test_b')).toBeNull()
      expect(localStorageMock.getItem('other_key')).toBe('should-stay')
    })
  })

  describe('configureSecureStorage', () => {
    it('changes the storage prefix', async () => {
      configureSecureStorage({ prefix: 'custom_' })
      await secureSet('key', 'value')
      expect(localStorageMock.getItem('custom_key')).not.toBeNull()
    })
  })
})
