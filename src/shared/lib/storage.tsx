import { Dimensions, Platform } from 'react-native'
import { MMKV } from 'react-native-mmkv'

// Detect if device is tablet
const { width, height } = Dimensions.get('screen')
const isTablet = Math.min(width, height) >= 600

export const storage = new MMKV({
  id: `fouruscorp-storage-${isTablet ? 'tablet' : 'phone'}-${Platform.OS}`,
  encryptionKey: 'fouruscorp-secure-key',
})

export function getItem<T>(key: string): T | null {
  const value = storage.getString(key)
  const result = value ? JSON.parse(value) || null : null

  console.log(`Storage getItem: ${key}`, {
    deviceType: isTablet ? 'tablet' : 'phone',
    platform: Platform.OS,
    hasValue: !!result,
  })

  return result
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value))

  console.log(`Storage setItem: ${key}`, {
    deviceType: isTablet ? 'tablet' : 'phone',
    platform: Platform.OS,
    valueType: typeof value,
  })
}

export async function removeItem(key: string) {
  storage.delete(key)
}

// Utility for getting expoToken
export function getExpoToken(): string | null {
  return getItem<string>('expoToken')
}

// Utility for setting expoToken
export async function setExpoToken(token: string) {
  await setItem('expoToken', token)
}

// Utility for checking if device is registered
export function isDeviceRegistered(): boolean {
  return getItem<boolean>('deviceRegistered') || false
}

// Utility for setting device registration flag
export async function setDeviceRegistered(registered: boolean) {
  await setItem('deviceRegistered', registered)
}

// Utility for clearing device registration flag on logout
export async function clearDeviceRegistration() {
  await removeItem('deviceRegistered')
}

// Utility for clearing all storage data (reset app to first launch)
export async function clearAllStorage() {
  storage.clearAll()
  console.log('All storage data cleared - app will behave as first launch')
}
