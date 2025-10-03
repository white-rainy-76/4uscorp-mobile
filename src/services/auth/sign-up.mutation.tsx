import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { signUp } from './auth.service'
import { signUpPayloadSchema } from './payload/auth.payload'
import { AuthResponse } from './types/auth'
import { SignUpPayload } from './types/auth.payload'

export function useSignUpMutation(
  options: Pick<
    UseMutationOptions<
      AuthResponse,
      DefaultError,
      SignUpPayload,
      { abortController: AbortController }
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['auth', 'signUp', ...mutationKey],

    mutationFn: async (payload: SignUpPayload) => {
      const validatedPayload = signUpPayloadSchema.parse(payload)
      const controller = new AbortController()
      return signUp(validatedPayload, controller.signal)
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
