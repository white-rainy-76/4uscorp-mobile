import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    'portrait',
  )
  const [screenData, setScreenData] = useState(Dimensions.get('window'))

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData(window)
      setOrientation(window.width > window.height ? 'landscape' : 'portrait')
    })

    return () => subscription?.remove()
  }, [])

  return {
    orientation,
    isLandscape: orientation === 'landscape',
    isPortrait: orientation === 'portrait',
    screenWidth: screenData.width,
    screenHeight: screenData.height,
    isTablet: Math.min(screenData.width, screenData.height) >= 600,
  }
}
