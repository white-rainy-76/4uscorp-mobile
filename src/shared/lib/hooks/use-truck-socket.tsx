import signalRService from '@/services/socket/signalRService'
import { useConnection } from '@/shared/context/socket-context'
import { useTruckStore } from '@/shared/store/truck-store'
import { TruckStatsUpdate } from '@/shared/types'
import { useEffect } from 'react'

export const useTruckStats = (truckId: string | undefined) => {
  const { isConnected } = useConnection()
  const { setStats, setIsLoading } = useTruckStore()

  useEffect(() => {
    if (!isConnected || !truckId) {
      setStats(null)
      setIsLoading(true)
      return
    }

    const handleUpdate = (update: TruckStatsUpdate) => {
      setStats(update)
      setIsLoading(false)
    }

    signalRService.subscribe(truckId, handleUpdate)

    return () => {
      signalRService.unsubscribe(truckId, handleUpdate)
      setStats(null)
      setIsLoading(true)
    }
  }, [truckId, isConnected, setStats, setIsLoading])
}
