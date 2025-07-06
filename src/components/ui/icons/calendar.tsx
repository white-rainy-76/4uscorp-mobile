import * as React from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path, Rect } from 'react-native-svg'

export const CalendarIcon = ({ color = '#A8A8A8', ...props }: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.6666 2.66669V1.33335C12.6666 0.965164 12.3681 0.666687 11.9999 0.666687C11.6317 0.666687 11.3333 0.965164 11.3333 1.33335V2.66669H12.6666Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.66659 2.66669V1.33335C4.66659 0.965164 4.36811 0.666687 3.99992 0.666687C3.63173 0.666687 3.33325 0.965164 3.33325 1.33335V2.66669H4.66659Z"
      fill={color}
    />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14 16H2C0.895431 16 0 15.1046 0 14V5.33337C0 4.2288 0.895431 3.33337 2 3.33337H14C15.1046 3.33337 16 4.2288 16 5.33337V14C16 15.1046 15.1046 16 14 16ZM14.6667 6.66671H1.33333V14C1.33333 14.3682 1.63181 14.6667 2 14.6667H14C14.3682 14.6667 14.6667 14.3682 14.6667 14V6.66671Z"
      fill={color}
    />
    <Rect x="2.66675" y="8" width="2.66667" height={2} fill={color} />
    <Rect x="6.66675" y="8" width="2.66667" height={2} fill={color} />
    <Rect x="2.66675" y="11.3334" width="2.66667" height={2} fill={color} />
    <Rect x="6.66675" y="11.3334" width="2.66667" height={2} fill={color} />
    <Rect x="10.6667" y="8" width="2.66667" height={2} fill={color} />
  </Svg>
)
