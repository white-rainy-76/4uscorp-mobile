import {
  FuelPlan,
  GasStation,
  GetGasStationsResponse,
} from '../types/gas-station'
import {
  FuelPlanDto,
  GasStationDto,
  GetGasStationsResponseDto,
} from '../types/gas-station.dto'

/**
 * Maps a single FuelPlanDto from the API to a FuelPlan object.
 * @param dto The FuelPlanDto object from the API response.
 * @returns A mapped FuelPlan object.
 */
export const mapFuelPlanDtoToFuelPlan = (dto: FuelPlanDto): FuelPlan => {
  return {
    routeSectionId: dto.routeSectionId,
    fuelPlanId: dto.fuelPlanId,
  }
}

/**
 * Maps a single GasStationDto from the API to a GasStation object.
 * @param dto The GasStationDto object from the API response.
 * @returns A mapped GasStation object.
 */
export const mapGasStationDtoToGasStation = (
  dto: GasStationDto,
): GasStation => {
  const price = dto.price ? parseFloat(dto.price) : undefined
  const discount = dto.discount ? parseFloat(dto.discount) : undefined
  const finalPrice = dto.priceAfterDiscount
    ? parseFloat(dto.priceAfterDiscount)
    : undefined

  const lat = parseFloat(dto.latitude)
  const lng = parseFloat(dto.longitude)

  return {
    id: dto.id,
    name: dto.name,
    position: {
      lat: isNaN(lat) ? 0 : lat,
      lng: isNaN(lng) ? 0 : lng,
    },
    address: dto.address,
    fuelPrice: {
      price:
        price !== undefined && !isNaN(price) ? price.toFixed(4) : undefined,
      discount:
        discount !== undefined && !isNaN(discount)
          ? discount.toFixed(4)
          : undefined,
      finalPrice:
        finalPrice !== undefined && !isNaN(finalPrice)
          ? finalPrice.toFixed(4)
          : undefined,
    },
    isAlgorithm: dto.isAlgorithm,
    refill: dto.refill ? dto.refill : '0',
    stopOrder: dto.stopOrder,

    nextDistanceKm: dto.nextDistanceKm ? parseFloat(dto.nextDistanceKm) : null,
    roadSectionId: dto.roadSectionId,
    fuelLeftBeforeRefill: dto.currentFuel,
    fuelPlans: dto.fuelPlans?.map(mapFuelPlanDtoToFuelPlan) || null,
    state: null, // Or undefined
    distanceToLocation: null, // Or undefined
    route: null, // Or undefined
  }
}

/**
 * Maps the full API response DTO (GetGasStationsResponseDto)
 * to the desired application data structure (GetGasStationsResponse).
 * @param dto The raw DTO object received from the server (already validated by Zod).
 * @returns The mapped GetGasStationsResponse object.
 */
export const mapGetGasStationsResponseDtoToResponse = (
  dto: GetGasStationsResponseDto,
): GetGasStationsResponse => {
  return {
    fuelStations: dto.fuelStations.map(mapGasStationDtoToGasStation),
    finishInfo: {
      remainingFuelLiters: dto.finishInfo.remainingFuelLiters,
    },
  }
}
