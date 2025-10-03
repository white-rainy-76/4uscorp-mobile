import z from 'zod'
import { authResponseSchema } from '../contracts/auth.contract'

export type AuthResponse = z.infer<typeof authResponseSchema>
