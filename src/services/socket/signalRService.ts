import { TruckStatsUpdate } from '@/shared/types'
import { HubConnection } from '@microsoft/signalr'

type TruckStatsUpdateCallback = (update: TruckStatsUpdate) => void

class SignalRService {
  private connection: HubConnection | null = null
  // { [truckId: string]: Set<TruckStatsUpdateCallback> }
  private listeners: { [truckId: string]: Set<TruckStatsUpdateCallback> } = {}

  // Method for setting connection from outside (from SocketProvider)
  public setConnection(connection: HubConnection): void {
    if (this.connection === connection) {
      return
    }
    this.connection = connection

    if (this.connection) {
      // Register ONE handler for all stats updates
      this.connection.on(
        'ReceiveTruckStatsUpdate',
        (update: TruckStatsUpdate) => {
          const subs = this.listeners[update.truckId]
          if (subs) {
            subs.forEach((cb) => cb(update))
          }
        },
      )
      // console.log(
      //   'SignalRService: Connection set. Listener for TruckStatsUpdate registered.',
      // )
    }
  }

  // Subscribe to stats updates for specific truck
  public async subscribe(
    truckId: string,
    callback: TruckStatsUpdateCallback,
  ): Promise<void> {
    if (!this.connection) {
      // console.warn(
      //   'SignalRService: Connection is not yet established. Cannot subscribe to truck stats updates.',
      // )
      return
    }

    if (!this.listeners[truckId]) {
      this.listeners[truckId] = new Set()
      // Server will add us to group for this truckId
      try {
        await this.connection.invoke('JoinTruckGroup', truckId)
        // console.log(`SignalRService: Joined truck group ${truckId}`)
      } catch (error) {
        // console.error(
        //   `SignalRService: Error joining truck group ${truckId}:`,
        //   error,
        // )
        // If error occurred, maybe should delete created Set
        delete this.listeners[truckId]
        return
      }
    }
    this.listeners[truckId].add(callback)
    // console.log(
    //   `SignalRService: Subscribed a callback to truck ${truckId} stats updates.`,
    // )
  }

  // Unsubscribe from stats updates
  public async unsubscribe(
    truckId: string,
    callback: TruckStatsUpdateCallback,
  ): Promise<void> {
    const subs = this.listeners[truckId]
    if (!subs) return

    subs.delete(callback)
    // console.log(
    //   `SignalRService: Unsubscribed a callback from truck ${truckId} stats updates. Remaining: ${subs.size}`,
    // )

    if (subs.size === 0) {
      delete this.listeners[truckId]
      // Server will remove us from group
      try {
        await this.connection?.invoke('LeaveTruckGroup', truckId)
        // console.log(`SignalRService: Left truck group ${truckId}`)
      } catch (error) {
        // console.error(
        //   `SignalRService: Error leaving truck group ${truckId}:`,
        //   error,
        // )
      }
    }
  }
}

export default new SignalRService()
