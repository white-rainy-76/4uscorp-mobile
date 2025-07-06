import { CoordinatesDtoSchema } from '@/services/contracts/coordinates.dto.contract'
import { z } from 'zod'

export const RouteSchema = z.object({
  isRoute: z.boolean(),
  routeId: z.string(),
  currentLocation: CoordinatesDtoSchema.nullable(),
  mapPoints: z.array(z.tuple([z.number(), z.number()])),
})

export const RouteDataSchema = z.object({
  truckId: z.string(),
  originName: z.string(),
  destinationName: z.string(),
  origin: CoordinatesDtoSchema,
  destination: CoordinatesDtoSchema,
  routeDto: RouteSchema,
  weight: z.number(),
})
