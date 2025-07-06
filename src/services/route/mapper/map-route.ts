import { RouteData } from '../types/route'
import { RouteDataDto } from '../types/route.dto'

/**
 * Преобразует данные маршрута из формата DTO (полученные с сервера)
 * в формат, используемый внутри приложения.
 *
 * @param rawRouteData Данные маршрута в формате DTO.
 * @returns Данные маршрута в формате приложения.
 */
export const mapRouteDataDtoToRouteData = (
  rawRouteData: RouteDataDto
): RouteData => {
  return {
    truckId: rawRouteData.truckId,
    originName: rawRouteData.originName,
    destinationName: rawRouteData.destinationName,
    origin: rawRouteData.origin,
    destination: rawRouteData.destination,
    weight: rawRouteData.weight,
    routeDto: {
      isRoute: rawRouteData.routeDto.isRoute,
      routeId: rawRouteData.routeDto.routeId,
      currentLocation: rawRouteData.routeDto.currentLocation,
      mapPoints: rawRouteData.routeDto.mapPoints,
    },
  }
}
