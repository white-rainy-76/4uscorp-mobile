import React from 'react'
import Svg, { Path } from 'react-native-svg'

interface IconProps {
  width?: number
  height?: number
  color?: string
}

export const PriceIcon: React.FC<IconProps> = ({
  width = 19,
  height = 33,
  color = '#4964D8',
}) => (
  <Svg width={width} height={height} viewBox="0 0 19 33" fill="none">
    <Path
      d="M9.49984 1V32"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.9583 6.63635H6.27083C3.77405 6.63635 1.75 8.8444 1.75 11.5682C1.75 14.2919 3.77405 16.5 6.27083 16.5H12.7292C15.226 16.5 17.25 18.708 17.25 21.4318C17.25 24.1556 15.226 26.3636 12.7292 26.3636H1.75"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)
