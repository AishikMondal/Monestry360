"use client"

import { useEffect, useRef, useState } from 'react'

export default function SimpleWorkingMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    let map: any = null
    let isInitialized = false
    let timeoutId: NodeJS.Timeout

    const initMap = async () => {
      if (isInitialized) return
      
      try {
        setStatus('Loading Leaflet...')
        
        // Import Leaflet
        const L = (await import('leaflet')).default
        
        setStatus('Preparing map container...')
        
        if (!mapRef.current) {
          setStatus('Error: Map container not found')
          return
        }

        // Clear any existing content and wait a bit
        mapRef.current.innerHTML = ''
        
        // Wait for DOM to settle
        await new Promise(resolve => setTimeout(resolve, 100))
        
        setStatus('Creating map...')

        // Create map with proper initialization
        map = L.map(mapRef.current, {
          center: [27.3389, 88.6065],
          zoom: 10,
          zoomControl: true,
          attributionControl: true
        })

        isInitialized = true
        
        setStatus('Loading map tiles...')

        // Add map tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 18
        }).addTo(map)

        // Wait for map to be ready before adding marker
        timeoutId = setTimeout(() => {
          try {
            // Add a marker
            L.marker([27.3389, 88.6065])
              .addTo(map)
              .bindPopup('Gangtok, Sikkim')
              .openPopup()

            setStatus('✅ Map loaded successfully!')
          } catch (markerError) {
            console.error('Marker error:', markerError)
            setStatus('✅ Map loaded (marker failed)')
          }
        }, 500)

      } catch (error) {
        console.error('Map error:', error)
        setStatus(`❌ Error: ${error}`)
        isInitialized = false
      }
    }

    // Delay initialization to ensure DOM is ready
    const delayedInit = setTimeout(initMap, 100)

    // Cleanup
    return () => {
      clearTimeout(delayedInit)
      clearTimeout(timeoutId)
      isInitialized = false
      if (map) {
        try {
          map.remove()
        } catch (e) {
          console.log('Map cleanup:', e)
        }
      }
      if (mapRef.current) {
        mapRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Simple Working Map</h1>
      
      {/* Status */}
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <p><strong>Status:</strong> {status}</p>
      </div>

      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      
      {/* Map Container */}
      <div
        ref={mapRef}
        style={{
          height: '400px',
          width: '100%',
          border: '2px solid #ccc',
          borderRadius: '8px'
        }}
      />
      
      {/* Instructions */}
      <div className="mt-4 p-3 bg-yellow-50 rounded text-sm">
        <p><strong>Expected:</strong> You should see a map of Sikkim with a marker on Gangtok.</p>
        <p><strong>If you don't see it:</strong> Check the browser console (F12) for errors.</p>
      </div>
    </div>
  )
}