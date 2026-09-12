const configuredApiUrl = process.env.EXPO_PUBLIC_API_URL?.trim().replace(/\/+$/, '');
const isDevelopment = typeof __DEV__ !== 'undefined' && __DEV__;

if (!configuredApiUrl && !isDevelopment) {
  throw new Error('EXPO_PUBLIC_API_URL must be configured for release builds');
}

// Local HTTP is intentionally limited to development. Release builds must use HTTPS.
export const API_BASE_URL = configuredApiUrl || 'http://192.168.1.3:5000';
export const API_ROOT_URL = `${API_BASE_URL}/api`;
