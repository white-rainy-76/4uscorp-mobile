import { useRegisterDeviceMutation } from '@/services/auth/register-device'
import { useSignInMutation } from '@/services/auth/sign-in.mutation'
import { useAuth } from '@/shared/lib/auth'
import { useTranslation } from '@/shared/lib/i18n'
import { SentryLogger } from '@/shared/lib/sentry-logger'
import {
  getExpoToken,
  isDeviceRegistered,
  removeItem,
  setItem,
} from '@/shared/lib/storage'
import { useTheme } from '@/shared/lib/theme'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'

const SignInScreen: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const signInSchema = z.object({
    userName: z.string().min(1, t('auth.login.username_required')),
    password: z.string(),
  })

  type SignInFormData = z.infer<typeof signInSchema>

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  const registerDeviceMutation = useRegisterDeviceMutation({
    onSuccess: () => {
      console.log('Device registered after login')
      SentryLogger.logDeviceRegistration('Device registration successful')
    },
    onError: (error) => {
      console.error('Error registering device after login:', error)
      SentryLogger.logDeviceRegistrationError(
        'Device registration failed',
        error as Error,
      )
    },
  })

  const signInMutation = useSignInMutation({
    onSuccess: async (data) => {
      try {
        // Clear previous errors
        setErrorMessage(null)

        // Save userId and token first
        await setItem('userId', data.userId)
        await setItem('token', data.token)

        SentryLogger.logStorage('userId and token saved to MMKV', {
          userId: data.userId,
        })

        // Check if device needs to be registered BEFORE signing in
        const expoToken = getExpoToken()
        const deviceAlreadyRegistered = isDeviceRegistered()

        if (expoToken && !deviceAlreadyRegistered) {
          SentryLogger.logDeviceRegistration('Starting device registration', {
            userId: data.userId,
            hasExpoToken: !!expoToken,
          })
          registerDeviceMutation.mutate({
            userId: data.userId,
            pushToken: expoToken,
          })
        } else if (deviceAlreadyRegistered) {
          console.log('Device already registered, skipping registration')
          SentryLogger.logDeviceRegistration(
            'Device already registered, skipping',
            {
              userId: data.userId,
            },
          )
        } else {
          console.log('ExpoToken not found, device will not be registered')
          SentryLogger.logDeviceRegistration(
            'ExpoToken not found, skipping registration',
            {
              userId: data.userId,
            },
          )
        }

        // Try to sign in - this will also save the token
        try {
          useAuth.getState().signIn(data.token)
          console.log('User signed in successfully')
        } catch (authError) {
          // Handle authentication errors (e.g., invalid role)
          SentryLogger.logLoginError(
            'Sign in failed after successful API response',
            data.userId,
            authError as Error,
          )

          if (authError instanceof Error) {
            setErrorMessage(authError.message)
          } else {
            setErrorMessage('An error occurred while signing in')
          }

          // Clear saved data
          await removeItem('userId')
          await removeItem('token')
          SentryLogger.logStorage('Cleared userId and token due to auth error')
        }
      } catch (e) {
        console.error('Failed to save data to MMKV using setItem:', e)
        SentryLogger.logStorageError(
          'Failed to save userId to MMKV',
          e as Error,
          {
            userId: data.userId,
          },
        )
        setErrorMessage('Error saving data')
      }
    },
    onError: async (error) => {
      await removeItem('userId')
      await removeItem('token')
      SentryLogger.logStorage('Cleared userId and token due to API error')

      // Log API login error
      SentryLogger.logLoginError('API login failed', undefined, error as Error)

      // Show server error
      if (error?.message) {
        setErrorMessage('Invalid login or password')
      } else {
        setErrorMessage('An error occurred while signing in')
      }
    },
  })

  const onSubmit = (data: SignInFormData) => {
    setErrorMessage(null) // Clear errors on new attempt
    signInMutation.mutate(data)
  }

  return (
    <View
      className="flex-1 items-center"
      style={{ backgroundColor: theme.colors.background.secondary }}>
      {/* Sign In Title */}
      <Text
        className="mt-[16px] font-['Nunito'] font-[500] text-[20px] leading-[26px] text-center"
        style={{
          letterSpacing: 0,
          color: theme.colors.text.primary,
        }}>
        {t('auth.login.title')}
      </Text>

      {/* Error Message */}
      {errorMessage && (
        <View
          className="mt-[16px] w-[calc(100%-48px)] px-[16px] py-[12px] rounded-[8px] border"
          style={{
            backgroundColor: theme.colors.danger[50],
            borderColor: theme.colors.danger[300],
          }}>
          <Text
            className="text-[14px] text-center font-['Nunito']"
            style={{ color: theme.colors.danger[600] }}>
            {errorMessage}
          </Text>
        </View>
      )}

      {/* Form Container */}
      <View
        className="mt-[32px] w-[calc(100%-48px)] px-[24px] py-[16px] rounded-[12px]"
        style={{
          backgroundColor: theme.colors.background.secondary,
          shadowColor: '#0000000D',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.05,
          shadowRadius: 40,
          elevation: 5,
        }}>
        {/* Username Field */}
        <View className="mb-[12px]">
          <Text
            className="font-['Nunito'] font-[800] text-[14px] leading-[22px]"
            style={{
              letterSpacing: 0,
              color: theme.colors.text.secondary,
            }}>
            {t('auth.login.username')}
          </Text>
          <Controller
            control={control}
            name="userName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="mt-[12px] h-[44px] rounded-[22px] px-[16px] text-[16px] font-['Nunito'] font-[500] w-full"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  color: theme.colors.text.primary,
                }}
                placeholder={t('auth.login.username')}
                placeholderTextColor={theme.colors.text.secondary}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.userName && (
            <Text
              className="text-[12px] mt-[4px]"
              style={{ color: theme.colors.danger[500] }}>
              {errors.userName.message}
            </Text>
          )}
        </View>

        {/* Password Field */}
        <View className="mb-[20px]">
          <Text
            className="font-['Nunito'] font-[800] text-[14px] leading-[22px]"
            style={{
              letterSpacing: 0,
              color: theme.colors.text.secondary,
            }}>
            {t('auth.login.password')}
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="mt-[12px] h-[44px] rounded-[22px] px-[16px] text-[16px] font-['Nunito'] font-[500] w-full"
                style={{
                  backgroundColor: theme.colors.background.primary,
                  color: theme.colors.text.primary,
                }}
                placeholder={t('auth.login.password')}
                placeholderTextColor={theme.colors.text.secondary}
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text
              className="text-[12px] mt-[4px]"
              style={{ color: theme.colors.danger[500] }}>
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Manager Data Text */}
        <Text
          className="mb-[20px] font-['Nunito'] font-[500] text-[14px] leading-[22px]"
          style={{
            letterSpacing: 0,
            color: theme.colors.text.primary,
          }}>
          {t('auth.login.manager_data')}
        </Text>

        {/* Continue Button */}
        <TouchableOpacity
          className="w-[295px] h-[44px] bg-[#4964D8] rounded-[22px] justify-center items-center self-center"
          onPress={handleSubmit(onSubmit)}
          disabled={signInMutation.isPending}>
          <Text
            className="font-['Nunito'] font-[500] text-[16px] leading-[24px] text-[#ffffff] text-center"
            style={{ letterSpacing: 0 }}>
            {signInMutation.isPending
              ? t('common.loading')
              : t('auth.login.sign_in')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignInScreen
