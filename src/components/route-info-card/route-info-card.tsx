import { ArrowIcon } from '@/components/ui/icons/arrow'
import { CalendarIcon } from '@/components/ui/icons/calendar'
import { WeightIcon } from '@/components/ui/icons/weight'
import { RouteData } from '@/services/route/types/route'

import { useUserStore } from '@/shared/store/user-store'

import { useTranslation } from '@/shared/lib/i18n'
import { formatCurrentDate } from '@/shared/lib/utils'
import { useRouter } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface RouteInfoCardProps {
  routeData: RouteData
}
/**
 * Component for displaying route information or loader.
 * @param {object} props - Component properties.
 * @param {RouteData} props.routeData - Route data.

 */
export function RouteInfoCard({ routeData }: RouteInfoCardProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const { isSelfDriver } = useUserStore()
  const hasRoute = routeData?.route?.isRoute

  const originText = hasRoute
    ? routeData?.originName
    : routeData?.route?.formattedLocation

  const statusText = hasRoute
    ? t('home.route_info.on_the_road')
    : t('home.route_info.available')
  const statusColor = hasRoute ? '#FFAF2A' : '#4CAF50'
  const buttonText = hasRoute
    ? t('home.route_info.edit_route')
    : t('home.route_info.create_route')

  const handleButtonPress = () => {
    router.push('/route')
  }

  return (
    <View className="w-full bg-white shadow-lg rounded-xl p-4 mb-[45px]">
      <Text className="text-lg font-bold mb-4">
        {t('home.route_info.title')}
      </Text>

      <View className="w-full h-[44px] bg-gray-200 rounded-xl flex-row items-center justify-between px-4 mb-[14px]">
        <Text className="text-[#343434] font-extrabold text-base leading-6">
          {originText}
        </Text>
        {hasRoute && (
          <>
            <ArrowIcon color="#343434" />
            <Text className="text-[#343434] font-extrabold text-base leading-6 text-right">
              {routeData?.destinationName}
            </Text>
          </>
        )}
      </View>

      <View className="flex-row items-center justify-between mb-[14px]">
        <View className="flex-row items-center">
          <CalendarIcon color="#A8A8A8" />
          <Text className="ml-2 text-[#343434] font-normal text-sm leading-6">
            {formatCurrentDate(new Date())}
          </Text>
        </View>

        {hasRoute && (
          <View className="flex-row items-center">
            <WeightIcon color="#4964D8" />
            <Text className="ml-2 text-[#343434] font-extrabold text-sm leading-6">
              {routeData?.weight}
            </Text>
          </View>
        )}
      </View>

      <View className="flex-row items-center justify-between mb-2">
        <Text className="text-[#A8A8A8] font-normal text-sm leading-6">
          {t('home.route_info.status')}
        </Text>
        <Text
          className="font-bold text-sm leading-6 text-right"
          style={{ color: statusColor }}>
          {statusText}
        </Text>
      </View>

      {/* Route creation/editing button available only for SelfDriver */}
      {isSelfDriver() && (
        <TouchableOpacity
          className="bg-[#4964D8] h-[44px] rounded-lg items-center justify-center mt-5"
          onPress={handleButtonPress}>
          <Text className="text-white text-base font-medium text-center leading-6">
            {buttonText}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}
