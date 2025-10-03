import { useTranslation } from '@/shared/lib/i18n'
import { useTheme } from '@/shared/lib/theme'
import { useTruckStore } from '@/shared/store/truck-store'
import React, { useCallback } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import { FuelCanIcon } from '../ui/icons/fuel-can'

interface FuelInfoCardProps {}

export const FuelInfoCard = ({}: FuelInfoCardProps) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { stats, isLoading } = useTruckStore()

  const getFuelColor = useCallback((percentage: number | string) => {
    const numPercentage =
      typeof percentage === 'string' ? parseFloat(percentage) : percentage
    if (numPercentage > 50) return '#10B981'
    if (numPercentage > 25) return '#FFAF2A'
    return '#EF4444'
  }, [])

  const getFuelStatus = useCallback(
    (percentage: number | string) => {
      const numPercentage =
        typeof percentage === 'string' ? parseFloat(percentage) : percentage
      if (numPercentage > 75) return t('home.driver_info.fuel_status.high')
      if (numPercentage > 50) return t('home.driver_info.fuel_status.medium')
      if (numPercentage > 25) return t('home.driver_info.fuel_status.low')
      return t('home.driver_info.fuel_status.critical')
    },
    [t],
  )

  return (
    <View
      className="mt-[18px] w-[172px] h-[64px] border border-dashed rounded-lg flex-row items-center px-5"
      style={{
        backgroundColor: theme.colors.background.secondary,
        borderColor: theme.colors.border.primary,
      }}>
      <FuelCanIcon color={theme.colors.icons.secondary} />
      <View className="ml-3 flex-1">
        {isLoading ? (
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="#4964D8" />
            <Text
              className="ml-2 font-normal text-xs tracking-wide"
              style={{ color: theme.colors.text.secondary }}>
              {t('home.driver_info.loading')}
            </Text>
          </View>
        ) : (
          <>
            <View className="flex-row items-center justify-between">
              <Text
                className="font-extrabold text-sm tracking-wide"
                style={{
                  color: stats
                    ? getFuelColor(stats.fuelPercentage)
                    : theme.colors.text.primary,
                }}>
                {stats ? `${stats.fuelPercentage}%` : '-'}
              </Text>
              {stats && (
                <View className="flex-row items-center">
                  <View
                    className="w-2 h-2 rounded-full mr-1"
                    style={{
                      backgroundColor: getFuelColor(stats.fuelPercentage),
                    }}
                  />
                  <Text
                    className="font-normal text-xs tracking-wide"
                    style={{ color: theme.colors.text.secondary }}>
                    {getFuelStatus(stats.fuelPercentage)}
                  </Text>
                </View>
              )}
            </View>

            {/* Progress bar */}
            {stats && (
              <View className="mt-1 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <View
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${stats.fuelPercentage}%` as any,
                    backgroundColor: getFuelColor(stats.fuelPercentage),
                  }}
                />
              </View>
            )}

            <Text
              className="font-normal text-sm tracking-wide mt-1"
              style={{ color: theme.colors.text.secondary }}>
              {t('home.driver_info.fuel')}
            </Text>
          </>
        )}
      </View>
    </View>
  )
}
