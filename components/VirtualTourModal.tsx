"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface VirtualTourModalProps {
  monastery: {
    id: string
    monastery_name: string
    district: string
    description?: string
    image_url?: string
  }
  isOpen: boolean
  onClose: () => void
}

export default function VirtualTourModal({ monastery, isOpen, onClose }: VirtualTourModalProps) {
  const [currentView, setCurrentView] = useState('exterior')

  if (!isOpen) return null

  const tourViews = [
    {
      id: 'exterior',
      name: 'Exterior View',
      description: 'Admire the beautiful architecture and serene surroundings',
      image: monastery.image_url || 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop'
    },
    {
      id: 'main-hall',
      name: 'Main Prayer Hall',
      description: 'Experience the spiritual atmosphere of the main worship area',
      image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop'
    },
    {
      id: 'buddha-statue',
      name: 'Buddha Statue',
      description: 'Marvel at the magnificent Buddha statue and intricate details',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop'
    },
    {
      id: 'courtyard',
      name: 'Monastery Courtyard',
      description: 'Explore the peaceful courtyard where monks gather',
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop'
    }
  ]

  const currentViewData = tourViews.find(view => view.id === currentView) || tourViews[0]

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-green-800">
              Virtual Tour: {monastery.monastery_name}
            </h2>
            <p className="text-gray-600">{monastery.district}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 p-6">
          {/* Main View */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="overflow-hidden shadow-lg">
              <div className="relative h-96 bg-gray-200">
                <img
                  src={currentViewData.image}
                  alt={currentViewData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{currentViewData.name}</h3>
                  <p className="text-sm text-white/90">{currentViewData.description}</p>
                </div>
                
                {/* 360° Indicator */}
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  🌐 360° View
                </div>
              </div>
            </Card>

            {/* Virtual Tour Controls */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-3">Tour Controls</h4>
              <div className="flex gap-2 flex-wrap">
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-2">
                  🎵 Audio Guide
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-2">
                  📱 AR Mode
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-2">
                  🔍 Zoom
                </button>
                <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-2">
                  📷 Screenshot
                </button>
              </div>
            </div>
          </div>

          {/* Tour Navigation */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Explore Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tourViews.map((view) => (
                  <button
                    key={view.id}
                    onClick={() => setCurrentView(view.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      currentView === view.id
                        ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 shadow-md'
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={view.image}
                          alt={view.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-gray-800 truncate">{view.name}</h5>
                        <p className="text-xs text-gray-600 truncate">{view.description}</p>
                      </div>
                      {currentView === view.id && (
                        <div className="text-green-600 font-bold">▶</div>
                      )}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Information Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-800">About This Monastery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {monastery.description || 'Immerse yourself in the spiritual ambiance of this sacred monastery. Each view offers a unique perspective of the architectural beauty and religious significance of this holy place.'}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Tour Progress</span>
                    <span className="font-medium text-green-600">
                      {tourViews.findIndex(v => v.id === currentView) + 1} / {tourViews.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((tourViews.findIndex(v => v.id === currentView) + 1) / tourViews.length) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share & Actions */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                📱 Share Experience
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                💝 Add to Favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}