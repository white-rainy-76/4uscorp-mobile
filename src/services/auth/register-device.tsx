import { setDeviceRegistered } from '@/shared/lib/storage'
import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { registerDevice } from './auth.service'
import { registerDevicePayloadSchema } from './payload/register-device.payload'
import { RegisterDevicePayload } from './types/auth.payload'

export function useRegisterDeviceMutation(
  options: Pick<
    UseMutationOptions<
      void,
      DefaultError,
      RegisterDevicePayload,
      { abortController: AbortController }
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['auth', 'registerDevice', ...mutationKey],

    mutationFn: async (payload: RegisterDevicePayload) => {
      const validatedPayload = registerDevicePayloadSchema.parse(payload)
      const controller = new AbortController()
      return registerDevice(validatedPayload, controller.signal)
    },

    onMutate: async (variables) => {
      const controller = new AbortController()
      await onMutate?.(variables)
      return { abortController: controller }
    },

    onSuccess: async (data, variables, context) => {
      // Set flag that device is registered
      await setDeviceRegistered(true)
      console.log('Device successfully registered, flag set')

      await Promise.all([onSuccess?.(data, variables, context)])
    },

    onError: (error, variables, context) => {
      if (context?.abortController) {
        context.abortController.abort('Request cancelled due to error')
      }
      onError?.(error, variables, context)
    },

    onSettled: (data, error, variables, context) => {
      if (context?.abortController) {
        context.abortController.abort('Request settled')
      }
      onSettled?.(data, error, variables, context)
    },
  })
}
