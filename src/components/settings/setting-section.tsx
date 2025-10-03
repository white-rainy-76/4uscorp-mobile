import { useTheme } from '@/shared/lib/theme'
import React from 'react'
import { Text, View } from 'react-native'

/**
 * @interface SettingsSectionProps
 * @property {string} title - Section title.
 * @property {React.ReactNode} children - Child elements (SettingsItem) that will be displayed inside the section.
 */
interface SettingsSectionProps {
  title: string
  children: React.ReactNode
}

/**
 * Component for displaying settings section with title and content.
 * @param {SettingsSectionProps} props - Component properties.
 */
export function SettingsSection({ title, children }: SettingsSectionProps) {
  const { theme } = useTheme()

  return (
    <View className="mb-[30px]">
      <Text
        className="text-xs font-semibold uppercase mb-2 mx-5"
        style={{ color: theme.colors.text.secondary }}>
        {title}
      </Text>

      <View
        className="border-t border-b"
        style={{
          backgroundColor: theme.colors.background.secondary,
          borderTopColor: theme.colors.border.primary,
          borderBottomColor: theme.colors.border.primary,
        }}>
        {children}
      </View>
    </View>
  )
}
