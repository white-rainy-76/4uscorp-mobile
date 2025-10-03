import z from 'zod'

export const registerDevicePayloadSchema = z.object({
  userId: z.string(),
  pushToken: z.string(),
})
