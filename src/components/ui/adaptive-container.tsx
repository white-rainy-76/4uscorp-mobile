// import { useOrientation } from '@/shared/lib/hooks/use-orientation'
// import React from 'react'
// import { View } from 'react-native'

// interface AdaptiveContainerProps {
//   children: React.ReactNode
//   className?: string
//   maxWidth?: number
// }

// export const AdaptiveContainer: React.FC<AdaptiveContainerProps> = ({
//   children,
//   className = '',
//   maxWidth = 1200,
// }) => {
//   const { screenWidth, isTablet } = useOrientation()

//   if (!isTablet) {
//     return <View className={className}>{children}</View>
//   }

//   const containerWidth = Math.min(screenWidth, maxWidth)
//   const marginHorizontal = (screenWidth - containerWidth) / 2

//   return (
//     <View
//       className={className}
//       style={{
//         width: containerWidth,
//         marginHorizontal: marginHorizontal > 0 ? marginHorizontal : 0,
//       }}>
//       {children}
//     </View>
//   )
// }
