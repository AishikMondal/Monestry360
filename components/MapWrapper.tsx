"use client"

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Leaflet to avoid SSR issues
const Map = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading Map...</p>
      </div>
    </div>
  )
})

interface MapWrapperProps {
  monasteries: any[]
  selectedMonastery: any
  onMonasterySelect: (monastery: any) => void
}

export default function MapWrapper({ monasteries, selectedMonastery, onMonasterySelect }: MapWrapperProps) {
  return (
    <div className="h-96 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
      <Map 
        monasteries={monasteries}
        selectedMonastery={selectedMonastery}
        onMonasterySelect={onMonasterySelect}
      />
    </div>
  )
}