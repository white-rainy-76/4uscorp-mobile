import { useTruckStore } from '@/shared/store/truck-store'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { LatLng, Marker, Polyline } from 'react-native-maps'
import MapBase from './map-base'

type TruckMapProps = {
  initialPath: LatLng[]
}

export const TruckMap = ({ initialPath = [] }: TruckMapProps) => {
  const [routePath, setRoutePath] = useState<LatLng[]>([])
  const [truckPosition, setTruckPosition] = useState<LatLng | null>(null)
  const [isMapReady, setMapReady] = useState(false)
  const { stats, isLoading } = useTruckStore()
  // ! Idk how to deal with map not being able to render anything after switching tabs and coming back

  useEffect(() => {
    if (stats) {
      const newPoint = {
        latitude: stats.latitude,
        longitude: stats.longitude,
      }
      setTruckPosition(newPoint)
      setRoutePath((prev) => [...prev, newPoint])
    }
  }, [stats])

  return (
    <View className="relative">
      <MapBase setMapReady={setMapReady}>
        {initialPath.length > 1 && (
          <Polyline
            coordinates={initialPath}
            strokeWidth={4}
            strokeColor="#3b82f6"
            geodesic
          />
        )}

        {routePath.length > 1 && (
          <Polyline
            coordinates={routePath}
            strokeWidth={4}
            strokeColor="#EF4444"
            geodesic={false}
          />
        )}

        {truckPosition && (
          <Marker coordinate={truckPosition} anchor={{ x: 0.5, y: 0.5 }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: '#22c55e',
                borderColor: '#fff',
                borderWidth: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
            />
          </Marker>
        )}
      </MapBase>

      {isLoading && (
        <View className="absolute inset-0 bg-white/70 items-center justify-center z-50">
          <ActivityIndicator size="large" color="#4964D8" />
        </View>
      )}
    </View>
  )
}
