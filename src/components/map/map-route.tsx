import { Directions } from '@/services/directions/types/directions'
import {
  GasStation,
  GetGasStationsResponse,
} from '@/services/gas-station/types/gas-station'
import { Coordinate } from '@/shared/types'
import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Marker, Polyline } from 'react-native-maps'
import MapBase from './map-base'
import { GasStationDetailsBottomSheet } from './ui/bottomSheet/bottom-sheet'
import { GasStationMarker } from './ui/markers/gas-station-marker'

interface MapWithRouteProps {
  routeData: Directions | undefined
  getGasStationsResponseData: GetGasStationsResponse | undefined
  isRoutePending: boolean
  isGasStationsPending: boolean
  selectedRouteId: string | null
  handleRouteClick: (routeIndex: number) => void
  selectedProviders: string[]
  cart: GasStation[]
  handleAddToCart: (station: GasStation) => void
  handleRemoveFromCart: (stationId: string) => void
  handleUpdateRefillLiters: (stationId: string, liters: number) => void
}

export const MapWithRoute: React.FC<MapWithRouteProps> = ({
  routeData,
  getGasStationsResponseData,
  isRoutePending,
  isGasStationsPending,
  selectedRouteId,
  handleRouteClick,
  selectedProviders,
  cart,
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateRefillLiters,
}) => {
  const [mainRoute, setMainRoute] = useState<Coordinate[]>([])
  const [alternativeRoutes, setAlternativeRoutes] = useState<Coordinate[][]>([])
  const [routeIndexMapping, setRouteIndexMapping] = useState<number[]>([])
  const [isMapReady, setMapReady] = useState(false)
  const [selectedStationForBottomSheet, setSelectedStationForBottomSheet] =
    useState<GasStation | null>(null)

  // Filter gas stations by selected route and providers
  const filteredGasStations = useMemo(() => {
    if (!getGasStationsResponseData?.fuelStations) return []
    return getGasStationsResponseData.fuelStations.filter((station) => {
      return station.roadSectionId === selectedRouteId
    })
  }, [
    getGasStationsResponseData?.fuelStations,
    selectedRouteId,
    selectedProviders,
  ])

  // Handle routes
  useEffect(() => {
    if (!routeData?.route || routeData.route.length === 0) return
    try {
      // Convert [number, number][] to Coordinate[]
      const allShapes = routeData.route.map((route) =>
        route.mapPoints.map(([lat, lng]) => ({
          latitude: lat,
          longitude: lng,
        })),
      )
      if (allShapes.length > 0) {
        setMainRoute([...allShapes[0]])
        setAlternativeRoutes(
          allShapes.length > 1 ? [...allShapes.slice(1)] : [],
        )
        setRouteIndexMapping(allShapes.map((_, index) => index))
      }
    } catch (error) {
      console.error('Error processing route data:', error)
    }
  }, [routeData])

  const handleAltRouteClick = (index: number) => {
    const currentMainRoute = [...mainRoute]
    const currentMainRouteIndex = routeIndexMapping[0]
    const selectedRouteOriginalIndex = routeIndexMapping[index + 1]

    setMainRoute(alternativeRoutes[index])
    setAlternativeRoutes((prevRoutes) => {
      const newAlts = [...prevRoutes]
      newAlts.splice(index, 1)
      return [currentMainRoute, ...newAlts]
    })
    setRouteIndexMapping((prevMapping) => {
      const newMapping = [...prevMapping]
      newMapping.splice(index + 1, 1)
      newMapping.unshift(selectedRouteOriginalIndex)
      return newMapping
    })
    setSelectedStationForBottomSheet(null)
    return selectedRouteOriginalIndex
  }

  useEffect(() => {
    if (routeIndexMapping.length > 0) {
      const selectedRouteOriginalIndex = routeIndexMapping[0]
      handleRouteClick(selectedRouteOriginalIndex)
    }
  }, [routeIndexMapping, handleRouteClick])

  const handleGasStationMarkerPress = (station: GasStation) => {
    setSelectedStationForBottomSheet(station)
  }

  // Function called when BottomSheet closes
  const handleBottomSheetClose = () => {
    setSelectedStationForBottomSheet(null)
  }

  // ! Idk how to deal with map not being able to render anything after switching tabs and coming back

  return (
    <View style={styles.container}>
      {(isRoutePending || isGasStationsPending) && (
        <View className="absolute inset-0 bg-white/70 items-center justify-center z-50">
          <ActivityIndicator size="large" color="#4964D8" />
        </View>
      )}
      <MapBase
        setMapReady={setMapReady}
        enableBottomSheet
        bottomSheetContent={
          <GasStationDetailsBottomSheet
            station={selectedStationForBottomSheet}
            cart={cart}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
            handleUpdateRefillLiters={handleUpdateRefillLiters}
            routeData={routeData}
            selectedRouteId={selectedRouteId}
            onGasStationClick={handleGasStationMarkerPress}
          />
        }
        onBottomSheetClose={handleBottomSheetClose}>
        {/* Main route */}
        {mainRoute.length > 1 && (
          <Polyline
            coordinates={mainRoute}
            strokeWidth={4}
            strokeColor="#4964D8"
            tappable
            onPress={() => handleRouteClick(routeIndexMapping[0])}
            geodesic={true}
          />
        )}
        {/* Alternative routes */}
        {alternativeRoutes.map((route, index) => (
          <Polyline
            key={`alt-route-${index}`}
            coordinates={route}
            strokeWidth={3}
            strokeColor="#9BA9BB"
            tappable
            onPress={() => handleAltRouteClick(index)}
            geodesic={true}
          />
        ))}
        {/* Gas station markers */}
        {filteredGasStations.map((station) => (
          <Marker
            key={station.id}
            coordinate={{
              latitude: station.position.lat,
              longitude: station.position.lng,
            }}
            anchor={{ x: 0.5, y: 1 }}
            onPress={() => handleGasStationMarkerPress(station)}
            zIndex={station.isAlgorithm ? 2 : 1}>
            <GasStationMarker station={station} />
          </Marker>
        ))}
      </MapBase>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    height: 300,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
  },
  markerPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#192A3E',
    marginTop: 4,
    fontFamily: 'Nunito-Bold',
  },
})
