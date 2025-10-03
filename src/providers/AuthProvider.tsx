import { UniversalNotificationModal } from '@/components/modal/notification'
import { useAuthRedirect } from '@/shared/lib/auth/use-auth-redirect'
import { usePushNotifications } from '@/shared/lib/hooks/use-push-notifications'
import React from 'react'

interface AuthRedirectProviderProps {
  children: React.ReactNode
}

export const AuthRedirectProvider: React.FC<AuthRedirectProviderProps> = ({
  children,
}) => {
  useAuthRedirect()
  const { isModalVisible, modalData, handleCloseModal } = usePushNotifications()
  return (
    <>
      <UniversalNotificationModal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        modalData={modalData}
      />
      {children}
    </>
  )
}
