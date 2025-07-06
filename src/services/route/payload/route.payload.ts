import { z } from 'zod'

export const GetRoutePayloadSchema = z.object({
  truckId: z.string(),
})
