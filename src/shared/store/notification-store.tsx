import { create } from 'zustand'

interface NotificationStoreData {
  routeId?: string
  fuelPlanId?: string
  fuelPlanValidatorId?: string
  fuelRouteVersionId?: string
  title?: string
  message?: string
  address?: string
  distance?: number
  [key: string]: any
}

interface NotificationState {
  currentNotification: NotificationStoreData | null
  setNotification: (data: NotificationStoreData | null) => void
  clearNotification: () => void
}

export const useNotificationStore = create<NotificationState>((set) => ({
  currentNotification: null,
  setNotification: (data) => set({ currentNotification: data }),
  clearNotification: () => set({ currentNotification: null }),
}))
