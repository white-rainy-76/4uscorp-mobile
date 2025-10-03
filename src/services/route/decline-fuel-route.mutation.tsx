import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { declineFuelRoutePayloadSchema } from './payload/route.payload'
import { declineFuelRoute } from './route.service'
import { DeclineFuelRoutePayload } from './types/route.payload'

export function useDeclineFuelRouteMutation(
  options: Pick<
    UseMutationOptions<
      void,
      DefaultError,
      DeclineFuelRoutePayload,
      { abortController: AbortController }
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['route', 'declineFuelRoute', ...mutationKey],

    mutationFn: async (payload: DeclineFuelRoutePayload) => {
      const validatedPayload = declineFuelRoutePayloadSchema.parse(payload)
      const controller = new AbortController()
      return declineFuelRoute(validatedPayload, controller.signal)
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
