import { z } from 'zod'
import {
  FuelPlanSchema,
  FuelPriceSchema,
  GasStationSchema,
  GetGasStationsResponseSchema,
} from '../contracts/gas-station.contract'

export type FuelPlan = z.infer<typeof FuelPlanSchema>
export type GasStation = z.infer<typeof GasStationSchema>
export type GetGasStationsResponse = z.infer<
  typeof GetGasStationsResponseSchema
>
export type FuelPrice = z.infer<typeof FuelPriceSchema>
