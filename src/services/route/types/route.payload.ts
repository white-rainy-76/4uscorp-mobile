import { z } from 'zod'
import {
  acceptRoutePayloadSchema,
  assignRoutePayloadSchema,
  getAssignedRouteByTruckIdPayloadSchema,
  getRouteByIdPayloadSchema,
  getRoutePayloadSchema,
  declineFuelRoutePayloadSchema,
  completeRoutePayloadSchema,
} from '../payload/route.payload'

export type GetRoutePayload = z.infer<typeof getRoutePayloadSchema>
export type RouteByIdPayload = z.infer<typeof getRouteByIdPayloadSchema>
export type AssignRoutePayload = z.infer<typeof assignRoutePayloadSchema>
export type AcceptRoutePayload = z.infer<typeof acceptRoutePayloadSchema>
export type GetAssignedRouteByTruckIdPayload = z.infer<
  typeof getAssignedRouteByTruckIdPayloadSchema
>
export type DeclineFuelRoutePayload = z.infer<typeof declineFuelRoutePayloadSchema>
export type CompleteRoutePayload = z.infer<typeof completeRoutePayloadSchema>
