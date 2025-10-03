import { FuelInfoCard } from '@/components/fuel/fuel-info-card'
import { CouponIcon } from '@/components/ui/icons/coupon'
import { DriverIcon } from '@/components/ui/icons/driver'
import { TruckIcon } from '@/components/ui/icons/truck'
import { Truck } from '@/services/truck/types/truck'
import { useTranslation } from '@/shared/lib/i18n'
import { useTheme } from '@/shared/lib/theme'
import React from 'react'
import { Text, View } from 'react-native'

/**
 * Interface for UserProfileCard component props.
 * @interface UserProfileCardProps
 * @property {Truck | null | undefined} truckData
 */
interface UserProfileCardProps {
  truckData: Truck | null | undefined
}

/**
 * Component for displaying user and truck information.
 * @param {UserProfileCardProps} props - Component properties.
 */
export function UserProfileCard({ truckData }: UserProfileCardProps) {
  const { theme } = useTheme()
  const { t } = useTranslation()
  return (
    <View
      className="w-full shadow-lg rounded-xl p-5 md:p-[25px] mb-[45px]"
      style={{ backgroundColor: theme.colors.background.secondary }}>
      <View className="flex-row items-center mt-2">
        <DriverIcon color={theme.colors.icons.primary} />
        <Text
          className="ml-3 font-nunito font-medium text-base leading-[28.98px] tracking-[0px]"
          style={{ color: theme.colors.text.primary }}>
          {truckData?.name} {truckData?.driver?.fullName}
        </Text>
      </View>

      <View className="flex-row items-center mt-2">
        <TruckIcon color={theme.colors.icons.primary} />
        <Text
          className="ml-3 font-nunito font-normal text-base leading-6 tracking-[0px]"
          style={{ color: theme.colors.text.primary }}>
          {truckData?.year} {truckData?.make} {truckData?.model}
        </Text>
      </View>

      <View className="flex-row items-center mt-2">
        <CouponIcon color={theme.colors.icons.primary} />
        <Text className="ml-3 font-nunito font-extrabold text-base leading-6 tracking-[0px] text-[#FFAF2A]">
          {truckData?.driver?.bonus} - {t('home.driver_info.bonus')}
        </Text>
      </View>

      <FuelInfoCard />
    </View>
  )
}
