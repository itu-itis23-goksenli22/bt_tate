import { getImageUrl } from './supabase'

// Image paths in Supabase Storage bucket
export const IMAGES = {
  // Logo and branding
  logo: getImageUrl('logo.png'),

  // Hero section
  heroBackground: getImageUrl('hero-bg.jpg'),

  // Icons and assets
  checkIcon: getImageUrl('icons/check.svg'),
  arrowIcon: getImageUrl('icons/arrow.svg'),

  // Add more image paths as needed
} as const

// Helper to get dynamic image URLs
export const getStorageImageUrl = (path: string) => getImageUrl(path)
