import { queryOptions } from '@tanstack/react-query'
import { getTruckById, getTruckByUserId } from './truck.service'

import { mapTruck } from './mapper/map-truck'

export const TRUCKS_ROOT_QUERY_KEY = ['trucks']

export const truckQueries = {
  all: () => [...TRUCKS_ROOT_QUERY_KEY],

  lists: (filter?: { name?: string }) => [
    ...truckQueries.all(),
    'list',
    filter ?? {},
  ],

  truck: (id: string) =>
    queryOptions({
      queryKey: [...TRUCKS_ROOT_QUERY_KEY, 'truck', id],
      queryFn: async ({ signal }) => {
        const { data } = await getTruckById(id, { signal })
        const truck = mapTruck(data)
        return truck
      },
      // initialData: () =>
      //   queryClient.getQueryData<Truck>([...TRUCKS_ROOT_QUERY_KEY, 'truck', id]),
      // initialDataUpdatedAt: () =>
      //   queryClient.getQueryState([...TRUCKS_ROOT_QUERY_KEY, 'truck', id])?.dataUpdatedAt,
    }),
  truckByUserId: (id: string) =>
    queryOptions({
      queryKey: [...TRUCKS_ROOT_QUERY_KEY, 'truck', id],
      queryFn: async ({ signal }) => {
        const { data } = await getTruckByUserId(id, { signal })
        const truck = mapTruck(data)
        return truck
      },
    }),
}
