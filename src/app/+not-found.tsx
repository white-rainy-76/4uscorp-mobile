import { useTranslation } from '@/shared/lib/i18n'
import { Stack } from 'expo-router'

export default function NotFoundScreen() {
  const { t } = useTranslation()

  return (
    <>
      <Stack.Screen options={{ title: t('not_found.title') }} />
    </>
  )
}
