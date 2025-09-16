"use client"

import { useEffect, useRef } from 'react'

export default function SimpleMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const loadMap = async () => {
      try {
        console.log('Loading Leaflet...')
        
        // Import Leaflet dynamically
        const L = await import('leaflet')
        
        console.log('Leaflet loaded successfully')

        if (!mapRef.current) {
          console.log('Map ref not found')
          return
        }

        console.log('Creating map...')
        
        // Create map
        const map = L.default.map(mapRef.current).setView([27.3389, 88.6065], 10)
        
        console.log('Adding tiles...')
        
        // Add tiles
        L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map)

        console.log('Map created successfully')

        // Add a simple marker
        L.default.marker([27.3389, 88.6065])
          .addTo(map)
          .bindPopup('Gangtok, Sikkim')
          .openPopup()

        console.log('Marker added')

      } catch (error) {
        console.error('Error loading map:', error)
      }
    }

    loadMap()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Simple Test Map</h1>
      <div 
        ref={mapRef} 
        style={{ height: '400px', width: '100%' }}
        className="border border-gray-300 rounded"
      />
      <p className="mt-4 text-sm text-gray-600">
        Check browser console (F12) for debug messages
      </p>
    </div>
  )
}