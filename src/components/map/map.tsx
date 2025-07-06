import React from 'react'
import { StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const LA_COORDINATES = {
  latitude: 34.052235,
  longitude: -118.243683,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}

const LOS_ANGELES = { latitude: 34.052235, longitude: -118.243683 }
const LAS_VEGAS = { latitude: 36.1699, longitude: -115.1398 }

export const TruckMap = () => {
  return (
    <MapView
      style={styles.map}
      initialRegion={LA_COORDINATES}
      showsUserLocation>
      <Marker
        coordinate={LOS_ANGELES}
        title="Начало маршрута"
        description="Лос-Анджелес"
      />
      <Marker
        coordinate={LAS_VEGAS}
        title="Конец маршрута"
        description="Лас-Вегас"
        pinColor="blue"
      />
    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    borderRadius: 8,
    height: 200,
  },
})
