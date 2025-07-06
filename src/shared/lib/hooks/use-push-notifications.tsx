import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'
import { useAuth } from '../auth'
import { registerForPushNotificationsAsync } from '../registerForPushNotifications'

export function usePushNotifications() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
  const { token } = useAuth()

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    })

    registerForPushNotificationsAsync().then((token) => {
      if (token) {
        console.log('Push token:', token)
        setExpoPushToken(token)
        console.log(expoPushToken)
        // Отправляем токен на сервер
        // api.post('/save-device-token', { token })
      }
    })

    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notification received:', notification)
      }
    )

    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log('Notification clicked:', response)
      })

    return () => {
      notificationListener.remove()
      responseListener.remove()
    }
  }, [token])
}
