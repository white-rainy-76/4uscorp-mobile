import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { z } from 'zod'

const loginSchema = z.object({
  userName: z.string().min(1, 'Обязательное поле'),
  password: z.string().min(1, 'Обязательное поле'),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginScreen() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchema) => {
    console.log('Login data:', data)
    // тут вызов API и signIn({ access, refresh })
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setValue('userName', text)}
        style={styles.input}
      />
      {errors.userName && <Text>{errors.userName.message}</Text>}

      <TextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setValue('password', text)}
        style={styles.input}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Button title="Login" onPress={handleSubmit(onSubmit)} />
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
