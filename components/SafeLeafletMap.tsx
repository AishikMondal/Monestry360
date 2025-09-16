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

interface SafeLeafletMapProps {
  monasteries: Monastery[]
  center?: [number, number]
  zoom?: number
  height?: string
  onMarkerClick?: (monastery: Monastery) => void
}

const SafeLeafletMap: React.FC<SafeLeafletMapProps> = ({
  monasteries,
  center = [27.3389, 88.6065],
  zoom = 10,
  height = "400px",
  onMarkerClick
}) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapReady, setMapReady] = useState(false)
  const [status, setStatus] = useState('Initializing...')
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true
    
    const initMap = async () => {
      try {
        setStatus('Loading Leaflet...')
        
        // Dynamic import
        const L = (await import('leaflet')).default
        
        if (!mounted) return

        setStatus('Preparing container...')
        
        // Wait for container
        let attempts = 0
        while (attempts < 10) {
          if (mapRef.current && mapRef.current.offsetWidth > 0) {
            break
          }
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }
        
        if (!mapRef.current || !mounted) {
          setStatus('Container not ready')
          return
        }

        setStatus('Creating map...')
        
        // Clear container
        mapRef.current.innerHTML = ''
        
        // Create map
        const map = L.map(mapRef.current, {
          center,
          zoom,
          zoomControl: true,
          attributionControl: false
        })

        if (!mounted) return

        // Add tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18
        }).addTo(map)

        mapInstanceRef.current = map
        
        setStatus('Adding markers...')
        
        // Add markers
        if (monasteries.length > 0) {
          const markers: any[] = []
          
          monasteries.forEach(monastery => {
            const marker = L.marker([monastery.latitude, monastery.longitude])
              .addTo(map)
              .bindPopup(`
                <div style="padding: 12px; font-family: Arial;">
                  <h3 style="margin: 0 0 8px 0; color: #dc2626; font-size: 16px;">${monastery.name}</h3>
                  <p style="margin: 4px 0; font-size: 14px;"><strong>District:</strong> ${monastery.district}</p>
                  <p style="margin: 4px 0; font-size: 14px;"><strong>Address:</strong> ${monastery.address}</p>
                </div>
              `)
            
            marker.on('click', () => {
              if (onMarkerClick) {
                onMarkerClick(monastery)
              }
            })
            
            markers.push(marker)
          })
          
          // Fit bounds
          if (markers.length > 1) {
            const group = L.featureGroup(markers)
            map.fitBounds(group.getBounds(), { padding: [20, 20] })
          }
        }
        
        setMapReady(true)
        setStatus(`✅ Map ready with ${monasteries.length} monasteries`)
        
      } catch (error) {
        console.error('Map error:', error)
        setStatus(`❌ Error: ${error}`)
      }
    }

    initMap()
    
    return () => {
      mounted = false
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove()
        } catch (e) {
          console.log('Cleanup error:', e)
        }
      }
    }
  }, [monasteries, center, zoom, height, onMarkerClick])

  return (
    <div className="space-y-2">
      {/* Status */}
      <div className="text-sm text-gray-600 px-2">
        {status}
      </div>
      
      {/* Leaflet CSS */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      
      {/* Map Container */}
      <div
        ref={mapRef}
        style={{
          height,
          width: '100%',
          minHeight: '400px',
          backgroundColor: '#f0f0f0'
        }}
        className="rounded-lg border border-gray-200 relative"
      />
    </div>
  )
}

export default SafeLeafletMap