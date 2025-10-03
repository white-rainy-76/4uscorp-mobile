import { useEffect, useState } from 'react'
import { getItem } from '../storage'

export const useUserId = () => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)

  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedUserId = getItem<string>('userId')
        if (storedUserId) {
          setCurrentUserId(storedUserId)
          console.log('Loaded userId from MMKV:', storedUserId)
        } else {
          console.log('No userId found in MMKV.')
        }
      } catch (e) {
        console.error('Failed to load userId from MMKV:', e)
      }
    }
    loadUserId()
  }, [])

  return { currentUserId }
}
