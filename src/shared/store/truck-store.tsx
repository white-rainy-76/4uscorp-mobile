import { create } from 'zustand'
import { TruckStatsUpdate } from '../types'

type TruckStore = {
  stats: TruckStatsUpdate | null
  isLoading: boolean
  setStats: (stats: TruckStatsUpdate | null) => void
  setIsLoading: (isLoading: boolean) => void
}

export const useTruckStore = create<TruckStore>((set) => ({
  stats: null,
  isLoading: true,
  setStats: (stats) => set({ stats }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))
