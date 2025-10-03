import { Coordinate } from '@/shared/types'
import { create } from 'zustand'

interface RouteFormState {
  origin: {
    text: string
    coords: Coordinate | null
  }
  destination: {
    text: string
    coords: Coordinate | null
  }
  originName: string
  destinationName: string
  truckWeight: string
  finishFuel: number
  setOrigin: (text: string, coords: Coordinate | null) => void
  setDestination: (text: string, coords: Coordinate | null) => void
  setTruckWeight: (weight: string) => void
  setFinishFuel: (fuel: number) => void
}

export const useRouteFormStore = create<RouteFormState>((set) => ({
  origin: {
    text: '',
    coords: null,
  },
  destination: {
    text: '',
    coords: null,
  },
  originName: '',
  destinationName: '',
  truckWeight: '',
  finishFuel: 50,

  setOrigin: (text, coords) =>
    set((state) => ({
      ...state,
      origin: { text, coords },
    })),

  setDestination: (text, coords) =>
    set((state) => ({
      ...state,
      destination: { text, coords },
    })),

  setTruckWeight: (truckWeight) => set((state) => ({ ...state, truckWeight })),

  setFinishFuel: (finishFuel) => set((state) => ({ ...state, finishFuel })),
}))
