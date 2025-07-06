import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'

export default function RouteScreen() {
  const [fromLocation, setFromLocation] = useState('')
  const [toLocation, setToLocation] = useState('')

  const handleSearch = () => {
    // Здесь будет логика поиска маршрута
    console.log('Поиск маршрута:', fromLocation, 'к', toLocation)
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color="#007AFF" />
          <TextInput
            style={styles.input}
            placeholder="Откуда"
            value={fromLocation}
            onChangeText={setFromLocation}
            placeholderTextColor="#8E8E93"
          />
        </View>

        <View style={styles.swapContainer}>
          <TouchableOpacity style={styles.swapButton}>
            <Ionicons name="swap-vertical" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location" size={20} color="#FF3B30" />
          <TextInput
            style={styles.input}
            placeholder="Куда"
            value={toLocation}
            onChangeText={setToLocation}
            placeholderTextColor="#8E8E93"
          />
        </View>

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Найти маршрут</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <Ionicons name="map-outline" size={60} color="#C7C7CC" />
          <Text style={styles.mapText}>Карта будет здесь</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="home-outline" size={24} color="#007AFF" />
          <Text style={styles.actionText}>Домой</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="briefcase-outline" size={24} color="#007AFF" />
          <Text style={styles.actionText}>На работу</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="time-outline" size={24} color="#007AFF" />
          <Text style={styles.actionText}>История</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#000000',
  },
  swapContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5F3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  searchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapText: {
    fontSize: 16,
    color: '#C7C7CC',
    marginTop: 10,
  },
  quickActions: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 5,
  },
})
