import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

interface Props {
  placeholder: string
  onPlaceSelected: (description: string, details: any) => void
  initialValue?: string
}

export const GooglePlacesInput = ({
  placeholder,
  onPlaceSelected,
  initialValue = '',
}: Props) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        fetchDetails
        query={{
          key: 'AIzaSyCq9ygETQJ-8eStWqHUa-XvF1ihD32NyDU',
          language: 'en',
        }}
        onPress={(data, details = null) => {
          onPlaceSelected(data.description, details)
        }}
        textInputProps={{
          defaultValue: initialValue,
        }}
        styles={{
          textInput: styles.input,
          container: { flex: 0 },
        }}
        enablePoweredByContainer={false}
        debounce={300}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: '#F2F2F2',
    height: 44,
    borderRadius: 22,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#343434',
  },
})
