// shared/ui/spinner.tsx
import { cn } from '@/shared/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import { View } from 'react-native'

const spinnerVariants = cva('rounded-full border-t-transparent', {
  variants: {
    size: {
      xs: 'w-4 h-4 border',
      sm: 'w-6 h-6 border-2',
      md: 'w-8 h-8 border-2',
      lg: 'w-12 h-12 border-4',
      xl: 'w-16 h-16 border-4',
    },
    color: {
      blue: 'border-blue-500',
      red: 'border-red-500',
      green: 'border-green-500',
      gray: 'border-gray-400',
    },
    speed: {
      slow: 'animate-spin-slow',
      normal: 'animate-spin',
      fast: 'animate-spin-fast',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'blue',
    speed: 'normal',
  },
})

type SpinnerProps = VariantProps<typeof spinnerVariants> & {
  className?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  size,
  color,
  speed,
  className,
}) => {
  return (
    <View className="flex items-center justify-center">
      <View
        className={cn(spinnerVariants({ size, color, speed }), className)}
      />
    </View>
  )
}
