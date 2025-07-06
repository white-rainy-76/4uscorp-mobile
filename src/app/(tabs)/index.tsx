import { TruckMap } from '@/components/map/map'
import { ArrowIcon } from '@/components/ui/icons/arrow'
import { CalendarIcon } from '@/components/ui/icons/calendar'
import { CouponIcon } from '@/components/ui/icons/coupon'
import { DriverIcon } from '@/components/ui/icons/driver'
import { FuelCanIcon } from '@/components/ui/icons/fuel-can'
import { TruckIcon } from '@/components/ui/icons/truck'
import { WeightIcon } from '@/components/ui/icons/weight'
import { useGetRouteMutation } from '@/services/route/get-route.mutation'
import { useConnection } from '@/shared/context/socket-context'
import { TruckFuelUpdate } from '@/shared/types'
import { ScrollView } from 'moti'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

export default function ProfileScreen() {
  const truckId = '6de96c31-4548-4b89-895a-64dbcca7a10a'
  const { connection, isConnected } = useConnection()
  const [fuel, setFuel] = useState<TruckFuelUpdate | null>(null)
  const [isLoadingFuel, setIsLoadingFuel] = useState(true)
  useEffect(() => {
    if (!connection || !isConnected) return

    setIsLoadingFuel(true)

    connection
      .invoke('JoinTruckGroup', truckId)
      .catch((err: any) => console.error('Join group error', err))

    const handleFuelUpdate = (data: TruckFuelUpdate) => {
      if (data.truckId === truckId) {
        setFuel(data)
        setIsLoadingFuel(false)
      }
    }

    connection.on('ReceiveTruckFuelUpdate', handleFuelUpdate)

    return () => {
      connection.off('ReceiveTruckFuelUpdate', handleFuelUpdate)
    }
  }, [connection, isConnected])

  const {
    mutateAsync: getRoute,
    data: routeData,
    isPending: isRouteLoading,
  } = useGetRouteMutation({
    onError: (error) => {
      console.error('Route mutation error:', error)
    },
  })
  useEffect(() => {
    getRoute({ truckId: truckId })
  }, [getRoute])

  const handlePress = () => {
    console.log('Кнопка была нажата!')
  }

  const formatCurrentDate = (date: Date) => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}/${month}/${day}`
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="pt-[25px] px-5">
        {/* Информация о пользователе */}
        <View className="w-full bg-white shadow-lg rounded-xl p-4 mb-[45px]">
          <View className="flex-row items-center mt-2">
            <DriverIcon color="#A8A8A8" />
            <Text className="ml-3 text-[#343434] font-medium text-base leading-6">
              #111 Сергей Петров
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <TruckIcon color="#A8A8A8" />
            <Text className="ml-3 text-[#343434] font-normal text-base leading-6">
              2025 FREIGHTLINER CASCADIA
            </Text>
          </View>

          <View className="flex-row items-center mt-2">
            <CouponIcon color="#A8A8A8" />
            <Text className="ml-3 text-[#FFAF2A] font-extrabold text-base leading-6">
              12 - Бонусы
            </Text>
          </View>

          <View className="mt-[14px] w-[172px] h-[56px] bg-white border border-dashed border-gray-400/50 rounded-lg flex-row items-center px-4">
            <FuelCanIcon color="#4964D8" />
            <View className="ml-3">
              <Text className="text-[#1E2022] font-extrabold text-sm tracking-wide">
                {fuel ? `${fuel.fuelPercentage}%` : '50%'}
              </Text>
              <Text className="text-[#77838F] font-normal text-sm tracking-wide">
                Топливо
              </Text>
            </View>
          </View>
        </View>

        {/* Информация о маршруте */}
        {isRouteLoading ? (
          // Лоадер, когда данные маршрута загружаются
          <View className="w-full h-[194px] bg-white shadow-lg rounded-xl flex-col items-center justify-center mb-[45px]">
            <ActivityIndicator size="large" color="#4964D8" />
            <Text className="mt-4 text-[#4964D8] text-base">
              Загрузка маршрута...
            </Text>
          </View>
        ) : (
          // Информация о маршруте, когда данные загружены
          <View className="w-full bg-white shadow-lg rounded-xl p-4 mb-[45px]">
            <Text className="text-lg font-bold mb-4">
              Информация о маршруте
            </Text>

            <View className="w-full h-[44px] bg-gray-200 rounded-xl flex-row items-center justify-between px-4 mb-[14px]">
              <Text className="text-[#343434] font-extrabold text-base leading-6">
                {routeData?.originName}
              </Text>
              <ArrowIcon color="#343434" />
              <Text className="text-[#343434] font-extrabold text-base leading-6 text-right">
                {routeData?.destinationName}
              </Text>
            </View>

            <View className="flex-row items-center justify-between mb-[14px]">
              <View className="flex-row items-center">
                <CalendarIcon color="#A8A8A8" />
                <Text className="ml-2 text-[#343434] font-normal text-sm leading-6">
                  {formatCurrentDate(new Date())}
                </Text>
              </View>
              <View className="flex-row items-center">
                <WeightIcon color="#4964D8" />
                <Text className="ml-2 text-[#343434] font-extrabold text-sm leading-6">
                  {routeData?.weight}
                </Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-[#A8A8A8] font-normal text-sm leading-6">
                Статус
              </Text>
              <Text className="text-[#FFAF2A] font-bold text-sm leading-6 text-right">
                В дороге
              </Text>
            </View>
          </View>
        )}

        <TruckMap />

        <TouchableOpacity
          className="bg-blue-600 py-3 px-6 rounded-lg shadow-md mb-[45px]"
          onPress={handlePress}>
          <Text className="text-white text-lg font-bold text-center">
            Нажми меня!
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
