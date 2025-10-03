// Temporarily replaced with regular ScrollView to avoid long path issues
/**
 * This component is used to handle the keyboard in a modal.
 * Temporarily using regular ScrollView instead of KeyboardAwareScrollView
 * to avoid Windows long path issues with react-native-keyboard-controller.
 */
import {
  type BottomSheetScrollViewMethods,
  createBottomSheetScrollableComponent,
  SCROLLABLE_TYPE,
} from '@gorhom/bottom-sheet'
import { type BottomSheetScrollViewProps } from '@gorhom/bottom-sheet/src/components/bottomSheetScrollable/types'
import { memo } from 'react'
import { ScrollView } from 'react-native'
import Reanimated from 'react-native-reanimated'

const AnimatedScrollView = Reanimated.createAnimatedComponent(ScrollView)
const BottomSheetScrollViewComponent = createBottomSheetScrollableComponent<
  BottomSheetScrollViewMethods,
  BottomSheetScrollViewProps
>(SCROLLABLE_TYPE.SCROLLVIEW, AnimatedScrollView)
const BottomSheetKeyboardAwareScrollView = memo(BottomSheetScrollViewComponent)

BottomSheetKeyboardAwareScrollView.displayName =
  'BottomSheetKeyboardAwareScrollView'

export default BottomSheetKeyboardAwareScrollView as (
  props: BottomSheetScrollViewProps,
) => ReturnType<typeof BottomSheetKeyboardAwareScrollView>
