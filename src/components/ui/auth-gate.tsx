import { useAuth } from '@/shared/lib/auth'
export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { token, status } = useAuth()

  //   if (status === 'idle') return null

  //   if (!token) {
  //     return <Redirect href="/(auth)/login" />
  //   }

  return <>{children}</>
}
