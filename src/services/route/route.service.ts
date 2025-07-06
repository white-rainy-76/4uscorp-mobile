import { AxiosRequestConfig } from 'axios'
import { GetRoutePayload } from './types/route.payload'
import { GetRoutePayloadSchema } from './payload/route.payload'
import { RouteData } from './types/route'
import { RouteDataDtoSchema } from './contracts/route.contract.dto'
import { mapRouteDataDtoToRouteData } from './mapper/map-route'
import { responseContract } from '@/shared/api/api.lib'
import { api } from '@/shared/api/api.instance'

export const getRoute = async (
  payload: GetRoutePayload,
  signal?: AbortSignal,
): Promise<RouteData> => {
  const validatedPayload = GetRoutePayloadSchema.parse(payload)
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
