import { ThemedStatusBar } from '@/components/ui/themed-status-bar'
import { useTranslation } from '@/shared/lib/i18n'
import { useTheme } from '@/shared/lib/theme'
import { useUserStore } from '@/shared/store/user-store'
import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const { canAccessRoutes } = useUserStore()

  return (
    <>
      <ThemedStatusBar />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#4964D8',
          tabBarInactiveTintColor: theme.colors.text.secondary,
          headerStyle: {
            backgroundColor: theme.colors.header.background,
            // borderBottomLeftRadius: 40,
            // borderBottomRightRadius: 40,
            borderBottomWidth: 0,
          },
          headerTintColor: theme.colors.header.text,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'Nunito',
            fontWeight: '500',
            fontSize: 20,
          },
          tabBarStyle: {
            backgroundColor: theme.colors.background.secondary,
            borderTopWidth: 0,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: t('tabs.home'),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t('tabs.settings'),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="settings" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  )
}
