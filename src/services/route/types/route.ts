import { z } from 'zod'
import {
  AssignedRouteSchema,
  AssignedRouteWithPassedRouteSchema,
  CurrentLocationSchema,
  GetAssignedRouteByTruckIdSchema,
  PassedRouteSchema,
  RouteByIdSchema,
  RouteDataSchema,
} from '../contracts/route.contract'

export type RouteData = z.infer<typeof RouteDataSchema>
export type RouteByIdData = z.infer<typeof RouteByIdSchema>

// New types for assigned route endpoint
export type GetAssignedRouteByTruckIdData = z.infer<
  typeof GetAssignedRouteByTruckIdSchema
>
export type AssignedRouteWithPassedRouteData = z.infer<
  typeof AssignedRouteWithPassedRouteSchema
>
export type AssignedRouteData = z.infer<typeof AssignedRouteSchema>
export type PassedRouteData = z.infer<typeof PassedRouteSchema>
export type CurrentLocationData = z.infer<typeof CurrentLocationSchema>
