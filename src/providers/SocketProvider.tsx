import { connectionContext } from '@/shared/context/socket-context'
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr'
import React, { ReactNode, useEffect, useRef, useState } from 'react'

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [connection, setConnection] = useState<HubConnection | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const connectionRef = useRef<HubConnection | null>(null)

  const serverUrl = 'https://foruscorp.net:5011'

  useEffect(() => {
    const connect = async () => {
      if (
        connectionRef.current &&
        connectionRef.current.state === HubConnectionState.Connected
      ) {
        setIsConnected(true)
        return
      }

      const newConnection = new HubConnectionBuilder()
        .withUrl(`${serverUrl}/truckstracking-api/truck-tracking`, {
          transport: HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect()
        .build()

      connectionRef.current = newConnection
      setConnection(newConnection)

      newConnection.onclose((error) => {
        setIsConnected(false)
        console.warn('SignalR connection closed:', error)
      })

      newConnection.onreconnecting((error) => {
        setIsConnected(false)
        console.info('SignalR connection reconnecting...', error)
      })

      newConnection.onreconnected((connectionId) => {
        setIsConnected(true)
        console.log('SignalR reconnected. Connection ID:', connectionId)
      })

      try {
        await newConnection.start()
        setIsConnected(true)
        console.log('SignalR connection started successfully!')
      } catch (err) {
        setIsConnected(false)
        console.error('Error while starting SignalR connection:', err)
      }
    }

    connect()

    return () => {
      if (
        connectionRef.current &&
        connectionRef.current.state !== HubConnectionState.Disconnected
      ) {
        console.log('Stopping SignalR connection...')
        connectionRef.current.stop()
      }
    }
  }, [serverUrl])

  return (
    <connectionContext.Provider value={{ connection: connection, isConnected }}>
      {children}
    </connectionContext.Provider>
  )
}
