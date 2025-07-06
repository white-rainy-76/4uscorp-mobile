import * as React from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

export const WeightIcon = ({ color = '#4964D8', ...props }: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.6667 0.666687H1.33341C0.965225 0.666687 0.666748 0.965164 0.666748 1.33335V14.6667C0.666748 15.0349 0.965225 15.3334 1.33341 15.3334H14.6667C15.0349 15.3334 15.3334 15.0349 15.3334 14.6667V1.33335C15.3334 0.965164 15.0349 0.666687 14.6667 0.666687ZM3.33341 8.00002C3.33341 5.42269 5.42275 3.33335 8.00008 3.33335C10.5774 3.33335 12.6667 5.42269 12.6667 8.00002H3.33341Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.02949 7.33333C9.04216 6.282 8.96749 4.81 8.96749 4.81C8.96749 4.81 7.72149 6.486 7.22949 7.33333H9.02949Z"
      fill={color}
    />
  </Svg>
)
