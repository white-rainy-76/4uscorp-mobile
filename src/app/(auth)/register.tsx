import { useTranslation } from '@/shared/lib/i18n'
import { SentryLogger } from '@/shared/lib/sentry-logger'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { z } from 'zod'

export default function RegisterScreen() {
  const { t } = useTranslation()
  const [passwordVisible, setPasswordVisible] = useState(false)

  const registerSchema = z
    .object({
      email: z.string().email(),
      userFirstName: z.string().min(1),
      userLastName: z.string().min(1),
      password: z.string().min(6),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('auth.register.passwords_not_match'),
      path: ['confirmPassword'],
    })

  type RegisterSchema = z.infer<typeof registerSchema>

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterSchema) => {
    console.log('Registration data:', data)
    SentryLogger.logAuthError('Registration attempt', undefined, {
      email: data.email,
      userFirstName: data.userFirstName,
      userLastName: data.userLastName,
    })
    // send data to server
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setValue('email', text)}
        style={styles.input}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <TextInput
        placeholder="First Name"
        onChangeText={(text) => setValue('userFirstName', text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        onChangeText={(text) => setValue('userLastName', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry={!passwordVisible}
        onChangeText={(text) => setValue('password', text)}
        style={styles.input}
      />

      <TextInput
        placeholder="Confirm Password"
        secureTextEntry={!passwordVisible}
        onChangeText={(text) => setValue('confirmPassword', text)}
        style={styles.input}
      />
      {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}

      <Pressable onPress={() => setPasswordVisible((prev) => !prev)}>
        <Text>{passwordVisible ? 'Hide password' : 'Show password'}</Text>
      </Pressable>

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
})
