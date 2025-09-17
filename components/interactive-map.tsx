"use client"

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface MonasteryMapProps {
  monasteries: Array<{
    id: number | string
    name: string
    location: string
    coordinates: { lat: number, lng: number }
    description: string
    image: string
    difficulty?: string
  }>
  selectedMonastery?: any
  onMonasterySelect: (monastery: any) => void
}

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function InteractiveMap({ monasteries, selectedMonastery, onMonasterySelect }: MonasteryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Initialize map centered on Sikkim
    const map = L.map(mapRef.current).setView([27.3389, 88.6065], 10)

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current) return

    // Clear existing markers
    markersRef.current.forEach(marker => {
      mapInstanceRef.current?.removeLayer(marker)
    })
    markersRef.current = []

    // Add markers for monasteries
    monasteries.forEach(monastery => {
      if (monastery.coordinates?.lat && monastery.coordinates?.lng) {
        // Create custom icon based on difficulty
        const iconColor = monastery.difficulty === 'easy' ? 'green' : 
                         monastery.difficulty === 'moderate' ? 'orange' : 
                         monastery.difficulty === 'challenging' ? 'red' : 'blue'

        const customIcon = L.divIcon({
          html: `
            <div style="
              background-color: ${iconColor};
              width: 25px;
              height: 25px;
              border-radius: 50%;
              border: 3px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 12px;
              font-weight: bold;
            ">🏛️</div>
          `,
          className: 'custom-marker',
          iconSize: [25, 25],
          iconAnchor: [12.5, 12.5]
        })

        const marker = L.marker([monastery.coordinates.lat, monastery.coordinates.lng], {
          icon: customIcon
        }).addTo(mapInstanceRef.current!)

        // Add popup
        const popupContent = `
          <div style="min-width: 200px;">
            <img src="${monastery.image}" alt="${monastery.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #1f2937;">${monastery.name}</h3>
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280;">${monastery.location}</p>
            <p style="margin: 0 0 12px 0; font-size: 12px; color: #374151;">${monastery.description.substring(0, 100)}...</p>
            <button 
              onclick="window.selectMonastery('${monastery.id}')"
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
              "
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

        markersRef.current.push(marker)
      }
    })

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      const group = new L.FeatureGroup(markersRef.current)
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1))
    }

  }, [monasteries, onMonasterySelect])

  useEffect(() => {
    // Global function for popup buttons
    (window as any).selectMonastery = (monasteryId: string) => {
      const monastery = monasteries.find(m => m.id.toString() === monasteryId)
      if (monastery) {
        onMonasterySelect(monastery)
      }
    }

    return () => {
      delete (window as any).selectMonastery
    }
  }, [monasteries, onMonasterySelect])

  // Highlight selected monastery
  useEffect(() => {
    if (!selectedMonastery || !mapInstanceRef.current) return

    markersRef.current.forEach(marker => {
      // Reset all markers
      const icon = marker.getIcon() as L.DivIcon
      if (icon.options.html) {
        const newHtml = icon.options.html.replace(/border: 3px solid [^;]+;/, 'border: 3px solid white;')
        marker.setIcon(L.divIcon({
          ...icon.options,
          html: newHtml
        }))
      }
    })

    // Highlight selected marker
    const selectedMarker = markersRef.current.find((marker, index) => {
      const monastery = monasteries[index]
      return monastery && monastery.id === selectedMonastery.id
    })

    if (selectedMarker) {
      const icon = selectedMarker.getIcon() as L.DivIcon
      if (icon.options.html) {
        const newHtml = icon.options.html.replace(/border: 3px solid [^;]+;/, 'border: 3px solid #fbbf24;')
        selectedMarker.setIcon(L.divIcon({
          ...icon.options,
          html: newHtml
        }))
      }
      
      // Center map on selected monastery
      mapInstanceRef.current.setView([selectedMonastery.coordinates.lat, selectedMonastery.coordinates.lng], 13)
    }
  }, [selectedMonastery, monasteries])

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-96 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-600" />
      
      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border dark:border-gray-600 text-sm">
        <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Difficulty Level</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Easy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Moderate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Challenging</span>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border dark:border-gray-600">
        <div className="flex gap-2">
          <button 
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex items-center justify-center text-gray-700 dark:text-gray-300"
          >
            +
          </button>
          <button 
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="w-8 h-8 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded flex items-center justify-center text-gray-700 dark:text-gray-300"
          >
            −
          </button>
        </div>
      </div>
    </div>
  )
}