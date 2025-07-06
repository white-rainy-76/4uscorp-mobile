import { z } from 'zod'
import { RouteDataSchema } from '../contracts/route.contract'

export type RouteData = z.infer<typeof RouteDataSchema>
