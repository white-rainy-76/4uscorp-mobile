/**
 * Client environment variables.
 * This file is loaded by `src/shared/lib/env.js` and provides type-safe access to environment variables.
 * 
 * IMPORTANT: Only add variables that are safe to expose to the client.
 * Never add sensitive information like API keys, passwords, etc.
 */

export const ClientEnv = {
  // API Configuration
  SERVER_URL: 'https://foruscorp.net:5011',
  GOOGLE_MAPS_API_KEY: 'AIzaSyCq9ygETQJ-8eStWqHUa-XvF1ihD32NyDU',
  
  // App Configuration
  APP_NAME: 'fouruscorp',
  APP_VERSION: '1.0.0',
  
  // Development
  NODE_ENV: 'development',
} as const

export type ClientEnv = typeof ClientEnv
