export type NotificationType = 'RouteOffer' | 'NearFuelStation'

export interface BaseNotification {
  NotificationType: NotificationType
  CreatedAtUtc: string
}

export interface RouteOfferNotification extends BaseNotification {
  NotificationType: 'RouteOffer'
  RouteId: string
  FuelPlanId: string
  FuelPlanValidatorId: string
  FuelRouteVersionId: string
}

export interface NearFuelStationNotification extends BaseNotification {
  NotificationType: 'NearFuelStation'
  Address: string
  StationId: string
  DistanceMiles: number
}

export type NotificationData =
  | RouteOfferNotification
  | NearFuelStationNotification

export const isValidNotificationData = (
  data: any,
): data is NotificationData => {
  if (!data || typeof data !== 'object') return false
  if (!data.NotificationType || !data.CreatedAtUtc) return false

  if (data.NotificationType === 'RouteOffer') {
    return (
      typeof data.RouteId === 'string' &&
      typeof data.FuelPlanId === 'string' &&
      typeof data.FuelPlanValidatorId === 'string' &&
      typeof data.FuelRouteVersionId === 'string'
    )
  }

  if (data.NotificationType === 'NearFuelStation') {
    return (
      typeof data.Address === 'string' &&
      typeof data.StationId === 'string' &&
      typeof data.DistanceMiles === 'number'
    )
  }

  return false
}

export const isRouteOfferNotification = (
  notification: NotificationData,
): notification is RouteOfferNotification => {
  return notification.NotificationType === 'RouteOffer'
}

export const isNearFuelStationNotification = (
  notification: NotificationData,
): notification is NearFuelStationNotification => {
  return notification.NotificationType === 'NearFuelStation'
}

export interface RouteOfferModalData {
  type: 'RouteOffer'
  routeId: string
  fuelPlanId: string
  fuelPlanValidatorId: string
  fuelRouteVersionId: string
  title: string
  message: string
  buttonText: string
  onButtonPress: () => void
}

export interface FuelStationModalData {
  type: 'NearFuelStation'
  title: string
  message: string
  address: string
  distance: number
  buttonText: string
  onButtonPress: () => void
}

export type ModalData = RouteOfferModalData | FuelStationModalData
