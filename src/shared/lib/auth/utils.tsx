import { getItem, removeItem, setItem } from '../storage'

const TOKEN = 'token'

export type TokenType = {
  access: string
  refresh: string
}

export const getToken = (): string | null => {
  const token = getItem<string>(TOKEN)
  return token
}

export const removeToken = () => removeItem(TOKEN)
export const setToken = (value: string) => setItem<string>(TOKEN, value)
