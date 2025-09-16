import { useEffect, useState } from 'react'

export const useLeaflet = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [leaflet, setLeaflet] = useState<any>(null)

  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        console.log('Loading Leaflet library...')
        const L = await import('leaflet')
        setLeaflet(L.default)
        setIsLoaded(true)
        console.log('Leaflet loaded successfully')
      } catch (error) {
        console.error('Failed to load Leaflet:', error)
        setLoadError('Failed to load Leaflet library')
      }
    }

    if (!leaflet) {
      loadLeaflet()
    }
  }, [leaflet])

  return { isLoaded, loadError, leaflet }
}