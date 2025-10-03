import { SettingsItem } from '@/components/settings/setting-item'
import { SettingsSection } from '@/components/settings/setting-section'
import { signOut } from '@/shared/lib/auth'
import { useCurrentLanguage, useTranslation } from '@/shared/lib/i18n'
import { clearAllStorage } from '@/shared/lib/storage'
import { useTheme } from '@/shared/lib/theme'
import { useState } from 'react'
import { Alert, ScrollView } from 'react-native'

export default function SettingsScreen() {
  const { t } = useTranslation()
  const { theme, themeMode, toggleTheme } = useTheme()
  const [pushNotifications, setPushNotifications] = useState(true)
  const [locationServices, setLocationServices] = useState(true)
  const { language, toggleLanguage } = useCurrentLanguage()

  const handleSignOut = () => {
    signOut()
  }

  const handleClearStorage = () => {
    Alert.alert(
      'Clear All Data',
      'This will delete all app data and reset the app to first launch state. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await clearAllStorage()
            Alert.alert(
              'Success',
              'All data has been cleared. Please restart the app.',
            )
          },
        },
      ],
    )
  }

  const handleLanguageChange = () => {
    console.log(`Toggling language from ${language}`)
    toggleLanguage()
  }

  const getLanguageDisplayName = (lang: string) => {
    return lang === 'en' ? 'English' : 'Русский'
  }

  return (
    <ScrollView
      className="flex-1 pt-[25px]"
      style={{ backgroundColor: theme.colors.background.primary }}>
      <SettingsSection title={t('settings.notifications')}>
        <SettingsItem
          icon="notifications-outline"
          title={t('settings.push_notifications')}
          showSwitch={true}
          switchValue={pushNotifications}
          onSwitchChange={setPushNotifications}
        />
        <SettingsItem
          icon="location-outline"
          title={t('settings.location_services')}
          showSwitch={true}
          switchValue={locationServices}
          onSwitchChange={setLocationServices}
          isLastItem={true}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.appearance')}>
        <SettingsItem
          icon="moon-outline"
          title={t('settings.dark_theme')}
          showSwitch={true}
          switchValue={themeMode === 'dark'}
          onSwitchChange={toggleTheme}
        />
        <SettingsItem
          icon="language-outline"
          title={t('settings.language')}
          value={getLanguageDisplayName(language)}
          onPress={handleLanguageChange}
          isLastItem={true}
        />
      </SettingsSection>

      <SettingsSection title={t('settings.account')}>
        <SettingsItem
          icon="log-out-outline"
          title={t('settings.sign_out')}
          onPress={handleSignOut}
          isSignOut={true}
          isLastItem={true}
        />
      </SettingsSection>

      {__DEV__ && (
        <SettingsSection title="Development">
          <SettingsItem
            icon="trash-outline"
            title="Clear All Data"
            onPress={handleClearStorage}
            isLastItem={true}
          />
        </SettingsSection>
      )}
    </ScrollView>
  )
}
