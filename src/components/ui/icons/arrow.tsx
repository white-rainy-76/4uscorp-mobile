import * as React from 'react'
import type { SvgProps } from 'react-native-svg'
import Svg, { Path } from 'react-native-svg'

export const ArrowIcon = ({ color = '#343434', ...props }: SvgProps) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.9224 9.41084L12.4999 2.98834L11.3216 4.16668L16.3216 9.16668H1.66659C1.20575 9.16668 0.833252 9.54001 0.833252 10C0.833252 10.46 1.20575 10.8333 1.66659 10.8333H16.3216L11.3216 15.8333L12.4999 17.0117L18.9224 10.5892C19.2483 10.2633 19.2483 9.73668 18.9224 9.41084Z"
      fill={color}
    />
  </Svg>
)
