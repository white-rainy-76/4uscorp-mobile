import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'

import { assignRoutePayloadSchema } from './payload/route.payload'
import { selfAssignRoute } from './route.service'
import { AssignRoutePayload } from './types/route.payload'

export function useSelfAssignRouteMutation(
  options: Pick<
    UseMutationOptions<
      void,
      DefaultError,
      AssignRoutePayload,
      { abortController: AbortController }
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['routes', 'selfAssignRoute', ...mutationKey],

    mutationFn: async (payload: AssignRoutePayload) => {
      const validatedPayload = assignRoutePayloadSchema.parse(payload)
      const controller = new AbortController()
      return selfAssignRoute(validatedPayload, controller.signal)
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
