import { CoordinatesDtoSchema } from '@/services/contracts/coordinates.dto.contract'
import { GasStationDtoSchema } from '@/services/gas-station/contracts/gas-station.contract.dto'
import z from 'zod'

// get current route
const MapPointSchema = CoordinatesDtoSchema

const RouteDtoWithRouteSchema = z.object({
  isRoute: z.literal(true),
  currentLocation: CoordinatesDtoSchema.nullable(),
  formattedLocation: z.string(),
  routeId: z.string(),
  mapPoints: z.array(MapPointSchema),
})

const RouteDtoWithoutRouteSchema = z.object({
  isRoute: z.literal(false),
  currentLocation: CoordinatesDtoSchema,
  formattedLocation: z.string(),
  routeId: z.null(),
  mapPoints: z.array(MapPointSchema),
})

export const RouteDtoSchema = z.discriminatedUnion('isRoute', [
  RouteDtoWithRouteSchema,
  RouteDtoWithoutRouteSchema,
])

export const RouteDataDtoSchema = z.object({
  truckId: z.string(),
  originName: z.string().nullable(),
  destinationName: z.string().nullable(),
  origin: CoordinatesDtoSchema.nullable(),
  destination: CoordinatesDtoSchema.nullable(),
  weight: z.number(),
  routeDto: RouteDtoSchema,
})

// get by id route
export const RouteInfoDtoSchema = z.object({
  tolls: z.number(),
  gallons: z.number(),
  miles: z.number(),
  driveTime: z.number(),
})

export const RouteByIdDtoSchema = z.object({
  routeId: z.string().uuid(),
  originName: z.string(),
  destinationName: z.string(),
  weight: z.number(),
  routeInfo: RouteInfoDtoSchema,
  origin: CoordinatesDtoSchema,
  destination: CoordinatesDtoSchema,
  remainingFuel: z.number(),
  sectionId: z.string(),
  mapPoints: z.array(z.array(z.number())),
  fuelStationDtos: z.array(GasStationDtoSchema),
})

// new assigned route endpoint DTOs
export const AssignedRouteDtoSchema = z.object({
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
  weight: z.number(), // API returns number
  remainingFuel: z.number(), // API returns number
  sectionId: z.string().nullable(),
  mapPoints: z.array(z.array(z.number())), // API returns number array
  fuelStationDtos: z.array(GasStationDtoSchema),
  routeInfo: RouteInfoDtoSchema,
})

export const PassedRouteDtoSchema = z.object({
  isRoute: z.boolean(),
  formattedLocation: z.string().nullable(),
  currentLocation: z.object({
    latitude: z.number(), // API returns number
    longitude: z.number(), // API returns number
  }),
  routeId: z.string().nullable(),
  mapPoints: z.array(
    z.object({
      latitude: z.number(), // API returns number
      longitude: z.number(), // API returns number
    }),
  ),
})

export const CurrentLocationDtoSchema = z.object({
  formattedLocation: z.string().nullable(),
  location: z.object({
    latitude: z.number(), // API returns number
    longitude: z.number(), // API returns number
  }),
})

export const AssignedRouteWithPassedRouteDtoSchema = z.object({
  currentLocation: CurrentLocationDtoSchema,
  assignedRoute: AssignedRouteDtoSchema.nullable(),
  passedRoute: PassedRouteDtoSchema.nullable(),
})

export const GetAssignedRouteByTruckIdDtoSchema = z.object({
  hasAssigned: z.boolean(),
  assignedWithPassedRoute: AssignedRouteWithPassedRouteDtoSchema.nullable(),
})
