import { Truck } from '@/services/truck/types/truck'
import { useEffect, useState } from 'react'
import { getItem } from '../storage'

export const useTruck = () => {
  const [truck, setTruck] = useState<Truck | undefined>()

  useEffect(() => {
    const loadTruck = async () => {
      try {
        const storedTruck = getItem<Truck>('truckData')
        if (storedTruck) {
          setTruck(storedTruck)
        } else {
          console.log('No truck found in MMKV.')
        }
      } catch (e) {
        console.error('Failed to load truck from MMKV:', e)
      }
    }
    loadTruck()
  }, [])

  return { truck }
}
