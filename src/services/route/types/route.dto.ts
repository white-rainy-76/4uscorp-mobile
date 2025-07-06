import { z } from 'zod'
import { RouteDataDtoSchema } from '../contracts/route.contract.dto'

export type RouteDataDto = z.infer<typeof RouteDataDtoSchema>
