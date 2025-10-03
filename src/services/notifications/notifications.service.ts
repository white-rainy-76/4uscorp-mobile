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
      title: 'Local notification! 📬',
      body: 'This notification was sent from the app itself.',
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
        // REPLACE WITH YOUR BACKEND ADDRESS
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${yourAuthToken}` // If authorization is required
        },
        body: JSON.stringify({ pushToken: token, userId: 'some-user-id' }), // Send token and user ID
      },
    )
    if (!response.ok) {
      console.error(
        'Error sending token to server:',
        response.status,
        await response.text(),
      )
    } else {
      console.log('Token successfully sent to server.')
    }
  } catch (error) {
    console.error('Network error sending token to server:', error)
  }
}
