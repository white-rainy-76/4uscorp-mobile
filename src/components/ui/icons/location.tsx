import * as React from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

export const LocationIcon = ({ color, ...props }: SvgProps) => (
  <Svg width={15} height={20} viewBox="0 0 15 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.5 0C3.83333 0 0 2.83333 0 7.5C0 11.9167 6.66667 18.6667 6.91667 18.9167C7.08333 19.0833 7.25 19.1667 7.5 19.1667C7.75 19.1667 7.91667 19.0833 8.08333 18.9167C8.33333 18.6667 15 11.9167 15 7.5C15 2.83333 11.1667 0 7.5 0ZM7.5 10C6.08333 10 5 8.91667 5 7.5C5 6.08333 6.08333 5 7.5 5C8.91667 5 10 6.08333 10 7.5C10 8.91667 8.91667 10 7.5 10Z"
      fill={color}
    />
  </Svg>
)
//#FFAF2A
//#4964D8
