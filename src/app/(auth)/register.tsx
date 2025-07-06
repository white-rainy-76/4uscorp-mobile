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

const registerSchema = z
  .object({
    email: z.string().email(),
    userFirstName: z.string().min(1),
    userLastName: z.string().min(1),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  })

type RegisterSchema = z.infer<typeof registerSchema>

export default function RegisterScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false)

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
    // отправка данных на сервер
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
        <Text>{passwordVisible ? 'Скрыть пароль' : 'Показать пароль'}</Text>
      </Pressable>

      <Button title="Зарегистрироваться" onPress={handleSubmit(onSubmit)} />
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
