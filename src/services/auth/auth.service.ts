import { api } from '@/shared/api/api.instance'
import { responseContract } from '@/shared/api/api.lib'
import { AxiosRequestConfig } from 'axios'
import { authResponseSchema } from './contracts/auth.contract'
import {
  signInPayloadSchema,
  signUpPayloadSchema,
} from './payload/auth.payload'
import { logoutPayloadSchema } from './payload/logout.payload'
import { registerDevicePayloadSchema } from './payload/register-device.payload'
import { AuthResponse } from './types/auth'
import {
  LogoutPayload,
  RegisterDevicePayload,
  SignInPayload,
  SignUpPayload,
} from './types/auth.payload'

export const signIn = async (
  payload: SignInPayload,
  signal?: AbortSignal,
): Promise<AuthResponse> => {
  const validatedPayload = signInPayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  const response = await api
    .post(`/auth-api/Auth/login`, validatedPayload, config)
    .then(responseContract(authResponseSchema))

  return response.data
}

export const signUp = async (
  payload: SignUpPayload,
  signal?: AbortSignal,
): Promise<AuthResponse> => {
  const validatedPayload = signUpPayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  const response = await api
    .post(`/auth-api/Auth/Register`, validatedPayload, config)
    .then(responseContract(authResponseSchema))

  return response.data
}

export const registerDevice = async (
  payload: RegisterDevicePayload,
  signal?: AbortSignal,
): Promise<void> => {
  const validatedPayload = registerDevicePayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  await api.post(`push-api/Devices/register`, validatedPayload, config)
}

export const logout = async (
  payload: LogoutPayload,
  signal?: AbortSignal,
): Promise<void> => {
  const validatedPayload = logoutPayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  await api.post(`/auth-api/Auth/logout-mobile`, validatedPayload, config)
}
