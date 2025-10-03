import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query'
import { getAssignedRouteByTruckIdPayloadSchema } from './payload/route.payload'
import { getAssignedRouteByTruckId } from './route.service'
import { GetAssignedRouteByTruckIdData } from './types/route'
import { GetAssignedRouteByTruckIdPayload } from './types/route.payload'

export function useGetAssignedRouteByTruckIdMutation(
  options: Pick<
    UseMutationOptions<
      GetAssignedRouteByTruckIdData,
      DefaultError,
      GetAssignedRouteByTruckIdPayload,
      { abortController: AbortController }
    >,
    'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
  > = {},
) {
  const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

  return useMutation({
    mutationKey: ['route', 'getAssignedRouteByTruckId', ...mutationKey],

    mutationFn: async (payload: GetAssignedRouteByTruckIdPayload) => {
      const validatedPayload =
        getAssignedRouteByTruckIdPayloadSchema.parse(payload)
      const controller = new AbortController()
      return getAssignedRouteByTruckId(validatedPayload, controller.signal)
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
