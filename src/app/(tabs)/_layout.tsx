import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4964D8',
        tabBarInactiveTintColor: '#9e9ea3',
        headerStyle: {
          backgroundColor: '#4964D8',
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'Nunito',
          fontWeight: '500',
          fontSize: 20,
        },
        tabBarStyle: {
          backgroundColor: '#F8F9FA',
          borderTopWidth: 1,
          borderTopColor: '#E1E1E1',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Личный кабинет',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="route"
        options={{
          title: 'Маршрут',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Настройки',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}
