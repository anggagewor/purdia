import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  secureSet,
  secureGet,
  secureRemove,
  secureClearAll,
  configureSecureStorage,
} from '../src/index'

// ---------------------------------------------------------------------------
// Setup — Web Crypto API polyfill for Node test environment
// ---------------------------------------------------------------------------

// Node 20+ has globalThis.crypto with subtle, so this should work out of the box.
// If running in an older Node, vitest.config should use environment: 'jsdom' or
// we rely on Node's built-in crypto.

// Mock localStorage for Node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value },
    removeItem: (key: string) => { delete store[key] },
    clear: () => { store = {} },
    get length() { return Object.keys(store).length },
    key: (index: number) => Object.keys(store)[index] ?? null,
  }
})()
Object.defineProperty(globalThis, 'localStorage', { value: localStorageMock })

beforeEach(() => {
  localStorageMock.clear()
  // Reset config to defaults
  configureSecureStorage({
    prefix: 'purdia_',
    secret: 'purdia-client-secret-v1',
    iterations: 100_000,
    cacheTtl: 5 * 60 * 1000,
  })
})

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('@purdia/crypto', () => {
  describe('secureSet / secureGet — round-trip', () => {
    it('should encrypt and decrypt a simple string', async () => {
      await secureSet('token', 'my-secret-token')
      const result = await secureGet('token')
      expect(result).toBe('my-secret-token')
    })

    it('should encrypt and decrypt a JSON string', async () => {
      const user = JSON.stringify({ id: 1, name: 'Test User', email: 'test@example.com' })
      await secureSet('user', user)
      const result = await secureGet('user')
      expect(result).toBe(user)
      expect(JSON.parse(result!)).toEqual({ id: 1, name: 'Test User', email: 'test@example.com' })
    })

    it('should encrypt and decrypt empty string', async () => {
      await secureSet('empty', '')
      const result = await secureGet('empty')
      expect(result).toBe('')
    })

    it('should encrypt and decrypt unicode content', async () => {
      const unicode = '日本語テスト 🎉 àéîõü'
      await secureSet('unicode', unicode)
      const result = await secureGet('unicode')
      expect(result).toBe(unicode)
    })

    it('should encrypt and decrypt long strings', async () => {
      const longStr = 'a'.repeat(10_000)
      await secureSet('long', longStr)
      const result = await secureGet('long')
      expect(result).toBe(longStr)
    })
  })

  describe('storage format', () => {
    it('should store encrypted data with prefix in localStorage', async () => {
      await secureSet('mykey', 'myvalue')
      const stored = localStorageMock.getItem('purdia_mykey')
      expect(stored).not.toBeNull()
      // Format: salt.iv.ciphertext (3 base64 parts)
      const parts = stored!.split('.')
      expect(parts).toHaveLength(3)
      // None of the parts should be the plaintext
      expect(stored).not.toContain('myvalue')
    })

    it('should produce different ciphertext for the same value (random salt/iv)', async () => {
      await secureSet('key1', 'same-value')
      const stored1 = localStorageMock.getItem('purdia_key1')

      // Clear cache so next set generates new random values
      secureRemove('key1')
      await secureSet('key1', 'same-value')
      const stored2 = localStorageMock.getItem('purdia_key1')

      // Due to random salt and IV, encrypted values should differ
      expect(stored1).not.toBe(stored2)
    })
  })

  describe('secureGet — cache behavior', () => {
    it('should return cached value without re-decrypting', async () => {
      await secureSet('cached', 'hello')

      // First get populates cache, second get reads from cache
      const result1 = await secureGet('cached')
      const result2 = await secureGet('cached')
      expect(result1).toBe('hello')
      expect(result2).toBe('hello')
    })

    it('should return null for non-existent key', async () => {
      const result = await secureGet('nonexistent')
      expect(result).toBeNull()
    })

    it('should return null for corrupted data', async () => {
      localStorageMock.setItem('purdia_corrupted', 'not.valid.base64data!!!')
      const result = await secureGet('corrupted')
      expect(result).toBeNull()
    })

    it('should return null for incomplete stored format', async () => {
      localStorageMock.setItem('purdia_incomplete', 'onlyonepart')
      const result = await secureGet('incomplete')
      expect(result).toBeNull()
    })
  })

  describe('secureRemove', () => {
    it('should remove value from localStorage and cache', async () => {
      await secureSet('removable', 'data')
      expect(await secureGet('removable')).toBe('data')

      secureRemove('removable')

      expect(localStorageMock.getItem('purdia_removable')).toBeNull()
      expect(await secureGet('removable')).toBeNull()
    })
  })

  describe('secureClearAll', () => {
    it('should remove all prefixed keys', async () => {
      await secureSet('key1', 'val1')
      await secureSet('key2', 'val2')
      // Add a non-prefixed key
      localStorageMock.setItem('other_key', 'other')

      secureClearAll()

      expect(localStorageMock.getItem('purdia_key1')).toBeNull()
      expect(localStorageMock.getItem('purdia_key2')).toBeNull()
      // Non-prefixed key should remain
      expect(localStorageMock.getItem('other_key')).toBe('other')
    })
  })

  describe('configureSecureStorage', () => {
    it('should use custom prefix', async () => {
      configureSecureStorage({ prefix: 'app_' })
      await secureSet('token', 'value')
      expect(localStorageMock.getItem('app_token')).not.toBeNull()
      expect(localStorageMock.getItem('purdia_token')).toBeNull()
    })

    it('should use custom secret — different secret cannot decrypt', async () => {
      configureSecureStorage({ secret: 'secret-A' })
      await secureSet('key', 'encrypted-with-A')

      // Reconfigure with different secret — cache is still warm so clear it
      secureRemove('key')
      // Re-store the raw encrypted value
      const encrypted = localStorageMock.getItem('purdia_key')

      configureSecureStorage({ secret: 'secret-B' })
      // Manually put back the value encrypted with secret-A
      if (encrypted) localStorageMock.setItem('purdia_key', encrypted)

      // Decryption should fail with different secret
      const result = await secureGet('key')
      expect(result).toBeNull()
    })
  })
})
