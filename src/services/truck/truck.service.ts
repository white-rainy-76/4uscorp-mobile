import { api } from '@/shared/api/api.instance'
import { responseContract } from '@/shared/api/api.lib'
import { AxiosRequestConfig } from 'axios'
import { TruckDtoSchema } from './contracts/truck.contract.dto'

export function getTruckById(id: string, config?: AxiosRequestConfig) {
  return api
    .get(`/trucks-api/Trucks/get-truckBy-id?truckId=${id}`, config)
    .then(responseContract(TruckDtoSchema))
}
export function getTruckByUserId(id: string, config?: AxiosRequestConfig) {
  return api
    .get(`/trucks-api/Trucks/user/${id}`, config)
    .then(responseContract(TruckDtoSchema))
}
