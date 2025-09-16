"use client"

import React, { useEffect, useRef, useState } from 'react'

interface Monastery {
  id: string
  name: string
  latitude: number
  longitude: number
  district: string
  address: string
}

interface LeafletMapProps {
  monasteries: Monastery[]
  center?: [number, number]
  zoom?: number
  height?: string
  onMarkerClick?: (monastery: Monastery) => void
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  monasteries,
  center = [27.3389, 88.6065], // Default to Gangtok, Sikkim
  zoom = 10,
  height = "400px",
  onMarkerClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [L, setL] = useState<any>(null)
  const [isInitializing, setIsInitializing] = useState(false)

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      try {
        console.log('Loading Leaflet library...')
        const leaflet = await import('leaflet')
        setL(leaflet.default)
        setLeafletLoaded(true)
        console.log('Leaflet loaded successfully')
      } catch (error) {
        console.error('Failed to load Leaflet:', error)
      }
    }

    loadLeaflet()
  }, [])

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (!leafletLoaded || !L || !mapRef.current || isInitializing || mapInstance) return

    setIsInitializing(true)
    console.log('Initializing map...')

    // Fix for default markers in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    })

    const initializeMap = async () => {
      try {
        // Clear any existing content first
        if (mapRef.current) {
          mapRef.current.innerHTML = ''
        }
        
        // Wait for DOM to settle and ensure container has dimensions
        await new Promise(resolve => setTimeout(resolve, 300))

        if (!mapRef.current) return

        // Ensure the container has proper dimensions
        const rect = mapRef.current.getBoundingClientRect()
        if (rect.width === 0 || rect.height === 0) {
          console.log('Container not ready, waiting...')
          await new Promise(resolve => setTimeout(resolve, 500))
        }

        // Force container to have explicit dimensions
        mapRef.current.style.width = '100%'
        mapRef.current.style.height = height
        mapRef.current.style.position = 'relative'

        console.log('Container dimensions:', mapRef.current.offsetWidth, 'x', mapRef.current.offsetHeight)

        // Initialize map with proper options (hide attribution)
        const map = L.map(mapRef.current, {
          center,
          zoom,
          zoomControl: true,
          attributionControl: false, // Hide the attribution
          preferCanvas: false
        })

        // Add OpenStreetMap tiles without attribution
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18
        }).addTo(map)

        // Force map to invalidate size after creation
        setTimeout(() => {
          map.invalidateSize()
        }, 100)

        setMapInstance(map)
        console.log('Map initialized successfully')
      } catch (error) {
        console.error('Map initialization error:', error)
      } finally {
        setIsInitializing(false)
      }
    }

    initializeMap()

    return () => {
      setIsInitializing(false)
      if (mapInstance) {
        try {
          mapInstance.remove()
        } catch (e) {
          console.log('Map cleanup:', e)
        }
        setMapInstance(null)
      }
      if (mapRef.current) {
        mapRef.current.innerHTML = ''
      }
    }
  }, [leafletLoaded, L, center, zoom])

  // Add markers when monasteries change
  useEffect(() => {
    if (!mapInstance || !L) return

    console.log('Trying to add markers for', monasteries.length, 'monasteries')
    console.log('Sample monastery:', monasteries[0])

    // Clear existing markers (if any)
    mapInstance.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        mapInstance.removeLayer(layer)
      }
    })

    if (monasteries.length === 0) {
      console.log('No monasteries to display')
      return
    }

    // Use simple default markers first to test
    const newMarkers: any[] = []
    
    monasteries.forEach((monastery, index) => {
      console.log(`Adding marker ${index + 1}:`, monastery.name, `at [${monastery.latitude}, ${monastery.longitude}]`)
      
      try {
        const marker = L.marker([monastery.latitude, monastery.longitude]).addTo(mapInstance)

        // Add popup
        marker.bindPopup(`
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="font-weight: bold; color: #dc2626; margin-bottom: 8px;">${monastery.name}</h3>
            <p style="font-size: 12px; margin: 4px 0;"><strong>District:</strong> ${monastery.district}</p>
            <p style="font-size: 12px; margin: 4px 0;"><strong>Address:</strong> ${monastery.address}</p>
          </div>
        `)

        // Add click handler
        marker.on('click', () => {
          console.log('Marker clicked:', monastery.name)
          if (onMarkerClick) {
            onMarkerClick(monastery)
          }
        })

        newMarkers.push(marker)
        console.log(`✅ Successfully added marker for ${monastery.name}`)
      } catch (error) {
        console.error(`❌ Failed to add marker for ${monastery.name}:`, error)
      }
    })

    console.log(`Total markers added: ${newMarkers.length}`)

    // Fit map to show all markers
    if (newMarkers.length > 0) {
      try {
        const group = L.featureGroup(newMarkers)
        mapInstance.fitBounds(group.getBounds(), { padding: [20, 20] })
        console.log('✅ Map bounds adjusted to show all markers')
      } catch (error) {
        console.error('❌ Failed to fit bounds:', error)
      }
    }
  }, [mapInstance, L, monasteries, onMarkerClick])

  if (!leafletLoaded) {
    return (
      <div 
        style={{ height, width: '100%' }}
        className="rounded-lg shadow-md border border-gray-200 bg-gray-50 flex items-center justify-center"
      >
        <div className="text-center text-gray-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="text-sm mt-2">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <link 
        rel="stylesheet" 
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div 
        ref={mapRef} 
        style={{ 
          height, 
          width: '100%',
          minHeight: '400px',
          position: 'relative',
          overflow: 'hidden'
        }}
        className="rounded-lg shadow-md border border-gray-200 z-0"
      />
    </>
  )
}

export default LeafletMap