// import { useOrientation } from '@/shared/lib/hooks/use-orientation'
// import React from 'react'
// import { View } from 'react-native'

// interface AdaptiveGridProps {
//   children: React.ReactNode[]
//   columns?: number
// }

// export const AdaptiveGrid: React.FC<AdaptiveGridProps> = ({
//   children,
//   columns = 1,
// }) => {
//   const { isLandscape, isTablet } = useOrientation()

//   const getColumns = () => {
//     if (!isTablet) return 1
//     if (isLandscape) return Math.max(columns, 2)
//     return columns
//   }

//   const cols = getColumns()
//   const itemsPerRow = Math.ceil(children.length / cols)

//   return (
//     <View className="flex-row flex-wrap">
//       {children.map((child, index) => (
//         <View
//           key={index}
//           className={`${cols > 1 ? `w-1/${cols}` : 'w-full'} ${isTablet ? 'p-2' : 'p-1'}`}>
//           {child}
//         </View>
//       ))}
//     </View>
//   )
// }
