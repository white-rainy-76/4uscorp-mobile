import { useTheme } from '@/shared/lib/theme'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Switch, Text, TouchableOpacity, View } from 'react-native'

/**
 * @interface SettingsItemProps
 * @property {string} icon - Ionicons icon name.
 * @property {string} title - Settings item title.
 * @property {string} [value] - Additional value to display on the right.
 * @property {() => void} [onPress] - Function called when element is pressed.
 * @property {boolean} [showSwitch=false] - Flag indicating whether to show switch.
 * @property {boolean} [switchValue] - Switch value.
 * @property {(value: boolean) => void} [onSwitchChange] - Function called when switch value changes.
 * @property {boolean} [isSignOut=false] - Flag indicating whether this is a "Sign out" button (for styling).
 * @property {boolean} [isLastItem=false] - Flag indicating whether this is the last item in the section (for managing bottom border).
 */
interface SettingsItemProps {
  icon: string
  title: string
  value?: string
  onPress?: () => void
  showSwitch?: boolean
  switchValue?: boolean
  onSwitchChange?: (value: boolean) => void
  isSignOut?: boolean
  isLastItem?: boolean
}

/**
 * Component for displaying individual settings item.
 * @param {SettingsItemProps} props - Component properties.
 */
export function SettingsItem({
  icon,
  title,
  value,
  onPress,
  showSwitch = false,
  switchValue,
  onSwitchChange,
  isSignOut = false,
  isLastItem = false,
}: SettingsItemProps) {
  const { theme } = useTheme()

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between px-5 py-[15px] ${
        !isLastItem ? 'border-b' : ''
      }`}
      style={{
        backgroundColor: theme.colors.background.secondary,
        borderBottomColor: !isLastItem
          ? theme.colors.border.secondary
          : undefined,
      }}
      onPress={onPress}>
      <View className="flex-row items-center flex-1">
        <Ionicons
          name={icon as any}
          size={22}
          color={isSignOut ? '#FF3B30' : theme.colors.icons.secondary}
        />

        <Text
          className="text-base ml-[15px]"
          style={{ color: isSignOut ? '#FF3B30' : theme.colors.text.primary }}>
          {title}
        </Text>
      </View>
      {showSwitch ? (
        <Switch
          value={switchValue}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#76767c', true: theme.colors.icons.secondary }}
          thumbColor="#FFFFFF"
        />
      ) : (
        <View className="flex-row items-center">
          {value && (
            <Text
              className="text-base mr-2"
              style={{ color: theme.colors.text.secondary }}>
              {value}
            </Text>
          )}

          {!isSignOut && (
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          )}
        </View>
      )}
    </TouchableOpacity>
  )
}
