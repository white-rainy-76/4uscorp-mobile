import { CoordinatesDtoSchema } from '@/services/contracts/coordinates.dto.contract'
import { GasStationSchema } from '@/services/gas-station/contracts/gas-station.contract'

import { z } from 'zod'

// current route

export const LatLngSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
})

const RouteWithRouteSchema = z.object({
  isRoute: z.literal(true),
  currentLocation: CoordinatesDtoSchema.nullable(),
  formattedLocation: z.string(),
  routeId: z.string(),
  mapPoints: z.array(LatLngSchema),
})

const RouteWithoutRouteSchema = z.object({
  isRoute: z.literal(false),
  currentLocation: CoordinatesDtoSchema,
  formattedLocation: z.string(),
  routeId: z.null(),
  mapPoints: z.array(LatLngSchema),
})

export const RouteSchema = z.discriminatedUnion('isRoute', [
  RouteWithRouteSchema,
  RouteWithoutRouteSchema,
])

export const RouteDataSchema = z.object({
  truckId: z.string(),
  originName: z.string().nullable(),
  destinationName: z.string().nullable(),
  origin: CoordinatesDtoSchema.nullable(),
  destination: CoordinatesDtoSchema.nullable(),
  weight: z.number(),
  route: RouteSchema,
})

// route by id
export const RouteInfoSchema = z.object({
  tolls: z.number(),
  gallons: z.number(),
  miles: z.number(),
  driveTime: z.number(),
})

export const RouteByIdSchema = z.object({
  routeId: z.string().uuid(),
  originName: z.string(),
  destinationName: z.string(),
  origin: CoordinatesDtoSchema,
  destination: CoordinatesDtoSchema,
  weight: z.number(),
  routeInfo: RouteInfoSchema,
  remainingFuel: z.number(),
  sectionId: z.string(),
  mapPoints: z.array(LatLngSchema),
  fuelStations: z.array(GasStationSchema),
})

// new assigned route endpoint - domain models (after mapping)
export const AssignedRouteSchema = z.object({
  routeId: z.string().nullable(),
  originName: z.string().nullable(),
  destinationName: z.string().nullable(),
  origin: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .nullable(),
  destination: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .nullable(),
  weight: z.number(),
  remainingFuel: z.number(),
  sectionId: z.string().nullable(),
  mapPoints: z.array(z.array(z.number())),
  fuelStations: z.array(GasStationSchema),
  routeInfo: RouteInfoSchema,
})

export const PassedRouteSchema = z.object({
  isRoute: z.boolean(),
  formattedLocation: z.string().nullable(),
  currentLocation: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  routeId: z.string().nullable(),
  mapPoints: z.array(
    z.object({
      latitude: z.number(),
      longitude: z.number(),
    }),
  ),
})

export const CurrentLocationSchema = z.object({
  formattedLocation: z.string().nullable(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
})

export const AssignedRouteWithPassedRouteSchema = z.object({
  currentLocation: CurrentLocationSchema,
  assignedRoute: AssignedRouteSchema.nullable(),
  passedRoute: PassedRouteSchema.nullable(),
})

export const GetAssignedRouteByTruckIdSchema = z.object({
  hasAssigned: z.boolean(),
  assignedWithPassedRoute: AssignedRouteWithPassedRouteSchema,
})
