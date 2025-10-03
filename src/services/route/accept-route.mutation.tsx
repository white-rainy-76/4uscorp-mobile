import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'

import { acceptRoutePayloadSchema } from './payload/route.payload'
import { acceptRoute } from './route.service'
import { AcceptRoutePayload } from './types/route.payload'

export function useAcceptRouteMutation(
  options: Pick<
    UseMutationOptions<
      void,
      DefaultError,
      AcceptRoutePayload,
      { abortController: AbortController }
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['routes', 'acceptRoute', ...mutationKey],

    mutationFn: async (payload: AcceptRoutePayload) => {
      const validatedPayload = acceptRoutePayloadSchema.parse(payload)
      const controller = new AbortController()
      return acceptRoute(validatedPayload, controller.signal)
    },

    onMutate: async (variables) => {
      const controller = new AbortController()
      await onMutate?.(variables)
      return { abortController: controller }
    },

    onError: (error, variables, context) => {
      if (context?.abortController) {
        context.abortController.abort('Request cancelled due to error')
      }
      onError?.(error, variables, context)
    },
    onSuccess: (data, variables, context) => {
      onSuccess?.(data, variables, context)
    },
    onSettled: (data, error, variables, context) => {
      onSettled?.(data, error, variables, context)
    },
  })
}
