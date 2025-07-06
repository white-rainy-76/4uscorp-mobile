import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
})

export async function scheduleLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Локальное уведомление! 📬',
      body: 'Это уведомление отправлено из самого приложения.',
      data: { key: 'value', screen: 'some-screen-id' },
    },
    trigger: null,
  })
}

export async function sendPushTokenToServer(token: string) {
  try {
    const response = await fetch(
      'https://your-backend.com/api/register-push-token',
      {
        // ЗАМЕНИТЕ НА АДРЕС ВАШЕГО БЭКЕНДА
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${yourAuthToken}` // Если требуется авторизация
        },
        body: JSON.stringify({ pushToken: token, userId: 'some-user-id' }), // Отправляем токен и ID пользователя
      },
    )
    if (!response.ok) {
      console.error(
        'Ошибка при отправке токена на сервер:',
        response.status,
        await response.text(),
      )
    } else {
      console.log('Токен успешно отправлен на сервер.')
    }
  } catch (error) {
    console.error('Сетевая ошибка при отправке токена на сервер:', error)
  }
}
