import { useEffect, useState } from 'react'

declare global {
  interface Window {
    google?: any;
  }
}

interface UseGoogleMapsOptions {
  libraries?: string[]
}

export const useGoogleMaps = (options: UseGoogleMapsOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
      setLoadError('Google Maps API key is not configured')
      return
    }

    if (window.google) {
      setIsLoaded(true)
      return
    }

    const script = document.createElement('script')
    const libraries = options.libraries?.join(',') || 'places'
    
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=${libraries}`
    script.async = true
    script.defer = true

    script.onload = () => {
      setIsLoaded(true)
    }

    script.onerror = () => {
      setLoadError('Failed to load Google Maps API')
    }

    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [options.libraries])

  return { isLoaded, loadError }
}