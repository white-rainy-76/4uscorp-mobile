import { mapGasStationDtoToGasStation } from '@/services/gas-station/mapper/map-gas-stations'
import { z } from 'zod'
import {
  AssignedRouteWithPassedRouteDtoSchema,
  GetAssignedRouteByTruckIdDtoSchema,
} from '../contracts/route.contract.dto'
import {
  AssignedRouteWithPassedRouteData,
  GetAssignedRouteByTruckIdData,
} from '../types/route'

/**
 * Converts string coordinates to numbers
 */
function parseCoordinate(coord: string | number): number {
  if (typeof coord === 'string') {
    const parsed = parseFloat(coord)
    return isNaN(parsed) ? 0 : parsed
  }
  return coord
}

/**
 * Converts coordinate array in [longitude, latitude] format to number array
 * API returns mapPoints in format [[longitude, latitude], ...]
 * Domain model expects number[][]
 */
function parseMapPoints(mapPoints: number[][]): number[][] {
  return mapPoints
    .filter((point) => point.length >= 2)
    .map((point) => [
      parseCoordinate(point[0]), // longitude
      parseCoordinate(point[1]), // latitude
    ])
    .filter((point) => point[0] !== 0 && point[1] !== 0)
}

/**
 * Mapper for converting DTO to AssignedRouteWithPassedRoute domain model
 */
export function mapAssignedRouteWithPassedRouteDtoToAssignedRouteWithPassedRoute(
  dto: z.infer<typeof AssignedRouteWithPassedRouteDtoSchema>,
): AssignedRouteWithPassedRouteData {
  return {
    currentLocation: {
      formattedLocation: dto.currentLocation.formattedLocation,
      location: {
        latitude: dto.currentLocation.location.latitude,
        longitude: dto.currentLocation.location.longitude,
      },
    },
    assignedRoute: dto.assignedRoute
      ? {
          routeId: dto.assignedRoute.routeId,
          originName: dto.assignedRoute.originName,
          destinationName: dto.assignedRoute.destinationName,
          origin: dto.assignedRoute.origin,
          destination: dto.assignedRoute.destination,
          weight: dto.assignedRoute.weight,
          remainingFuel: dto.assignedRoute.remainingFuel,
          sectionId: dto.assignedRoute.sectionId,
          mapPoints: parseMapPoints(dto.assignedRoute.mapPoints),
          fuelStations: dto.assignedRoute.fuelStationDtos.map(
            mapGasStationDtoToGasStation,
          ),
          routeInfo: {
            tolls: dto.assignedRoute.routeInfo.tolls,
            gallons: dto.assignedRoute.routeInfo.gallons,
            miles: dto.assignedRoute.routeInfo.miles,
            driveTime: dto.assignedRoute.routeInfo.driveTime,
          },
        }
      : null,
    passedRoute: dto.passedRoute
      ? {
          isRoute: dto.passedRoute.isRoute,
          formattedLocation: dto.passedRoute.formattedLocation,
          currentLocation: {
            latitude: dto.passedRoute.currentLocation.latitude,
            longitude: dto.passedRoute.currentLocation.longitude,
          },
          routeId: dto.passedRoute.routeId,
          mapPoints: dto.passedRoute.mapPoints, // Already correct type in DTO
        }
      : null,
  }
}

/**
 * Mapper for converting DTO to GetAssignedRouteByTruckId domain model
 */
export function mapGetAssignedRouteByTruckIdDtoToGetAssignedRouteByTruckId(
  dto: z.infer<typeof GetAssignedRouteByTruckIdDtoSchema>,
): GetAssignedRouteByTruckIdData {
  return {
    hasAssigned: dto.hasAssigned,
    assignedWithPassedRoute: dto.assignedWithPassedRoute
      ? mapAssignedRouteWithPassedRouteDtoToAssignedRouteWithPassedRoute(
          dto.assignedWithPassedRoute,
        )
      : {
          currentLocation: {
            formattedLocation: null,
            location: {
              latitude: 0,
              longitude: 0,
            },
          },
          assignedRoute: null,
          passedRoute: null,
        },
  }
}
