import { MapAssignedRoute } from '@/components/map/map-assigned-route'
import { AssignedRouteInfoCard } from '@/components/route-info-card/assigned-route-info-card'
import { RouteList } from '@/components/route/route-list'
import { UserProfileCard } from '@/components/user-profile-card/user-profile-card'
import { useGetAssignedRouteByTruckIdMutation } from '@/services/route/get-assigned-route-by-truck-id.mutation'
import { truckQueries } from '@/services/truck'
import { Truck } from '@/services/truck/types/truck'
// import { useOrientation } from '@/shared/lib/hooks/use-orientation'
import { useDebounce } from '@/shared/lib/hooks/use-debounce'
import { useTruckStats } from '@/shared/lib/hooks/use-truck-socket'
import { useUserId } from '@/shared/lib/hooks/use-user-id'
import { useTranslation } from '@/shared/lib/i18n'
import { removeItem, setItem } from '@/shared/lib/storage'
import { useTheme } from '@/shared/lib/theme'
import { useQuery } from '@tanstack/react-query'
import { useFocusEffect } from 'expo-router'
import { ScrollView } from 'moti'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

export default function ProfileScreen() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { currentUserId } = useUserId()
  // const { isTablet, isLandscape } = useOrientation()

  // State for tracking focus to prevent rapid tab switching issues
  const [isFocused, setIsFocused] = useState(false)
  const debouncedIsFocused = useDebounce(isFocused, 300) // 300ms debounce

  const {
    mutateAsync: getAssignedRoute,
    data: routeData,
    isPending: isRouteLoading,
  } = useGetAssignedRouteByTruckIdMutation({
    onError: (error) => {
      console.error('Assigned route mutation error:', error)
    },
  })

  const {
    data: truckData,
    isLoading: isLoading,
    isError: isTruckError,
    isSuccess: isTruckDataSuccess,
  } = useQuery({
    queryKey: truckQueries.truckByUserId(currentUserId!).queryKey,
    queryFn: truckQueries.truckByUserId(currentUserId!).queryFn,
    enabled: !!currentUserId,
  })

  const truckId = useMemo(() => truckData?.id, [truckData?.id])
  useTruckStats(truckId)

  // Memoize callback to prevent unnecessary re-renders
  const handleGetAssignedRoute = useCallback(() => {
    if (truckData?.id && debouncedIsFocused) {
      getAssignedRoute({ truckId: truckData.id })
    }
  }, [truckData?.id, getAssignedRoute, debouncedIsFocused])

  useFocusEffect(
    React.useCallback(() => {
      setIsFocused(true)
      return () => setIsFocused(false)
    }, []),
  )

  // Debounced effect for route fetching
  useEffect(() => {
    if (debouncedIsFocused) {
      handleGetAssignedRoute()
    }
  }, [debouncedIsFocused, handleGetAssignedRoute])

  // Additional protection against rapid tab switching
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (debouncedIsFocused && !isProcessing) {
      setIsProcessing(true)
      // Small delay to prevent rapid state changes
      const timer = setTimeout(() => {
        setIsProcessing(false)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [debouncedIsFocused])

  // Memoize data to prevent unnecessary re-renders
  const hasRouteData = useMemo(
    () => !!routeData?.assignedWithPassedRoute,
    [routeData?.assignedWithPassedRoute],
  )
  const hasAssigned = useMemo(
    () => routeData?.hasAssigned ?? false,
    [routeData?.hasAssigned],
  )

  useEffect(() => {
    if (isTruckDataSuccess && truckData) {
      try {
        setItem<Truck>('truckData', truckData)
        console.log('TruckData saved to MMKV from ProfileScreen:', truckData)
      } catch (e) {
        console.error('Failed to save truckData to MMKV from ProfileScreen:', e)
      }
    }
    if (isTruckError) {
      console.error('Failed to fetch truck data from ProfileScreen.')
      try {
        removeItem('truckData')
        console.log(
          'Cached truckData cleared due to fetch error from ProfileScreen.',
        )
      } catch (e) {
        console.error(
          'Failed to clear cached truckData from MMKV from ProfileScreen:',
          e,
        )
      }
    }
  }, [isTruckDataSuccess, truckData, isTruckError])

  // Don't render if processing to prevent NPE
  if (isProcessing && !debouncedIsFocused) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: theme.colors.background.primary }}>
        <ActivityIndicator size="large" color="#4964D8" />
        <Text className="mt-4 text-base" style={{ color: '#4964D8' }}>
          {t('profile.loading')}
        </Text>
      </View>
    )
  }

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: theme.colors.background.primary }}>
      <View className="py-[25px] px-5 md:px-[25px]">
        {truckData && <UserProfileCard truckData={truckData} />}

        {isRouteLoading && (
          <View
            className="w-full h-[194px] shadow-lg rounded-xl flex-col items-center justify-center mb-[45px]"
            style={{ backgroundColor: theme.colors.background.secondary }}>
            <ActivityIndicator size="large" color="#4964D8" />
            <Text className="mt-4 text-base" style={{ color: '#4964D8' }}>
              {t('profile.loading_route')}
            </Text>
          </View>
        )}

        {/* Show route information or current location */}
        {hasRouteData && (
          <AssignedRouteInfoCard
            routeData={routeData!.assignedWithPassedRoute}
            hasAssigned={hasAssigned}
            onRefetch={handleGetAssignedRoute}
          />
        )}

        {/* Display map with route or current location */}
        {hasRouteData && (
          <MapAssignedRoute
            routeData={routeData!.assignedWithPassedRoute}
            hasAssigned={hasAssigned}
          />
        )}

        {routeData?.assignedWithPassedRoute.assignedRoute?.fuelStations && (
          <View
            className="rounded-3xl mt-5 px-5 py-4"
            style={{
              backgroundColor: theme.colors.background.secondary,
            }}>
            <Text
              className="font-nunito font-bold text-sm leading-8 mb-6"
              style={{
                color: theme.colors.text.primary,
              }}>
              {t('profile.refueling_details')}
            </Text>
            {/* Pass fuelStations to RouteList */}
            <RouteList
              gasStations={
                routeData.assignedWithPassedRoute.assignedRoute?.fuelStations
              }
              selectedRouteId={
                routeData.assignedWithPassedRoute.assignedRoute?.sectionId
              }
            />
          </View>
        )}
      </View>
    </ScrollView>
  )
}
