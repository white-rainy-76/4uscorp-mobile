import { RouteForm } from '@/components/forms/route-form/route-form'
import { useRouteFormStore } from '@/components/forms/route-form/store/use-form-store'
import { FuelInfoCard } from '@/components/fuel/fuel-info-card'
import { MapWithRoute } from '@/components/map/map-route'
import { RouteList } from '@/components/route/route-list'
import { useGetDirectionsMutation } from '@/services/directions/get-direction.mutation'
import { GasStation } from '@/services/gas-station/types/gas-station'
import { useUpdateGasStationsMutation } from '@/services/gas-station/update-gas-station.mutation'
import { useSelfAssignRouteMutation } from '@/services/route/self-assign-route.mutation'
import { useTruck } from '@/shared/lib/hooks/use-truck'
import { useTruckStore } from '@/shared/store/truck-store'
import { useUserStore } from '@/shared/store/user-store'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function RouteScreen() {
  const { stats, isLoading } = useTruckStore()
  const { canAccessRoutes } = useUserStore()

  // Check page access
  useEffect(() => {
    if (!canAccessRoutes()) {
      router.replace('/(tabs)')
    }
  }, [canAccessRoutes])

  // If access is denied, don't render content
  if (!canAccessRoutes()) {
    return null
  }

  const [selectedProviders, setSelectedProviders] = useState<string[]>([])
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null)
  const [cart, setCart] = useState<GasStation[]>([])

  const { truck } = useTruck()
  const { origin, destination, truckWeight, finishFuel } = useRouteFormStore()

  const {
    mutateAsync: getDirections,
    data: directionsData,
    isPending: isDirectionsLoading,
    reset: resetRoute,
  } = useGetDirectionsMutation({
    onSuccess: (data) => {
      if (data?.routeId) {
        updateGasStations({
          routeId: data.routeId,
          routeSectionIds: data.route.map(
            (routeDto) => routeDto.routeSectionId,
          ),
          FinishFuel: finishFuel,
          ...(truckWeight &&
            Number(truckWeight) !== 0 && {
              Weight: Number(truckWeight),
            }),
          FuelProviderNameList: selectedProviders,
          CurrentFuel: stats?.fuelPercentage.toString(),
        })
      }
    },
    onError: (error) => {
      console.error('Directions mutation error:', error)
    },
  })

  const {
    mutateAsync: updateGasStations,
    data: gasStationsData,
    isPending: isGasStationsLoading,
  } = useUpdateGasStationsMutation({
    onError: (error) => {
      console.error('Gas stations mutation error:', error)
    },
  })

  const { mutateAsync: selfAssignRoute, isPending: isAssigning } =
    useSelfAssignRouteMutation({
      onSuccess: () => {
        console.log('Route assigned successfully')
      },
      onError: (error) => {
        console.error('Assign route error:', error)
      },
    })

  const handleSaveRoute = async () => {
    if (directionsData?.routeId && selectedRouteId) {
      try {
        if (!truck?.id) return
        await selfAssignRoute({
          routeId: directionsData.routeId,
          routeSectionId: selectedRouteId,
          truckId: truck?.id,
        })
        router.push('/')
      } catch (error) {
        console.error('Failed to assign route:', error)
      }
    }
  }

  // Handle route selection
  const handleRouteClick = (routeIndex: number) => {
    if (directionsData?.route && directionsData.route[routeIndex]) {
      setSelectedRouteId(directionsData.route[routeIndex].routeSectionId)
    }
  }

  // Request route when origin/destination changes
  useEffect(() => {
    console.log(origin.text)
    console.log(destination.text)
    if (!truck?.id || !origin.coords || !destination.coords) return
    getDirections({
      origin: origin.coords,
      destination: destination.coords,
      TruckId: truck?.id,
    })
  }, [truck?.id, origin, destination, getDirections, resetRoute])

  // Set initial selectedRouteId
  useEffect(() => {
    if (
      directionsData?.route &&
      directionsData.route.length > 0 &&
      !selectedRouteId
    ) {
      console.log(directionsData.route[0].routeSectionId)
      setSelectedRouteId(directionsData.route[0].routeSectionId)
    }
  }, [directionsData, selectedRouteId])

  // Update cart when gas station data changes
  useEffect(() => {
    if (!gasStationsData?.fuelStations || !selectedRouteId) return
    const newCart = gasStationsData.fuelStations.filter(
      (station) =>
        station.isAlgorithm && station.roadSectionId === selectedRouteId,
    )
    setCart(newCart)
  }, [gasStationsData?.fuelStations, selectedRouteId])

  // Cart handlers
  const handleAddToCart = async (station: GasStation) => {
    const newCart = [...cart, { ...station, refill: station.refill || '0' }]
    setCart(newCart)
    await updateGasStations({
      routeId: directionsData?.routeId || '',
      routeSectionIds: directionsData?.route.map((r) => r.routeSectionId) || [],
      requiredFuelStations: newCart.map((s) => ({
        stationId: s.id,
        refillLiters: Number(s.refill || 0),
      })),
      ...(truckWeight &&
        Number(truckWeight) !== 0 && {
          Weight: Number(truckWeight),
        }),
      FinishFuel: finishFuel,
      FuelProviderNameList: selectedProviders,
      CurrentFuel: stats?.fuelPercentage.toString(),
    })
  }

  const handleRemoveFromCart = async (stationId: string) => {
    const newCart = cart.filter((s) => s.id !== stationId)
    setCart(newCart)
    await updateGasStations({
      routeId: directionsData?.routeId || '',
      routeSectionIds: directionsData?.route.map((r) => r.routeSectionId) || [],
      requiredFuelStations: newCart.map((s) => ({
        stationId: s.id,
        refillLiters: Number(s.refill || 0),
      })),
      ...(truckWeight &&
        Number(truckWeight) !== 0 && {
          Weight: Number(truckWeight),
        }),
      FinishFuel: finishFuel,
      FuelProviderNameList: selectedProviders,
      CurrentFuel: stats?.fuelPercentage.toString(),
    })
  }

  const handleUpdateRefillLiters = async (
    stationId: string,
    liters: number,
  ) => {
    const newCart = cart.map((s) =>
      s.id === stationId ? { ...s, refill: liters.toString() } : s,
    )
    setCart(newCart)
    await updateGasStations({
      routeId: directionsData?.routeId || '',
      routeSectionIds: directionsData?.route.map((r) => r.routeSectionId) || [],
      requiredFuelStations: newCart.map((s) => ({
        stationId: s.id,
        refillLiters: Number(s.refill || 0),
      })),
      ...(truckWeight &&
        Number(truckWeight) !== 0 && {
          Weight: Number(truckWeight),
        }),
      FinishFuel: finishFuel,
      FuelProviderNameList: selectedProviders,
      CurrentFuel: stats?.fuelPercentage.toString(),
    })
  }

  const handleFilterChange = async (providers: string[]) => {
    setSelectedProviders(providers)
    if (!directionsData?.routeId || !directionsData.route) return
    await updateGasStations({
      routeId: directionsData.routeId,
      routeSectionIds: directionsData.route.map((r) => r.routeSectionId),
      requiredFuelStations: cart.map((s) => ({
        stationId: s.id,
        refillLiters: Number(s.refill || 0),
      })),
      ...(truckWeight &&
        Number(truckWeight) !== 0 && {
          Weight: Number(truckWeight),
        }),
      FinishFuel: finishFuel,
      FuelProviderNameList: providers,
      CurrentFuel: stats?.fuelPercentage.toString(),
    })
  }

  return (
    <ScrollView
      className="flex-1 bg-[#ffffff]"
      keyboardShouldPersistTaps="handled">
      <View className="px-5 pt-5">
        <FuelInfoCard />
      </View>
      <RouteForm />
      <View style={styles.selectContainer}>
        {/* <Select
          options={FUEL_PROVIDERS}
          value={selectedProviders}
          onValueChange={handleFilterChange}
          placeholder="Fuel Providers"
          multiple
          style={styles.select}
        /> */}
      </View>
      <MapWithRoute
        routeData={directionsData}
        getGasStationsResponseData={gasStationsData}
        isRoutePending={isDirectionsLoading}
        isGasStationsPending={isGasStationsLoading}
        selectedRouteId={selectedRouteId}
        handleRouteClick={handleRouteClick}
        selectedProviders={selectedProviders}
        cart={cart}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleUpdateRefillLiters={handleUpdateRefillLiters}
      />
      {gasStationsData && (
        <View className="rounded-3xl border border-[#E1E5EA] bg-white mx-5 mt-5 px-5 py-4">
          <Text className="font-nunito font-bold text-sm leading-8 tracking-tighter text-[#192A3E] mb-6">
            Refueling Details
          </Text>
          <RouteList
            gasStations={gasStationsData.fuelStations}
            selectedRouteId={selectedRouteId}
          />
        </View>
      )}
      <View className="px-5 pb-5 pt-2.5">
        <TouchableOpacity
          className={`bg-[#4964D8] h-11 rounded-[22px] justify-center items-center w-full ${!directionsData?.routeId || !selectedRouteId || isAssigning ? 'opacity-60' : ''}`}
          onPress={handleSaveRoute}
          disabled={
            !directionsData?.routeId || !selectedRouteId || isAssigning
          }>
          <Text className="font-nunito font-medium text-base leading-6 text-center text-white">
            {isAssigning ? 'Saving...' : 'Save Route'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  selectContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  select: {
    width: '100%',
  },
})
