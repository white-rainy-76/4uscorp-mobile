import { mapGasStationDtoToGasStation } from '@/services/gas-station/mapper/map-gas-stations'
import { GasStation } from '@/services/gas-station/types/gas-station'
import { Coordinate } from '@/shared/types'
import { RouteByIdData } from '../types/route'
import { RouteByIdDataDto } from '../types/route.dto'

export const mapRouteByIdDtoToRouteById = (
  dto: RouteByIdDataDto,
): RouteByIdData => {
  const mappedMapPoints: Coordinate[] = dto.mapPoints.map((point) => ({
    latitude: point[0],
    longitude: point[1],
  }))
  const mappedFuelStations: GasStation[] = dto.fuelStationDtos.map(
    mapGasStationDtoToGasStation,
  )
  return {
    routeId: dto.routeId,
    originName: dto.originName,
    destinationName: dto.destinationName,
    weight: dto.weight,
    routeInfo: {
      tolls: dto.routeInfo.tolls,
      gallons: dto.routeInfo.gallons,
      miles: dto.routeInfo.miles,
      driveTime: dto.routeInfo.driveTime,
    },
    origin: dto.origin,
    destination: dto.destination,
    sectionId: dto.sectionId,
    remainingFuel: dto.remainingFuel,
    mapPoints: mappedMapPoints,
    fuelStations: mappedFuelStations,
  }
}
