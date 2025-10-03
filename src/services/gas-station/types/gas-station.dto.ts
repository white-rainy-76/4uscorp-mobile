import { z } from 'zod'
import {
  FuelPlanDtoSchema,
  GasStationDtoSchema,
  GetGasStationsResponseDtoSchema,
} from '../contracts/gas-station.contract.dto'

export type FuelPlanDto = z.infer<typeof FuelPlanDtoSchema>
export type GasStationDto = z.infer<typeof GasStationDtoSchema>
export type GetGasStationsResponseDto = z.infer<
  typeof GetGasStationsResponseDtoSchema
>
