import { LovesIcon } from '@/components/ui/icons/loves'
import { PilotIcon } from '@/components/ui/icons/pilot'
import { TAIcon } from '@/components/ui/icons/ta'
import { GasStation } from '@/services/gas-station/types/gas-station'
import React, { useMemo } from 'react'
import { Text, View } from 'react-native'

interface GasStationMarkerProps {
  station: GasStation
}

export const GasStationMarker: React.FC<GasStationMarkerProps> = ({
  station,
}) => {
  // Memoize icon to prevent unnecessary re-renders
  const stationIcon = useMemo(() => {
    try {
      const stationNameLower = station.name?.toLowerCase() || ''

      switch (stationNameLower) {
        case 'ta':
          return <TAIcon width={18} height={18} />
        case 'pilot':
          return <PilotIcon width={18} height={18} />
        case 'loves':
          return <LovesIcon width={18} height={18} />
        case 'road rangers':
          return <TAIcon width={18} height={18} />
        default:
          return <TAIcon width={18} height={18} />
      }
    } catch (error) {
      console.error('Error rendering station icon:', error)
      return <TAIcon width={18} height={18} />
    }
  }, [station.name])

  // Memoize fuel price with validity check
  const fuelPrice = useMemo(() => {
    try {
      if (station.fuelPrice?.finalPrice) {
        return station.fuelPrice.finalPrice
      }
      if (station.fuelPrice?.price) {
        return station.fuelPrice.price
      }
      return 'N/A'
    } catch (error) {
      console.error('Error getting fuel price:', error)
      return 'N/A'
    }
  }, [station.fuelPrice])

  // Memoize marker background color
  const markerBackgroundColor = useMemo(() => {
    try {
      return station.isAlgorithm ? '#ADD8E6' : '#FFFFFF'
    } catch (error) {
      console.error('Error determining marker background color:', error)
      return '#FFFFFF'
    }
  }, [station.isAlgorithm])

  // Validate data before rendering
  if (!station || !station.name) {
    console.warn('Invalid station data for marker:', station)
    return null
  }

  return (
    <View
      className="items-center bg-white rounded-md p-1 shadow-sm"
      style={{
        backgroundColor: markerBackgroundColor,
        // Ensure consistent dimensions for proper positioning
        minWidth: 32,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View className="items-center justify-center">{stationIcon}</View>
      <Text className="text-[10px] font-bold text-[#222222] mt-1 font-['Nunito-Bold']">
        ${fuelPrice}
      </Text>
    </View>
  )
}
