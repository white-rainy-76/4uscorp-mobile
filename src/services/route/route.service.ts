import { api } from '@/shared/api/api.instance'
import { responseContract } from '@/shared/api/api.lib'
import { AxiosRequestConfig } from 'axios'
import {
  GetAssignedRouteByTruckIdDtoSchema,
  RouteByIdDtoSchema,
  RouteDataDtoSchema,
} from './contracts/route.contract.dto'
import { mapGetAssignedRouteByTruckIdDtoToGetAssignedRouteByTruckId } from './mapper/map-assigned-route'
import { mapRouteDataDtoToRouteData } from './mapper/map-route'
import { mapRouteByIdDtoToRouteById } from './mapper/map-route-by-id'
import {
  acceptRoutePayloadSchema,
  assignRoutePayloadSchema,
  completeRoutePayloadSchema,
  declineFuelRoutePayloadSchema,
  getAssignedRouteByTruckIdPayloadSchema,
  getRouteByIdPayloadSchema,
  getRoutePayloadSchema,
} from './payload/route.payload'
import {
  GetAssignedRouteByTruckIdData,
  RouteByIdData,
  RouteData,
} from './types/route'
import {
  AcceptRoutePayload,
  AssignRoutePayload,
  CompleteRoutePayload,
  DeclineFuelRoutePayload,
  GetAssignedRouteByTruckIdPayload,
  GetRoutePayload,
  RouteByIdPayload,
} from './types/route.payload'

export const getRoute = async (
  payload: GetRoutePayload,
  signal?: AbortSignal,
): Promise<RouteData> => {
  const validatedPayload = getRoutePayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  const response = await api
    .post(
      `/fuelroutes-api/FuelRoute/get-current-route`,
      validatedPayload,
      config,
    )
    .then(responseContract(RouteDataDtoSchema))

  return mapRouteDataDtoToRouteData(response.data)
}

export const getRouteById = async (
  payload: RouteByIdPayload,
  signal?: AbortSignal,
): Promise<RouteByIdData> => {
  const validatedPayload = getRouteByIdPayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  const response = await api
    .post(
      `/fuelroutes-api/FuelRoute/get-fuel-route-byId`,
      validatedPayload,
      config,
    )
    .then(responseContract(RouteByIdDtoSchema))

  return mapRouteByIdDtoToRouteById(response.data)
}

export const getAssignedRouteByTruckId = async (
  payload: GetAssignedRouteByTruckIdPayload,
  signal?: AbortSignal,
): Promise<GetAssignedRouteByTruckIdData> => {
  const validatedPayload = getAssignedRouteByTruckIdPayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  const response = await api
    .post(
      `/fuelroutes-api/FuelRoute/get-assigned-route-by-truck-Id`,
      validatedPayload,
      config,
    )
    .then(responseContract(GetAssignedRouteByTruckIdDtoSchema))

  return mapGetAssignedRouteByTruckIdDtoToGetAssignedRouteByTruckId(
    response.data,
  )
}

export const assignRoute = async (
  payload: AssignRoutePayload,
  signal?: AbortSignal,
): Promise<void> => {
  const validatedPayload = assignRoutePayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  await api.post(
    `/fuelroutes-api/FuelRoute/AssignRoute`,
    validatedPayload,
    config,
  )
}

export const selfAssignRoute = async (
  payload: AssignRoutePayload,
  signal?: AbortSignal,
): Promise<void> => {
  const validatedPayload = assignRoutePayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  await api.post(
    `/fuelroutes-api/FuelRoute/selfAssignRoute`,
    validatedPayload,
    config,
  )
}

export const acceptRoute = async (
  payload: AcceptRoutePayload,
  signal?: AbortSignal,
): Promise<void> => {
  const validatedPayload = acceptRoutePayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  await api.post(
    `/fuelroutes-api/FuelRoute/accept-fuel-route`,
    validatedPayload,
    config,
  )
}

export const declineFuelRoute = async (
  payload: DeclineFuelRoutePayload,
  signal?: AbortSignal,
): Promise<void> => {
  const validatedPayload = declineFuelRoutePayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  await api.post(
    `/fuelroutes-api/FuelRoute/decline-fuel-route`,
    validatedPayload,
    config,
  )
}

export const completeRoute = async (
  payload: CompleteRoutePayload,
  signal?: AbortSignal,
): Promise<void> => {
  const validatedPayload = completeRoutePayloadSchema.parse(payload)
  const config: AxiosRequestConfig = { signal }
  await api.post(
    `/fuelroutes-api/FuelRoute/complete-route`,
    validatedPayload,
    config,
  )
}
