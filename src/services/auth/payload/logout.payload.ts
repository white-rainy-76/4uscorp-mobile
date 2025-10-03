import z from 'zod'

export const logoutPayloadSchema = z.object({
  expoToken: z.string(),
})

export type LogoutPayload = z.infer<typeof logoutPayloadSchema>
