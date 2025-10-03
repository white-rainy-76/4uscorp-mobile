import { GasStation } from '@/services/gas-station/types/gas-station' // Make sure the path is correct
import { useTranslation } from '@/shared/lib/i18n'
import { useTheme } from '@/shared/lib/theme'
import React, { useMemo } from 'react'
import { Text, View } from 'react-native'
import { FuelStopInfo } from './fuel-stop-info'
import { RouteIndicator } from './route-indicator'

interface MobileRouteListProps {
  gasStations: GasStation[]
  selectedRouteId?: string | null
}

export const RouteList: React.FC<MobileRouteListProps> = ({
  gasStations,
  selectedRouteId,
}) => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const algorithmStations = useMemo(() => {
    gasStations.forEach((station) => {
      if (station.roadSectionId === selectedRouteId && station.isAlgorithm)
        console.log(station)
    })
    if (!selectedRouteId) return gasStations
    return gasStations
      .filter(
        (station) =>
          station.roadSectionId === selectedRouteId && station.isAlgorithm,
      )
      .sort((a, b) => (a.stopOrder || 0) - (b.stopOrder || 0))
  }, [gasStations, selectedRouteId])

  if (algorithmStations.length === 0) {
    return (
      <View className="py-5 items-center">
        <Text
          className="text-base"
          style={{ color: theme.colors.text.secondary }}>
          {t('home.route_components.no_gas_stations')}
        </Text>
      </View>
    )
  }

  return (
    <View
      className="flex-1 px-4 py-2"
      style={{ backgroundColor: theme.colors.background.secondary }}>
      <View className="flex-row">
        <View className="pt-2">
          <RouteIndicator pointCount={algorithmStations.length} />
        </View>

        <View className="flex-1 ml-4">
          {algorithmStations.map((station, index) => (
            <FuelStopInfo
              key={station.id}
              station={station}
              isLast={index === algorithmStations.length - 1}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
