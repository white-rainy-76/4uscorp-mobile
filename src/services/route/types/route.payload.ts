import { z } from 'zod'
import { GetRoutePayloadSchema } from '../payload/route.payload'

export type GetRoutePayload = z.infer<typeof GetRoutePayloadSchema>
