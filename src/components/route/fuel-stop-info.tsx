import { GasStation } from '@/services/gas-station/types/gas-station' // Make sure the path is correct
import { useOrientation } from '@/shared/lib/hooks/use-orientation'
import { useTranslation } from '@/shared/lib/i18n'
import { useTheme } from '@/shared/lib/theme'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { FuelCanIcon } from '../ui/icons/fuel-can'
import { LovesIcon } from '../ui/icons/loves'
import { PilotIcon } from '../ui/icons/pilot'
import { PriceIcon } from '../ui/icons/price'
import { TAIcon } from '../ui/icons/ta'

interface MobileFuelStopInfoProps {
  station: GasStation
  isLast?: boolean
}

export const FuelStopInfo: React.FC<MobileFuelStopInfoProps> = ({
  station,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { isTablet } = useOrientation()

  const gallons = (station.refill ? Number(station.refill) : 0).toFixed(0)
  const price = station.fuelPrice?.finalPrice
    ? Number(station.fuelPrice.finalPrice)
    : station.fuelPrice?.price
      ? Number(station.fuelPrice.price)
      : 0
  const formattedPrice = price.toFixed(3)

  const getStationLogo = (stationName?: string | null) => {
    const stationNameLower = stationName?.toLowerCase() || ''
    switch (stationNameLower) {
      case 'ta':
        return <TAIcon width={40} height={40} />
      case 'pilot':
        return <PilotIcon width={40} height={40} />
      case 'loves':
        return <LovesIcon width={40} height={40} />
      default:
        return <TAIcon width={40} height={40} />
    }
  }

  return (
    <TouchableOpacity
      className="rounded-lg p-4 mb-5"
      style={{
        backgroundColor: theme.colors.background.secondary,
      }}>
      {/* Mobile layout */}
      {!isTablet && (
        <View>
          {/* First row: Fuel can icon, gallons, gas station icon */}
          <View className="flex-row justify-between items-start mb-2">
            {/* Fuel can icon and gallons */}
            <View className="flex-row items-start flex-1">
              <FuelCanIcon
                width={26}
                height={31}
                color={theme.colors.icons.secondary}
              />
              <View className="ml-2">
                <Text
                  className="font-nunito font-extrabold text-sm leading-[100%]"
                  style={{
                    color: theme.colors.text.primary,
                    letterSpacing: 1,
                  }}>
                  {gallons}
                </Text>
                <Text
                  className="font-nunito font-normal text-sm leading-[100%]"
                  style={{
                    color: theme.colors.text.secondary,
                    letterSpacing: 1,
                  }}>
                  {t('home.route_components.gallons')}
                </Text>
              </View>
            </View>
            {/* Gas station icon */}
            <View>{getStationLogo(station.name)}</View>
          </View>

          {/* Second row: Address */}
          <View className="mb-5">
            <Text
              className="font-nunito font-normal text-sm leading-4 mb-1"
              style={{
                color: theme.colors.text.secondary,
                letterSpacing: -0.28,
              }}>
              {t('home.route_components.address')}
            </Text>
            <Text
              className="font-nunito font-bold text-xs leading-4"
              style={{
                color: theme.colors.text.primary,
                letterSpacing: -0.24,
              }}>
              {station.distanceToLocation?.toFixed(2)}mi -{' '}
              {station.address || 'N/A'}
            </Text>
          </View>

          {/* Third row: Price (rectangle with dashed line) */}
          <View>
            <View
              className="flex-row items-center border border-dashed rounded-lg py-2.5 px-4"
              style={{
                borderColor: theme.colors.border.primary,
                width: 172,
                height: 56,
              }}>
              {/* Left block with icon */}
              <View className="mr-4">
                <PriceIcon width={15.5} height={31} />
              </View>
              {/* Right block with price and label */}
              <View className="flex-1">
                <Text
                  className="font-nunito font-extrabold text-sm leading-[100%]"
                  style={{
                    color: theme.colors.text.primary,
                    letterSpacing: 1,
                  }}>
                  ${formattedPrice}
                </Text>
                <Text
                  className="font-nunito font-normal text-sm leading-[100%]"
                  style={{
                    color: theme.colors.text.secondary,
                    letterSpacing: 1,
                  }}>
                  {t('home.route_components.price')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Tablet layout - all in one row */}
      {isTablet && (
        <View className="flex-row items-center">
          {/* Block 1: Fuel can icon and gallons - Fixed width */}
          <View className="flex-row items-center" style={{ width: 120 }}>
            <FuelCanIcon
              width={26}
              height={31}
              color={theme.colors.icons.secondary}
            />
            <View className="ml-2">
              <Text
                className="font-nunito font-extrabold text-sm leading-[100%]"
                style={{
                  color: theme.colors.text.primary,
                  letterSpacing: 1,
                }}>
                {gallons}
              </Text>
              <Text
                className="font-nunito font-normal text-sm leading-[100%]"
                style={{
                  color: theme.colors.text.secondary,
                  letterSpacing: 1,
                }}>
                {t('home.route_components.gallons')}
              </Text>
            </View>
          </View>

          {/* Block 2: Gas station logo - Fixed width */}
          <View style={{ width: 80, alignItems: 'center' }}>
            {getStationLogo(station.name)}
          </View>

          {/* Block 3: Address - Flexible width */}
          <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <Text
              className="font-nunito font-normal text-sm leading-4 mb-1"
              style={{
                color: theme.colors.text.secondary,
                letterSpacing: -0.28,
              }}>
              {t('home.route_components.address')}
            </Text>
            <Text
              className="font-nunito font-bold text-xs leading-4"
              style={{
                color: theme.colors.text.primary,
                letterSpacing: -0.24,
              }}>
              {station.distanceToLocation?.toFixed(2)}mi -{' '}
              {station.address || 'N/A'}
            </Text>
          </View>

          {/* Block 4: Price - Fixed width */}
          <View style={{ width: 172 }}>
            <View
              className="flex-row items-center border border-dashed rounded-lg py-2.5 px-4"
              style={{
                borderColor: theme.colors.border.primary,
                width: 172,
                height: 56,
              }}>
              {/* Left block with icon */}
              <View className="mr-4">
                <PriceIcon width={15.5} height={31} />
              </View>
              {/* Right block with price and label */}
              <View className="flex-1">
                <Text
                  className="font-nunito font-extrabold text-sm leading-[100%]"
                  style={{
                    color: theme.colors.text.primary,
                    letterSpacing: 1,
                  }}>
                  ${formattedPrice}
                </Text>
                <Text
                  className="font-nunito font-normal text-sm leading-[100%]"
                  style={{
                    color: theme.colors.text.secondary,
                    letterSpacing: 1,
                  }}>
                  {t('home.route_components.price')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  )
}
