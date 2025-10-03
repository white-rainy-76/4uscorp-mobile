import { FuelCanIcon } from '@/components/ui/icons/fuel-can'
import { LocationIcon } from '@/components/ui/icons/location'
import { WeightIcon } from '@/components/ui/icons/weight'
import { FuelSlider } from '@/components/ui/slider'
import { Coordinate } from '@/shared/types'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import GooglePlacesTextInput, {
  Place,
} from 'react-native-google-places-textinput'
import { useRouteFormStore } from './store/use-form-store'

export const RouteForm = () => {
  const { setOrigin, setDestination, setTruckWeight, setFinishFuel } =
    useRouteFormStore()

  // Local state for form
  const [formState, setFormState] = useState({
    origin: { text: '', coords: null as Coordinate | null },
    destination: { text: '', coords: null as Coordinate | null },
    truckWeight: '',
    finishFuel: 50,
  })

  const [errors, setErrors] = useState({
    origin: '',
    destination: '',
    truckWeight: '',
  })

  const handleSubmit = () => {
    const newErrors = {
      origin: !formState.origin.text.trim() ? 'Specify departure location' : '',
      destination: !formState.destination.text.trim()
        ? 'Specify delivery location'
        : '',
      truckWeight: !formState.truckWeight.trim()
        ? 'Specify cargo weight'
        : isNaN(Number(formState.truckWeight))
          ? 'Weight must be a number'
          : '',
    }

    setErrors(newErrors)

    if (!Object.values(newErrors).some(Boolean)) {
      // Update store only after successful validation
      setOrigin(formState.origin.text, formState.origin.coords)
      setDestination(formState.destination.text, formState.destination.coords)
      setTruckWeight(formState.truckWeight)
      setFinishFuel(formState.finishFuel)

      console.log('Form submitted:', formState)
    }
  }

  return (
    <View className="bg-white p-5 mx-5 my-5">
      <Text className="text-lg font-bold mb-5 text-gray-900 font-nunito">
        Route Information
      </Text>

      {/* Departure */}

      <View className="mb-5">
        <View className="flex-row items-center mb-4">
          <LocationIcon color="#FFAF2A" />
          <View className="ml-[15px] flex-1">
            <GooglePlacesTextInput
              apiKey="AIzaSyCq9ygETQJ-8eStWqHUa-XvF1ihD32NyDU"
              placeHolderText="Departure"
              value={formState.origin.text}
              onTextChange={(text) =>
                setFormState((prev) => ({
                  ...prev,
                  origin: { ...prev.origin, text, coords: null },
                }))
              }
              onPlaceSelect={(place: Place) => {
                const coords = place.details?.location
                setFormState((prev) => ({
                  ...prev,
                  origin: {
                    text: place.structuredFormat.mainText.text,
                    coords: coords
                      ? {
                          latitude: coords.latitude,
                          longitude: coords.longitude,
                        }
                      : null,
                  },
                }))
              }}
              onError={(error: any) => console.error('Origin error:', error)}
              scrollEnabled={false}
              fetchDetails={true}
              detailsFields={['location']}
              style={{
                input: {
                  height: 44,
                  backgroundColor: '#F2F2F2',
                  borderRadius: 22,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  color: '#343434',
                  borderWidth: 0,
                },
                placeholder: {
                  color: '#CACACA',
                },
                suggestionsContainer: {
                  position: 'absolute',
                  top: 48,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  backgroundColor: '#F2F2F2',
                  borderRadius: 8,
                  maxHeight: 200,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 4,
                },
                suggestionItem: {
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#CACACA',
                },
                suggestionText: {
                  main: { fontSize: 16, color: '#343434' },
                  secondary: { fontSize: 14, color: '#666' },
                },
              }}
            />
          </View>
        </View>

        {/* Delivery */}
        <View className="flex-row items-center">
          <LocationIcon color="#4964D8" />
          <View className="ml-[15px] flex-1">
            <GooglePlacesTextInput
              apiKey="AIzaSyCq9ygETQJ-8eStWqHUa-XvF1ihD32NyDU"
              placeHolderText="Delivery"
              value={formState.destination.text}
              onTextChange={(text) =>
                setFormState((prev) => ({
                  ...prev,
                  destination: { ...prev.destination, text, coords: null },
                }))
              }
              onPlaceSelect={(place: Place) => {
                const coords = place.details?.location
                setFormState((prev) => ({
                  ...prev,
                  destination: {
                    text: place.structuredFormat.mainText.text,
                    coords: coords
                      ? {
                          latitude: coords.latitude,
                          longitude: coords.longitude,
                        }
                      : null,
                  },
                }))
              }}
              scrollEnabled={false}
              fetchDetails={true}
              detailsFields={['location']}
              style={{
                input: {
                  height: 44,
                  backgroundColor: '#F2F2F2',
                  borderRadius: 22,
                  paddingHorizontal: 16,
                  fontSize: 16,
                  color: '#343434',
                  borderWidth: 0,
                },
                placeholder: {
                  color: '#CACACA',
                },
                suggestionsContainer: {
                  position: 'absolute',
                  top: 48,
                  left: 0,
                  right: 0,
                  zIndex: 1000,
                  backgroundColor: '#F2F2F2',
                  borderRadius: 8,
                  maxHeight: 200,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 4,
                },
                suggestionItem: {
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: '#CACACA',
                },
                suggestionText: {
                  main: { fontSize: 16, color: '#343434' },
                  secondary: { fontSize: 14, color: '#666' },
                },
              }}
            />
          </View>
        </View>
        {errors.origin && (
          <Text className="text-red-500 text-xs mt-1 ml-9">
            {errors.origin}
          </Text>
        )}
        {errors.destination && (
          <Text className="text-red-500 text-xs mt-1 ml-9">
            {errors.destination}
          </Text>
        )}
      </View>

      {/* Weight */}
      <View className="flex-row items-center mb-4">
        <WeightIcon width={20} height={20} color="#4964D8" />
        <View
          className="ml-[15px] flex-row items-center bg-[#F2F2F2] w-[308]"
          style={{ borderRadius: 22, height: 44 }}>
          <Text className="text-[#343434] font-bold text-sm px-4">Weight</Text>
          <View className="h-5 w-px bg-[#CACACA] mr-4" />
          <TextInput
            placeholder="Enter weight"
            placeholderTextColor="#CACACA"
            className="flex-1 text-[#343434] text-base font-nunito font-medium pr-4"
            keyboardType="numeric"
            value={formState.truckWeight}
            onChangeText={(truckWeight) =>
              setFormState((prev) => ({ ...prev, truckWeight }))
            }
          />
        </View>
      </View>
      {errors.truckWeight && (
        <Text className="text-red-500 text-xs mb-2 ml-9">
          {errors.truckWeight}
        </Text>
      )}

      {/* Fuel */}
      <View className="flex-row items-center mb-6 mt-4">
        <FuelCanIcon color="#4964D8" width={20} height={20} />
        <View className="flex-1">
          <FuelSlider
            value={formState.finishFuel}
            onChange={(finishFuel) =>
              setFormState((prev) => ({ ...prev, finishFuel }))
            }
          />
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-[#4964D8] rounded-xl py-3 items-center">
        <Text className="text-white text-base font-medium">
          Calculate Route
        </Text>
      </TouchableOpacity>
    </View>
  )
}
