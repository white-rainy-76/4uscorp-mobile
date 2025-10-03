import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'

import { getRouteByIdPayloadSchema } from './payload/route.payload'
import { getRouteById } from './route.service'
import { RouteByIdData } from './types/route'
import { RouteByIdPayload } from './types/route.payload'

export function useGetRouteByIdMutation(
  options: Pick<
    UseMutationOptions<
      RouteByIdData,
      DefaultError,
      RouteByIdPayload,
      { abortController: AbortController }
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['routes', 'getById', ...mutationKey],

    mutationFn: async (payload: RouteByIdPayload) => {
      const validatedPayload = getRouteByIdPayloadSchema.parse(payload)
      const controller = new AbortController()
      return getRouteById(validatedPayload, controller.signal)
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
