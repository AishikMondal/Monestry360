"use client"

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Dynamic import for safer Leaflet component
const SafeLeafletMap = dynamic(() => import('@/components/SafeLeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="h-96 w-full bg-gray-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        <p className="text-sm mt-2 text-gray-600">Loading map...</p>
      </div>
    </div>
  )
})

interface Monastery {
  id: string
  name: string
  latitude: number
  longitude: number
  district: string
  address: string
}

export default function MapsPage() {
  const [monasteries, setMonasteries] = useState<Monastery[]>([])
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMonasteries()
  }, [])

  const fetchMonasteries = async () => {
    try {
      const supabase = createClient()
      
      console.log('Fetching monasteries from Supabase...')
      
      // Fetch monasteries with coordinates
      const { data, error } = await supabase
        .from('monasteries')
        .select(`
          id,
          monastery_name,
          district,
          address,
          latitude,
          longitude
        `)

      console.log('Supabase response:', { data, error })

      if (error) throw error

      const formattedData = data?.map(monastery => ({
        id: monastery.id,
        name: monastery.monastery_name || 'Unknown Monastery',
        district: monastery.district || 'Unknown District',
        address: monastery.address || 'No address provided',
        latitude: monastery.latitude || 27.3389,
        longitude: monastery.longitude || 88.6065
      })) || []

      console.log('Formatted monasteries:', formattedData)
      
      if (formattedData.length === 0) {
        console.log('No monasteries from database, using fallback data')
        throw new Error('No data from database')
      }
      
      setMonasteries(formattedData)
    } catch (error) {
      console.error('Error fetching monasteries:', error)
      // Fallback sample data for demonstration - distributed across all 4 districts
      const sampleData = [
        // East Sikkim (3 monasteries)
        {
          id: '1',
          name: 'Rumtek Monastery',
          latitude: 27.3153,
          longitude: 88.5502,
          district: 'East Sikkim',
          address: 'Rumtek, East Sikkim 737135'
        },
        {
          id: '2',
          name: 'Enchey Monastery', 
          latitude: 27.3389,
          longitude: 88.6065,
          district: 'East Sikkim',
          address: 'Gangtok, Sikkim 737101'
        },
        {
          id: '3',
          name: 'Do Drul Chorten Monastery',
          latitude: 27.3270,
          longitude: 88.6051,
          district: 'East Sikkim',
          address: 'Gangtok, East Sikkim'
        },
        // West Sikkim (2 monasteries)
        {
          id: '4',
          name: 'Pemayangtse Monastery',
          latitude: 27.2151,
          longitude: 88.2468,
          district: 'West Sikkim',
          address: 'Pelling, West Sikkim 737113'
        },
        {
          id: '5',
          name: 'Tashiding Monastery',
          latitude: 27.3404,
          longitude: 88.2717,
          district: 'West Sikkim',
          address: 'Tashiding, West Sikkim'
        },
        // North Sikkim (2 monasteries)
        {
          id: '6',
          name: 'Phodong Monastery',
          latitude: 27.4711,
          longitude: 88.5747,
          district: 'North Sikkim',
          address: 'Phodong, North Sikkim'
        },
        {
          id: '7',
          name: 'Labrang Monastery',
          latitude: 27.5000,
          longitude: 88.5500,
          district: 'North Sikkim',
          address: 'Lachen, North Sikkim'
        },
        // South Sikkim (1 monastery)
        {
          id: '8',
          name: 'Ralang Monastery',
          latitude: 27.1500,
          longitude: 88.5000,
          district: 'South Sikkim',
          address: 'Ralang, South Sikkim'
        }
      ]
      console.log('Using fallback sample data:', sampleData)
      setMonasteries(sampleData)
    } finally {
      setLoading(false)
    }
  }

  const handleMarkerClick = (monastery: Monastery) => {
    setSelectedMonastery(monastery)
    console.log('Monastery selected:', monastery)
  }

  // Calculate regional statistics
  const regionalStats = monasteries.reduce((stats, monastery) => {
    const district = monastery.district
    if (!stats[district]) {
      stats[district] = 0
    }
    stats[district]++
    return stats
  }, {} as Record<string, number>)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading monasteries...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Monastery Map of Sikkim
          </h1>
          <p className="text-green-600">
            Discover the spiritual heritage of Sikkim through our interactive map
          </p>

          <div className="mt-2 text-sm text-blue-600">
            📊 Total: {monasteries.length} monasteries across {Object.keys(regionalStats).length} districts
          </div>
          
          {/* Regional Distribution */}
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(regionalStats).map(([district, count]) => (
              <span 
                key={district}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {district}: {count}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl border-0">
              <CardContent className="p-0">
                <SafeLeafletMap
                  monasteries={monasteries}
                  height="600px"
                  onMarkerClick={handleMarkerClick}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Monastery Details */}
            {selectedMonastery && (
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="text-green-800">
                    {selectedMonastery.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        {selectedMonastery.district}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Address:</h4>
                      <p className="text-sm text-gray-600">{selectedMonastery.address}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-1">Coordinates:</h4>
                      <p className="text-sm text-gray-600">
                        {selectedMonastery.latitude.toFixed(4)}, {selectedMonastery.longitude.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Monasteries List */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-green-800">
                  All Monasteries ({monasteries.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {monasteries.map((monastery) => (
                    <div
                      key={monastery.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedMonastery?.id === monastery.id
                          ? 'bg-green-50 border-green-200'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => setSelectedMonastery(monastery)}
                    >
                      <h4 className="font-medium text-gray-800">{monastery.name}</h4>
                      <p className="text-sm text-gray-600">{monastery.district}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Regional Statistics */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-green-800">
                  Regional Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(regionalStats)
                    .sort(([,a], [,b]) => b - a) // Sort by count descending
                    .map(([district, count]) => (
                    <div key={district} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{district}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(count / Math.max(...Object.values(regionalStats))) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-green-800 min-w-[20px]">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">Total Districts:</span>
                    <span className="font-semibold text-green-800">{Object.keys(regionalStats).length}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="font-medium text-gray-700">Total Monasteries:</span>
                    <span className="font-semibold text-green-800">{monasteries.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}