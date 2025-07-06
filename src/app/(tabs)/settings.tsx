import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true)
  const [locationServices, setLocationServices] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const SettingsItem = ({
    icon,
    title,
    value,
    onPress,
    showSwitch = false,
    switchValue,
    onSwitchChange,
  }: {
    icon: string
    title: string
    value?: string
    onPress?: () => void
    showSwitch?: boolean
    switchValue?: boolean
    onSwitchChange?: (value: boolean) => void
  }) => (
    <TouchableOpacity style={styles.settingItem} onPress={onPress}>
      <View style={styles.settingItemLeft}>
        <Ionicons name={icon as any} size={22} color="#007AFF" />
        <Text style={styles.settingTitle}>{title}</Text>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#C7C7CC', true: '#007AFF' }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <View style={styles.settingItemRight}>
          {value && <Text style={styles.settingValue}>{value}</Text>}
          <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Уведомления</Text>
        <View style={styles.sectionContent}>
          <SettingsItem
            icon="notifications-outline"
            title="Push-уведомления"
            showSwitch={true}
            switchValue={pushNotifications}
            onSwitchChange={setPushNotifications}
          />
          <SettingsItem
            icon="location-outline"
            title="Службы геолокации"
            showSwitch={true}
            switchValue={locationServices}
            onSwitchChange={setLocationServices}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Внешний вид</Text>
        <View style={styles.sectionContent}>
          <SettingsItem
            icon="moon-outline"
            title="Тёмная тема"
            showSwitch={true}
            switchValue={darkMode}
            onSwitchChange={setDarkMode}
          />
          <SettingsItem
            icon="language-outline"
            title="Язык"
            value="Русский"
            onPress={() => console.log('Открыть выбор языка')}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Поддержка</Text>
        <View style={styles.sectionContent}>
          <SettingsItem
            icon="help-circle-outline"
            title="Справка"
            onPress={() => console.log('Открыть справку')}
          />
          <SettingsItem
            icon="chatbubble-outline"
            title="Обратная связь"
            onPress={() => console.log('Открыть обратную связь')}
          />
          <SettingsItem
            icon="information-circle-outline"
            title="О приложении"
            value="v1.0.0"
            onPress={() => console.log('Открыть информацию о приложении')}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    marginTop: 25,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    textTransform: 'uppercase',
    marginBottom: 8,
    marginHorizontal: 20,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#E1E1E1',
    borderBottomColor: '#E1E1E1',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 15,
  },
  settingItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 16,
    color: '#8E8E93',
    marginRight: 8,
  },
})
