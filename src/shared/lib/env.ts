/*
 * This file should not be modified; use `env.js` in the project root to add your client environment variables.
 * If you import `Env` from `@env`, this is the file that will be loaded.
 * You can only access the client environment variables here.
 * NOTE: We use js file so we can load the client env types
 */

import Constants from 'expo-constants'
import { ClientEnv } from '../../../env'

/**
 * Environment variables loaded from app.json extra section
 * @type {typeof ClientEnv}
 */
export const Env: ClientEnv = {
  SERVER_URL:
    Constants.expoConfig?.extra?.serverUrl ?? 'https://foruscorp.net:5011',
  GOOGLE_MAPS_API_KEY:
    Constants.expoConfig?.extra?.googleMapsApiKey ??
    'AIzaSyCq9ygETQJ-8eStWqHUa-XvF1ihD32NyDU',
  APP_NAME: Constants.expoConfig?.extra?.appName ?? 'fouruscorp',
  APP_VERSION: Constants.expoConfig?.extra?.appVersion ?? '1.0.0',
  NODE_ENV: Constants.expoConfig?.extra?.nodeEnv ?? 'development',
}
