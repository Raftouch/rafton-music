export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'http://portainer-cda3b.dev-formation.com:5000'
    : 'http://localhost:5000')
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
