import { z } from 'zod'

import {
  signInPayloadSchema,
  signUpPayloadSchema,
} from '../payload/auth.payload'
import { logoutPayloadSchema } from '../payload/logout.payload'
import { registerDevicePayloadSchema } from '../payload/register-device.payload'

export type SignInPayload = z.infer<typeof signInPayloadSchema>
export type SignUpPayload = z.infer<typeof signUpPayloadSchema>
export type RegisterDevicePayload = z.infer<typeof registerDevicePayloadSchema>
export type LogoutPayload = z.infer<typeof logoutPayloadSchema>
