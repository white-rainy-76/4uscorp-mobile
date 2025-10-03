import { LovesIcon } from '@/components/ui/icons/loves'
import { PilotIcon } from '@/components/ui/icons/pilot'
import { TAIcon } from '@/components/ui/icons/ta'
import { Directions } from '@/services/directions/types/directions'
import { GasStation } from '@/services/gas-station/types/gas-station'
import React, { useEffect, useMemo, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

interface GasStationDetailsBottomSheetProps {
  station: GasStation | null
  cart: GasStation[]
  handleAddToCart: (station: GasStation) => void
  handleRemoveFromCart: (stationId: string) => void
  handleUpdateRefillLiters: (stationId: string, liters: number) => void
  routeData?: Directions
  selectedRouteId: string | null
  fuelLeftOver?: number
  onGasStationClick: (station: GasStation) => void
}

export const GasStationDetailsBottomSheet: React.FC<
  GasStationDetailsBottomSheetProps
> = ({
  station,
  cart,
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateRefillLiters,
  routeData,
  selectedRouteId,
  onGasStationClick,
}) => {
  const [refillLiters, setRefillLiters] = useState<string>(
    station?.refill ?? '',
  )

  useEffect(() => {
    if (station) {
      const stationInCart = cart.find((item) => item.id === station.id)
      setRefillLiters(stationInCart?.refill ?? station.refill ?? '')
    } else {
      setRefillLiters('')
    }
  }, [station, cart])

  const isStationInCart = useMemo(() => {
    return station ? cart.some((item) => item.id === station.id) : false
  }, [station, cart])

  const getIcon = (stationName?: string | null) => {
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

  const handleCartAction = () => {
    if (!station) return

    const refillNum = parseFloat(refillLiters)
    if (!isStationInCart && (isNaN(refillNum) || refillNum < 0)) {
      console.warn('Please enter a valid number of gallons to add to cart.')
      return
    }

    const updatedStation: GasStation = {
      ...station,
      refill: refillLiters,
    }

    if (isStationInCart) {
      handleRemoveFromCart(station.id)
    } else {
      handleAddToCart(updatedStation)
    }
  }

  const handleSaveAction = () => {
    if (!station) return

    const refillNum = parseFloat(refillLiters)
    if (!isNaN(refillNum) && refillNum >= 0) {
      handleUpdateRefillLiters(station.id, refillNum)
    } else {
      console.warn('Please enter a valid number of gallons to update.')
    }
  }

  const route = useMemo(() => {
    return routeData?.route.find((r) => r.routeSectionId === selectedRouteId)
  }, [routeData, selectedRouteId])

  const routeInfo = route?.routeInfo

  const displayDriveTime = useMemo(() => {
    if (
      !routeInfo ||
      typeof routeInfo.driveTime !== 'number' ||
      routeInfo.driveTime < 0
    )
      return ''
    const totalMinutes = Math.floor(routeInfo.driveTime / 60)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    if (hours > 0) {
      return `${hours}h ${minutes}min`
    } else {
      return `${minutes}min`
    }
  }, [routeInfo])

  const displayMiles = useMemo(() => {
    if (
      !routeInfo ||
      typeof routeInfo.miles !== 'number' ||
      routeInfo.miles < 0
    )
      return '-'
    const milesInMeters = routeInfo.miles
    const convertedMiles = (milesInMeters * 0.000621371).toFixed(1)

    return convertedMiles
  }, [routeInfo])

  return (
    <ScrollView style={styles.container}>
      {/* Route information */}
      <View className="p-4 bg-white rounded-xl space-y-5 font-nunito border-b border-[#E1E5EA]">
        <View className="flex-row flex-wrap justify-between text-sm text-text-neutral font-semibold">
          <View className="flex-col items-start w-1/2 mb-2">
            <Text className="font-normal text-gray-500">Drive time:</Text>
            <Text className="font-bold whitespace-nowrap text-[#192A3E]">
              {displayDriveTime}
            </Text>
          </View>
          <View className="flex-col items-start w-1/2 mb-2">
            <Text className="font-normal text-gray-500">Miles:</Text>
            <Text className="font-bold whitespace-nowrap text-[#192A3E]">
              {displayMiles}mi
            </Text>
          </View>
          <View className="flex-col items-start w-1/2 mb-2">
            <Text className="font-normal text-gray-500">Gallons:</Text>
            <Text className="font-bold whitespace-nowrap text-[#192A3E]">
              {routeInfo?.gallons ?? '-'}
            </Text>
          </View>
          <View className="flex-col items-start w-1/2 mb-2">
            <Text className="font-normal text-gray-500">Tolls:</Text>
            <Text className="font-bold whitespace-nowrap text-[#192A3E]">
              ${routeInfo?.tolls ?? '-'}
            </Text>
          </View>
        </View>
      </View>

      {/* Selected gas station details (if station is not null) */}
      {station && (
        <View className="p-4 bg-white border-b border-[#E1E5EA]">
          <Text className="font-extrabold text-xl mb-2 text-[#192A3E]">
            Selected Gas Station
          </Text>
          <View style={styles.selectedStationRow}>
            <View style={styles.stationInfoLeft}>
              <View style={styles.iconWrapper}>{getIcon(station.name)}</View>
              <Text style={styles.priceText}>
                ${station.fuelPrice?.finalPrice ?? 'N/A'}
              </Text>
            </View>
            <View style={styles.stationInfoRight}>
              <Text style={styles.addressText}>
                {station.distanceToLocation?.toFixed(2)}mi -{' '}
                {station.address || 'N/A'}
              </Text>
              <View style={styles.inputAndButtonsRow}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={refillLiters}
                  onChangeText={(text) =>
                    setRefillLiters(text.replace(/[^0-9.]/g, ''))
                  }
                />
                <Text style={styles.glText}>gl</Text>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    isStationInCart ? styles.deleteButton : styles.addButton,
                  ]}
                  onPress={handleCartAction}>
                  <Text style={styles.actionButtonText}>
                    {isStationInCart ? 'delete' : 'add'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.saveButton, styles.actionButton]}
                  onPress={handleSaveAction}>
                  <Text style={styles.actionButtonText}>save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Gas stations list (Always displayed) */}
      <View className="p-4 bg-white rounded-xl space-y-2">
        <Text className="font-extrabold text-xl mb-2 text-[#192A3E]">
          Gas Stations List
        </Text>
        <View>
          <View className="space-y-4">
            {cart.length > 0 ? (
              cart.map((stationItem) => (
                <TouchableOpacity
                  key={stationItem.id}
                  className="flex-row justify-between items-start text-sm"
                  onPress={() => onGasStationClick(stationItem)}>
                  <View className="text-[#192A3E] flex-grow pr-2">
                    <Text className="text-[#9BA9BB] font-normal text-xs">
                      Address
                    </Text>
                    <Text className="font-bold text-xs leading-4">
                      {stationItem.address}
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="text-[#D84949] font-bold text-sm underline whitespace-nowrap ml-auto"
                    onPress={() => handleRemoveFromCart(stationItem.id)}>
                    <Text className="text-[#D84949] font-bold text-sm underline">
                      delete
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            ) : (
              <Text className="text-sm text-gray-500">
                No gas stations available
              </Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  selectedStationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align to top
    justifyContent: 'space-between', // Place elements at edges
  },
  stationInfoLeft: {
    alignItems: 'center', // Center logo and price
    marginRight: 15,
  },
  iconWrapper: {
    marginBottom: 5, // Margin under logo
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#192A3E',
  },
  stationInfoRight: {
    flex: 1, // Takes remaining available space
    justifyContent: 'space-between', // Place address and input/buttons
  },
  addressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#192A3E',
    marginBottom: 8, // Margin under address
  },
  inputAndButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align to right
  },
  input: {
    flex: 1, // Allows input to take available space
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    paddingHorizontal: 0,
    textAlign: 'center',
    fontSize: 16,
    marginRight: 5,
    minWidth: 50, // Minimum width for input
  },
  glText: {
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#4964D8',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
  },
  saveButton: {
    backgroundColor: '#28A745',
    marginLeft: 10,
  },
})
