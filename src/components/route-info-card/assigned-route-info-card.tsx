import { ArrowIcon } from '@/components/ui/icons/arrow'
import { CalendarIcon } from '@/components/ui/icons/calendar'
import { WeightIcon } from '@/components/ui/icons/weight'
import { useCompleteRouteMutation } from '@/services/route/complete-route.mutation'
import { AssignedRouteWithPassedRouteData } from '@/services/route/types/route'
import { useTranslation } from '@/shared/lib/i18n'
import { useTheme } from '@/shared/lib/theme'
import { useUserStore } from '@/shared/store/user-store'

import { formatCurrentDate } from '@/shared/lib/utils'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface AssignedRouteInfoCardProps {
  routeData: AssignedRouteWithPassedRouteData
  hasAssigned: boolean
  onRefetch?: () => void
}

/**
 * Component for displaying information about assigned route or current location.
 * @param {object} props - Component properties.
 * @param {AssignedRouteWithPassedRouteData} props.routeData - Assigned route data.
 * @param {boolean} props.hasAssigned - Whether there is an assigned route.
 */
export function AssignedRouteInfoCard({
  routeData,
  hasAssigned,
  onRefetch,
}: AssignedRouteInfoCardProps) {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const router = useRouter()
  const { isSelfDriver } = useUserStore()

  // Determine displayed data based on route availability
  const originText = hasAssigned
    ? routeData.assignedRoute?.originName || t('home.route_info.not_specified')
    : routeData.currentLocation.formattedLocation ||
      t('home.route_info.location_not_determined')

  const destinationText = hasAssigned
    ? routeData.assignedRoute?.destinationName ||
      t('home.route_info.not_specified')
    : t('home.route_info.no_destination')

  const statusText = hasAssigned
    ? t('home.route_info.on_the_road')
    : t('home.route_info.available')
  const statusColor = hasAssigned ? '#FFAF2A' : '#10B981'
  const buttonText = hasAssigned
    ? t('home.route_info.edit_route')
    : t('home.route_info.create_route')

  const { mutateAsync: completeRouteMutation, isPending: isCompleting } =
    useCompleteRouteMutation({
      onSuccess: () => {
        console.log('Route completed successfully')
        // Call refetch to update route data
        onRefetch?.()
      },
      onError: (error) => {
        console.error('Complete route error:', error)
      },
    })

  const handleButtonPress = () => {
    router.push('/route')
  }

  const handleCompleteRoute = async () => {
    if (routeData.assignedRoute?.routeId) {
      try {
        await completeRouteMutation({
          routeId: routeData.assignedRoute.routeId,
        })
      } catch (error) {
        console.error('Failed to complete route:', error)
      }
    }
  }

  return (
    <View
      className="w-full shadow-lg rounded-xl p-5 md:p-[25px] mb-[45px]"
      style={{ backgroundColor: theme.colors.background.secondary }}>
      <Text
        className="mb-4 font-nunito font-bold text-sm leading-[22px]"
        style={{ color: theme.colors.text.primary }}>
        {hasAssigned
          ? t('home.route_info.title')
          : t('home.route_info.current_location')}
      </Text>

      <View
        className="w-full h-[44px] rounded-xl flex-row items-center px-4 mb-[14px]"
        style={{ backgroundColor: theme.colors.background.primary }}>
        <Text
          className="flex-1 mr-2 font-extrabold text-base leading-6"
          style={{ color: theme.colors.text.primary }}
          numberOfLines={1}>
          {originText}
        </Text>
        {hasAssigned && (
          <>
            <ArrowIcon color={theme.colors.text.primary} />
            <Text
              className="text-right flex-1 ml-2 font-extrabold text-base leading-6"
              style={{ color: theme.colors.text.primary }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {destinationText}
            </Text>
          </>
        )}
      </View>

      <View className="flex-row items-center justify-between mb-[14px]">
        <View className="flex-row items-center">
          <CalendarIcon color={theme.colors.text.secondary} />
          <Text
            className="ml-2 font-normal text-sm leading-6"
            style={{ color: theme.colors.text.primary }}>
            {formatCurrentDate(new Date())}
          </Text>
        </View>

        {hasAssigned && routeData.assignedRoute && (
          <View className="flex-row items-center">
            <WeightIcon color="#4964D8" />
            <Text
              className="ml-2 font-nunito font-extrabold text-sm leading-6"
              style={{ color: theme.colors.text.primary }}>
              {routeData.assignedRoute.weight || 0} t
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between mb-2">
        <Text
          className="font-nunito font-normal text-sm leading-[22px]"
          style={{ color: theme.colors.text.secondary }}>
          {t('home.route_info.status')}
        </Text>
        <Text
          className="text-right font-nunito font-bold text-sm leading-[22px]"
          style={{ color: statusColor }}>
          {statusText}
        </Text>
      </View>

      <View className="space-y-3 mt-5">
        {/* Route creation/editing button available only for SelfDriver */}
        {isSelfDriver() && (
          <TouchableOpacity
            className="bg-[#4964D8] h-[44px] rounded-3xl items-center justify-center"
            onPress={handleButtonPress}>
            <Text className="text-white text-base font-medium text-center leading-6">
              {buttonText}
            </Text>
          </TouchableOpacity>
        )}

        {hasAssigned && (
          <TouchableOpacity
            className={`bg-[#10B981] h-[44px] rounded-3xl items-center justify-center mt-3 ${isCompleting ? 'opacity-60' : ''}`}
            onPress={handleCompleteRoute}
            disabled={isCompleting}>
            <Text className="text-white text-base font-medium text-center leading-6">
              {isCompleting
                ? t('home.route_info.completing')
                : t('home.route_info.complete_route')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
