import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { logout } from './auth.service'
import { logoutPayloadSchema } from './payload/logout.payload'
import { LogoutPayload } from './types/auth.payload'

export function useLogoutMutation(
  options: Pick<
    UseMutationOptions<
      void,
      DefaultError,
      LogoutPayload,
      { abortController: AbortController }
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['auth', 'logout', ...mutationKey],

    mutationFn: async (payload: LogoutPayload) => {
      const validatedPayload = logoutPayloadSchema.parse(payload)
      const controller = new AbortController()
      return logout(validatedPayload, controller.signal)
    },

    onMutate: async (variables) => {
      const controller = new AbortController()
      await onMutate?.(variables)
      return { abortController: controller }
    },

    onSuccess: async (data, variables, context) => {
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
