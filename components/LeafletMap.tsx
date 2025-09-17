"use client"

import { useEffect, useRef, useState } from 'react'
import 'leaflet/dist/leaflet.css'

interface LeafletMapProps {
  monasteries: any[]
  selectedMonastery?: any
  onMonasterySelect: (monastery: any) => void
}

export default function LeafletMap({ monasteries, selectedMonastery, onMonasterySelect }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let L: any = null
    let map: any = null

    const initializeMap = async () => {
      try {
        // Dynamically import Leaflet
        // CSS is imported at the top of the file for compatibility
        // No need to import 'leaflet/dist/leaflet.css' here

        // Fix for default markers
        delete (L.Icon.Default.prototype as any)._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        })

        if (mapRef.current && !mapInstanceRef.current) {
          // Initialize map
          map = L.map(mapRef.current).setView([27.3389, 88.6065], 10)
          mapInstanceRef.current = map

          // Add OpenStreetMap tiles
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
          }).addTo(map)

          // Add monasteries as markers
          monasteries.forEach((monastery) => {
            if (monastery.coordinates?.lat && monastery.coordinates?.lng) {
              // Create custom icon based on difficulty
              const iconColor = monastery.difficulty === 'easy' ? '#22c55e' : 
                               monastery.difficulty === 'moderate' ? '#f59e0b' : 
                               monastery.difficulty === 'challenging' ? '#ef4444' : '#3b82f6'

              const customIcon = L.divIcon({
                html: `
                  <div style="
                    background-color: ${iconColor};
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 14px;
                    font-weight: bold;
                    cursor: pointer;
                  ">🏛️</div>
                `,
                className: 'custom-monastery-marker',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
              })

              const marker = L.marker([monastery.coordinates.lat, monastery.coordinates.lng], {
                icon: customIcon
              }).addTo(map)

              // Add popup
              const popupContent = `
                <div style="min-width: 200px; max-width: 250px;">
                  <img src="${monastery.image}" alt="${monastery.name}" 
                       style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" 
                       onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vbmFzdGVyeSBJbWFnZTwvdGV4dD48L3N2Zz4='" />
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">${monastery.name}</h3>
                  <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${monastery.location}</p>
                  <p style="margin: 0 0 8px 0; font-size: 12px; color: #374151;">${monastery.description.substring(0, 100)}...</p>
                  <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 8px;">
                    <span style="color: #fbbf24;">⭐</span>
                    <span style="font-size: 12px; font-weight: 600; color: #374151;">${monastery.rating}</span>
                    <span style="font-size: 12px; color: #6b7280;">(${monastery.reviewCount} reviews)</span>
                  </div>
                  <div style="display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px;">
                    <span style="background: ${iconColor}; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px;">${monastery.difficulty}</span>
                    <span style="background: #e5e7eb; color: #374151; padding: 2px 6px; border-radius: 12px; font-size: 10px;">${monastery.altitude}</span>
                  </div>
                  <button 
                    onclick="window.selectMonasteryFromMap('${monastery.id}')"
                    style="
                      width: 100%;
                      background: linear-gradient(to right, #10b981, #3b82f6);
                      color: white;
                      padding: 8px 16px;
                      border: none;
                      border-radius: 6px;
                      font-size: 12px;
                      font-weight: 600;
                      cursor: pointer;
                      transition: all 0.2s;
                    "
                    onmouseover="this.style.transform='scale(1.02)'"
                    onmouseout="this.style.transform='scale(1)'"
                  >
                    View Details
                  </button>
                </div>
              `
              
              marker.bindPopup(popupContent, {
                maxWidth: 250,
                className: 'custom-popup'
              })

              // Add click event
              marker.on('click', () => {
                onMonasterySelect(monastery)
              })
            }
          })

          // Fit map to show all markers
          if (monasteries.length > 0) {
            const group = new L.featureGroup(
              monasteries
                .filter(m => m.coordinates?.lat && m.coordinates?.lng)
                .map(m => L.marker([m.coordinates.lat, m.coordinates.lng]))
            )
            map.fitBounds(group.getBounds().pad(0.1))
          }

          setIsLoading(false)
        }
      } catch (error) {
        console.error('Error loading map:', error)
        setIsLoading(false)
      }
    }

    initializeMap()

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [monasteries, onMonasterySelect])

  // Global function for popup buttons
  useEffect(() => {
    (window as any).selectMonasteryFromMap = (monasteryId: string) => {
      const monastery = monasteries.find(m => m.id.toString() === monasteryId)
      if (monastery) {
        onMonasterySelect(monastery)
      }
    }

    return () => {
      delete (window as any).selectMonasteryFromMap
    }
  }, [monasteries, onMonasterySelect])

  if (isLoading) {
    return (
      <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading Interactive Map...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-96">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white/95 dark:bg-gray-800/95 p-3 rounded-lg shadow-lg border dark:border-gray-600 text-sm backdrop-blur-sm">
        <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Difficulty Level</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Easy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Challenging</span>
          </div>
        </div>
      </div>

      {/* Map Attribution */}
      <div className="absolute bottom-4 left-4 bg-white/95 dark:bg-gray-800/95 px-2 py-1 rounded text-xs text-gray-600 dark:text-gray-400 backdrop-blur-sm">
        🗺️ Interactive Map • Click markers for details
      </div>
    </div>
  )
}