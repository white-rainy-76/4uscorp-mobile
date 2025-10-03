import { useOrientation } from '@/shared/lib/hooks/use-orientation'
import { useTheme } from '@/shared/lib/theme'
import React from 'react'
import { View } from 'react-native'

interface RouteIndicatorMobileProps {
  pointCount: number
}

export const RouteIndicator: React.FC<RouteIndicatorMobileProps> = ({
  pointCount,
}) => {
  const { theme } = useTheme()
  const { isTablet } = useOrientation()

  return (
    <View className="items-center py-0 mt-5">
      {Array.from({ length: pointCount }).map((_, index) => (
        <View key={index} className="items-center">
          {/* Circle */}
          <View
            className="w-6 h-6 rounded-full justify-center items-center"
            style={{ backgroundColor: theme.colors.icons.secondary }}>
            <View
              className="w-2 h-2  rounded-full"
              style={{ backgroundColor: theme.colors.background.secondary }}
            />
          </View>
          {/* Dashed lines between circles, except the last one */}
          {index < pointCount - 1 && (
            <View
              className="w-[3px] justify-between items-center overflow-hidden"
              style={{ height: isTablet ? 85 : 175 }}>
              {Array.from({ length: isTablet ? 6 : 10 }).map((_, i) => (
                <View
                  key={i}
                  className="w-[3px] h-2"
                  style={{ backgroundColor: theme.colors.icons.secondary }}
                />
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  )
}
