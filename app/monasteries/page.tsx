"use client"

import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { createClient } from '@/lib/supabase/client'
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface Monastery {
  id: string
  monastery_name: string
  district: string
  address: string
  latitude: number
  longitude: number
  description?: string
  founded_year?: number
  monastery_type?: string
  visiting_hours?: string
  entry_fee?: number
  contact_phone?: string
  website?: string
  image_url?: string
}

export default function MonasteriesPage() {
  const [monasteries, setMonasteries] = useState<Monastery[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All')

  useEffect(() => {
    fetchMonasteries()
  }, [])

  const fetchMonasteries = async () => {
    try {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('monasteries')
        .select('*')
        .order('monastery_name')

      if (error) throw error

      if (data && data.length > 0) {
        setMonasteries(data)
      } else {
        // Fallback sample data with images and details
        setMonasteries([
          {
            id: '1',
            monastery_name: 'Rumtek Monastery',
            district: 'East Sikkim',
            address: 'Rumtek, East Sikkim 737135',
            latitude: 27.3153,
            longitude: 88.5502,
            description: 'Rumtek Monastery is one of the most significant monasteries in Sikkim. It is the seat of the Karmapa, head of the Karma Kagyu lineage. The monastery was built in the 1960s and houses many precious Buddhist artifacts.',
            founded_year: 1966,
            monastery_type: 'Karma Kagyu',
            visiting_hours: '6:00 AM - 6:00 PM',
            entry_fee: 0,
            contact_phone: '+91-3592-252523',
            image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=300&fit=crop'
          },
          {
            id: '2',
            monastery_name: 'Enchey Monastery',
            district: 'East Sikkim',
            address: 'Gangtok, Sikkim 737101',
            latitude: 27.3389,
            longitude: 88.6065,
            description: 'Enchey Monastery is a 200-year-old Buddhist monastery located in Gangtok. The monastery belongs to the Nyingma order of Vajrayana Buddhism.',
            founded_year: 1840,
            monastery_type: 'Nyingma',
            visiting_hours: '5:00 AM - 7:00 PM',
            entry_fee: 0,
            contact_phone: '+91-3592-202596',
            image_url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=300&fit=crop'
          },
          {
            id: '3',
            monastery_name: 'Pemayangtse Monastery',
            district: 'West Sikkim',
            address: 'Pelling, West Sikkim 737113',
            latitude: 27.2151,
            longitude: 88.2468,
            description: 'Pemayangtse Monastery is one of the oldest and premier monasteries of Sikkim. Built in 1705, it is the head monastery of the Nyingma order.',
            founded_year: 1705,
            monastery_type: 'Nyingma',
            visiting_hours: '7:00 AM - 5:00 PM',
            entry_fee: 10,
            contact_phone: '+91-3595-250658',
            image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop'
          },
          {
            id: '4',
            monastery_name: 'Tashiding Monastery',
            district: 'West Sikkim',
            address: 'Tashiding, West Sikkim',
            latitude: 27.3404,
            longitude: 88.2717,
            description: 'Tashiding Monastery is regarded as the holiest of all monasteries in Sikkim. Located on a hilltop, it offers breathtaking views of the surrounding mountains.',
            founded_year: 1641,
            monastery_type: 'Nyingma',
            visiting_hours: '6:00 AM - 6:00 PM',
            entry_fee: 0,
            image_url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500&h=300&fit=crop'
          },
          {
            id: '5',
            monastery_name: 'Phodong Monastery',
            district: 'North Sikkim',
            address: 'Phodong, North Sikkim',
            latitude: 27.4711,
            longitude: 88.5747,
            description: 'Phodong Monastery is one of the six most important monasteries of Sikkim. It was reconstructed in 1977 and houses many ancient Buddhist scriptures.',
            founded_year: 1740,
            monastery_type: 'Kagyu',
            visiting_hours: '6:00 AM - 5:00 PM',
            entry_fee: 0,
            image_url: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&h=300&fit=crop'
          },
          {
            id: '6',
            monastery_name: 'Labrang Monastery',
            district: 'North Sikkim',
            address: 'Lachen, North Sikkim',
            latitude: 27.5000,
            longitude: 88.5500,
            description: 'Labrang Monastery is located in the beautiful valley of Lachen. It is known for its peaceful environment and traditional Buddhist architecture.',
            founded_year: 1806,
            monastery_type: 'Nyingma',
            visiting_hours: '7:00 AM - 4:00 PM',
            entry_fee: 0,
            image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop'
          },
          {
            id: '7',
            monastery_name: 'Ralang Monastery',
            district: 'South Sikkim',
            address: 'Ralang, South Sikkim',
            latitude: 27.1500,
            longitude: 88.5000,
            description: 'Ralang Monastery is known for its annual Kagyed dance festival. The monastery houses beautiful murals and ancient Buddhist texts.',
            founded_year: 1768,
            monastery_type: 'Kagyu',
            visiting_hours: '6:00 AM - 6:00 PM',
            entry_fee: 5,
            image_url: 'https://images.unsplash.com/photo-1591123720511-7637d5d3ffe4?w=500&h=300&fit=crop'
          },
          {
            id: '8',
            monastery_name: 'Do Drul Chorten',
            district: 'East Sikkim',
            address: 'Gangtok, East Sikkim',
            latitude: 27.3270,
            longitude: 88.6051,
            description: 'Do Drul Chorten is one of the most important stupas in Sikkim. Built in 1945, it contains complete Dorjee Phurba, Kangyur relics and other sacred objects.',
            founded_year: 1945,
            monastery_type: 'Nyingma',
            visiting_hours: '5:00 AM - 8:00 PM',
            entry_fee: 0,
            image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop'
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching monasteries:', error)
    } finally {
      setLoading(false)
    }
  }

  const districts = ['All', 'East Sikkim', 'West Sikkim', 'North Sikkim', 'South Sikkim']
  
  const filteredMonasteries = selectedDistrict === 'All' 
    ? monasteries 
    : monasteries.filter(m => m.district === selectedDistrict)

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-6">
      <Navigation />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            Explore Sikkim's Sacred Monasteries
          </h1>
          <p className="text-lg text-green-600 mb-6">
            Discover the spiritual heritage and rich Buddhist culture of Sikkim
          </p>
          
          {/* District Filter */}
          <div className="flex justify-center gap-2 flex-wrap">
            {districts.map(district => (
              <button
                key={district}
                onClick={() => setSelectedDistrict(district)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDistrict === district
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-green-600 hover:bg-green-100'
                }`}
              >
                {district} {district !== 'All' && `(${monasteries.filter(m => m.district === district).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Monasteries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMonasteries.map((monastery, index) => (
            <Card key={monastery.id} className="monastery-card card-hover-effect overflow-hidden shadow-xl border-0 bg-white">
              {/* Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={monastery.image_url || `https://images.unsplash.com/photo-${1544735716392 + index}fe2489ffa?w=600&h=400&fit=crop`}
                  alt={monastery.monastery_name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const fallbackImages = [
                      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
                      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop',
                      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop',
                      'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop',
                      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop',
                      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
                      'https://images.unsplash.com/photo-1591123720511-7637d5d3ffe4?w=600&h=400&fit=crop',
                      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop'
                    ]
                    e.currentTarget.src = fallbackImages[index % fallbackImages.length]
                  }}
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white text-green-800 font-semibold">
                    {monastery.district}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-green-800 font-bold mb-2">
                  {monastery.monastery_name}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📍</span>
                  <span>{monastery.address}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm">
                  {monastery.description?.slice(0, 100) || 'A sacred Buddhist monastery in Sikkim.'}...
                </p>

                {/* Basic Info */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Founded: {monastery.founded_year || 'Ancient'}</span>
                  <span>{monastery.entry_fee === 0 ? 'Free Entry' : `₹${monastery.entry_fee}`}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Link 
                    href={`/monastery/${monastery.id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    Learn More
                  </Link>
                  <Link 
                    href={`/maps?monastery=${monastery.id}`}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                  >
                    View on Map
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link 
            href="/maps"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            🗺️ View All on Interactive Map
          </Link>
        </div>


      </div>
    </div>
  )
}
