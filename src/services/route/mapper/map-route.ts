import { RouteDataSchema } from '../contracts/route.contract'
import { RouteData } from '../types/route'
import { RouteDataDto } from '../types/route.dto'

/**
 * Converts route data from DTO format (received from server)
 * to format used within the application.
 *
 * @param rawRouteData Route data in DTO format.
 * @returns Route data in application format.
 */
export const mapRouteDataDtoToRouteData = (raw: RouteDataDto): RouteData => {
  const mapped = {
    truckId: raw.truckId,
    originName: raw.originName,
    destinationName: raw.destinationName,
    origin: raw.origin,
    destination: raw.destination,
    weight: raw.weight,
    route: raw.routeDto.isRoute
      ? {
          isRoute: true,
          currentLocation: null,
          formattedLocation: raw.routeDto.formattedLocation,
          routeId: raw.routeDto.routeId,
          mapPoints: raw.routeDto.mapPoints.map((point) => ({
            latitude: point.latitude,
            longitude: point.longitude,
          })),
        }
      : {
          isRoute: false,
          currentLocation: raw.routeDto.currentLocation,
          formattedLocation: raw.routeDto.formattedLocation,
          routeId: null,
          mapPoints: raw.routeDto.mapPoints,
        },
  }

  return RouteDataSchema.parse(mapped)
}
