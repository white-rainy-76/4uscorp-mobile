import Slider from '@react-native-community/slider'
import React from 'react'
import { Text, View } from 'react-native'

interface FuelSliderProps {
  value: number
  onChange: (value: number) => void
}

export const FuelSlider = ({ value, onChange }: FuelSliderProps) => {
  const sliderWidth = 310

  const position = Math.max(
    0,
    Math.min((value / 100) * sliderWidth - 10, sliderWidth - 30),
  )

  return (
    <View>
      <View className="absolute top-[-20px]" style={{ left: position }}>
        <Text className="text-gray-900 font-semibold">{value}%</Text>
      </View>

      <Slider
        className="w-full h-10"
        value={value}
        minimumValue={0}
        maximumValue={100}
        step={1}
        minimumTrackTintColor="#4964D8"
        maximumTrackTintColor="#C7D2FE"
        thumbTintColor="#4964D8"
        onValueChange={onChange}
      />
    </View>
  )
}
