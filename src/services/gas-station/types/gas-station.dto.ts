import { z } from 'zod'
import {
  GasStationDtoSchema,
  GetGasStationsResponseDtoSchema,
} from '../contracts/gas-station.contract.dto'

export type GasStationDto = z.infer<typeof GasStationDtoSchema>
export type GetGasStationsResponseDto = z.infer<
  typeof GetGasStationsResponseDtoSchema
>
