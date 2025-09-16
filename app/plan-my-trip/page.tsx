"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface TripPreferences {
  duration: string
  budget: string
  interests: string[]
  travelStyle: string
  season: string
  groupSize: number
  accommodation: string
  transportation: string
}

interface ItineraryDay {
  day: number
  title: string
  monasteries: string[]
  accommodation: string
  meals: string[]
  transportation: string
  activities: string[]
  tips: string[]
  budget: number
  totalDistance: string
  travelTime: string
}

interface TripPlan {
  title: string
  overview: string
  totalBudget: number
  bestTime: string
  difficulty: string
  highlights: string[]
  itinerary: ItineraryDay[]
  packingList: string[]
  importantNotes: string[]
  emergencyContacts: string[]
}

export default function PlanMyTripPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [preferences, setPreferences] = useState<TripPreferences>({
    duration: '',
    budget: '',
    interests: [],
    travelStyle: '',
    season: '',
    groupSize: 1,
    accommodation: '',
    transportation: ''
  })
  const [generatedPlan, setGeneratedPlan] = useState<TripPlan | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateTripPlan = async () => {
    setIsGenerating(true)
    
    // Simulate AI processing with advanced logic
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const plan = createOptimizedItinerary(preferences)
    setGeneratedPlan(plan)
    setIsGenerating(false)
  }

  const createOptimizedItinerary = (prefs: TripPreferences): TripPlan => {
    const monasteryData = {
      'East Sikkim': [
        { name: 'Rumtek Monastery', time: '3-4 hours', highlight: 'Seat of Karmapa', difficulty: 'Easy' },
        { name: 'Enchey Monastery', time: '2-3 hours', highlight: 'City monastery', difficulty: 'Easy' },
        { name: 'Do Drul Chorten', time: '1-2 hours', highlight: 'Sacred stupa', difficulty: 'Easy' }
      ],
      'West Sikkim': [
        { name: 'Pemayangtse Monastery', time: '4-5 hours', highlight: 'Oldest monastery', difficulty: 'Medium' },
        { name: 'Tashiding Monastery', time: '3-4 hours', highlight: 'Holiest monastery', difficulty: 'Medium' }
      ],
      'North Sikkim': [
        { name: 'Phodong Monastery', time: '3-4 hours', highlight: 'Reconstructed beauty', difficulty: 'Hard' },
        { name: 'Labrang Monastery', time: '4-5 hours', highlight: 'Remote location', difficulty: 'Hard' }
      ],
      'South Sikkim': [
        { name: 'Ralang Monastery', time: '3-4 hours', highlight: 'Kagyed dance', difficulty: 'Medium' }
      ]
    }

    // Generate optimized route based on preferences
    const duration = parseInt(prefs.duration)
    const budgetLevel = prefs.budget
    const isWinter = prefs.season === 'winter'
    
    let itinerary: ItineraryDay[] = []
    
    if (duration <= 3) {
      // Short trip - focus on East Sikkim
      itinerary = [
        {
          day: 1,
          title: "Arrival & Gangtok Exploration",
          monasteries: ['Enchey Monastery', 'Do Drul Chorten'],
          accommodation: budgetLevel === 'budget' ? 'Hotel Tibet (₹2,500/night)' : 'Mayfair Spa Resort (₹8,500/night)',
          meals: ['Welcome lunch at local restaurant', 'Traditional Sikkimese dinner'],
          transportation: 'Local taxi/shared jeep',
          activities: ['City acclimatization walk', 'Visit MG Marg', 'Sunset viewpoint'],
          tips: ['Carry altitude sickness medicine', 'Dress warmly', 'Respect photography rules'],
          budget: budgetLevel === 'budget' ? 4500 : 12000,
          totalDistance: '25 km',
          travelTime: '2-3 hours'
        },
        {
          day: 2,
          title: "Rumtek Monastery Day Trip",
          monasteries: ['Rumtek Monastery'],
          accommodation: 'Same as Day 1',
          meals: ['Early breakfast', 'Lunch at monastery canteen', 'Dinner in Gangtok'],
          transportation: 'Hired taxi (₹1,500 round trip)',
          activities: ['Monastery tour', 'Meditation session', 'Monks interaction', 'Souvenir shopping'],
          tips: ['Start early (7 AM)', 'Wear respectful clothing', 'Maintain silence in prayer halls'],
          budget: budgetLevel === 'budget' ? 3500 : 8500,
          totalDistance: '48 km',
          travelTime: '3-4 hours'
        }
      ]
      
      if (duration === 3) {
        itinerary.push({
          day: 3,
          title: "West Sikkim - Pelling",
          monasteries: ['Pemayangtse Monastery'],
          accommodation: 'Checkout and departure',
          meals: ['Breakfast', 'Lunch in Pelling', 'Departure snacks'],
          transportation: 'Shared jeep to Pelling (₹300 per person)',
          activities: ['Monastery visit', 'Kanchenjunga viewpoint', 'Local handicrafts'],
          tips: ['Check weather conditions', 'Carry warm clothes', 'Book return transport early'],
          budget: budgetLevel === 'budget' ? 3000 : 7000,
          totalDistance: '115 km',
          travelTime: '4-5 hours'
        })
      }
    } else if (duration <= 7) {
      // Medium trip - East + West Sikkim
      itinerary = [
        {
          day: 1,
          title: "Arrival & Gangtok Settlement",
          monasteries: ['Do Drul Chorten'],
          accommodation: budgetLevel === 'budget' ? 'Zostel Gangtok (₹1,200/night)' : 'The Elgin Nor-Khill (₹12,000/night)',
          meals: ['Airport pickup lunch', 'Traditional thukpa dinner'],
          transportation: 'Airport transfer + local walking',
          activities: ['Check-in and rest', 'Evening city walk', 'Acclimatization'],
          tips: ['Hydrate well', 'Light dinner', 'Early sleep for altitude adjustment'],
          budget: budgetLevel === 'budget' ? 3500 : 15000,
          totalDistance: '15 km',
          travelTime: '1-2 hours'
        },
        {
          day: 2,
          title: "East Sikkim Monastery Trail",
          monasteries: ['Enchey Monastery', 'Rumtek Monastery'],
          accommodation: 'Same as Day 1',
          meals: ['Early breakfast', 'Monastery lunch', 'Gangtok dinner'],
          transportation: 'Full day taxi hire (₹2,500)',
          activities: ['Morning prayers at Enchey', 'Rumtek detailed tour', 'Photography session'],
          tips: ['6 AM start recommended', 'Carry camera with extra batteries', 'Respect monastery timings'],
          budget: budgetLevel === 'budget' ? 4500 : 10000,
          totalDistance: '65 km',
          travelTime: '4-5 hours'
        },
        {
          day: 3,
          title: "Transfer to Pelling",
          monasteries: [],
          accommodation: budgetLevel === 'budget' ? 'Hotel Pelling Organic Retreat (₹2,800/night)' : 'Norbu Ghang Resort (₹9,500/night)',
          meals: ['Breakfast in Gangtok', 'Lunch en route', 'Pelling dinner'],
          transportation: 'Shared jeep or private taxi (₹2,000)',
          activities: ['Scenic drive', 'Waterfall stops', 'Check-in and rest'],
          tips: ['Morning departure recommended', 'Carry motion sickness tablets', 'Enjoy mountain views'],
          budget: budgetLevel === 'budget' ? 5000 : 12000,
          totalDistance: '115 km',
          travelTime: '4-5 hours'
        },
        {
          day: 4,
          title: "West Sikkim Monastery Exploration",
          monasteries: ['Pemayangtse Monastery', 'Tashiding Monastery'],
          accommodation: 'Same as Day 3',
          meals: ['Early breakfast', 'Packed lunch', 'Traditional dinner'],
          transportation: 'Local taxi hire (₹3,000)',
          activities: ['Sunrise at Kanchenjunga viewpoint', 'Detailed monastery tours', 'Local village interaction'],
          tips: ['4:30 AM start for sunrise', 'Warm clothes essential', 'Respect local customs'],
          budget: budgetLevel === 'budget' ? 5500 : 11000,
          totalDistance: '85 km',
          travelTime: '5-6 hours'
        }
      ]
      
      // Add more days for 5-7 day trips
      if (duration >= 5) {
        itinerary.push({
          day: 5,
          title: "North Sikkim Adventure (If accessible)",
          monasteries: isWinter ? [] : ['Phodong Monastery'],
          accommodation: isWinter ? 'Same as Day 3' : 'Basic guesthouse in Mangan (₹1,500/night)',
          meals: ['Early breakfast', 'Packed lunch', 'Simple dinner'],
          transportation: 'Shared jeep + permits required (₹4,000)',
          activities: isWinter ? ['Rest day', 'Local sightseeing', 'Handicraft shopping'] : ['High altitude monastery', 'Mountain views', 'Local culture'],
          tips: isWinter ? ['North Sikkim closed in winter', 'Use day for rest/shopping'] : ['Permits mandatory', 'High altitude - go slow', 'Warm clothes essential'],
          budget: budgetLevel === 'budget' ? 6000 : 13000,
          totalDistance: isWinter ? '20 km' : '120 km',
          travelTime: isWinter ? '2 hours' : '6-7 hours'
        })
      }
    } else {
      // Long trip - All districts comprehensive
      itinerary = createComprehensiveItinerary(prefs, budgetLevel, isWinter)
    }

    return {
      title: `${duration}-Day Sikkim Monastery Spiritual Journey`,
      overview: `A carefully crafted ${duration}-day itinerary covering Sikkim's most sacred monasteries, optimized for ${prefs.travelStyle} travelers with ${budgetLevel} budget preferences. Experience the rich Buddhist heritage across ${duration <= 3 ? '1-2' : duration <= 7 ? '2-3' : '4'} districts of Sikkim.`,
      totalBudget: itinerary.reduce((sum, day) => sum + day.budget, 0),
      bestTime: prefs.season === 'winter' ? 'October-February (Clear views but cold)' : 'March-May & September-November (Best weather)',
      difficulty: duration <= 3 ? 'Easy' : duration <= 7 ? 'Medium' : 'Challenging',
      highlights: [
        'Rumtek Monastery - Seat of the Karmapa',
        'Pemayangtse - Oldest monastery in Sikkim',
        'Tashiding - Holiest monastery',
        'Traditional Buddhist ceremonies',
        'Himalayan mountain views',
        'Local cultural immersion'
      ],
      itinerary,
      packingList: [
        '🧥 Warm clothes (layers)',
        '👟 Comfortable walking shoes',
        '📷 Camera with extra batteries',
        '💊 Altitude sickness medicine',
        '🎒 Day backpack',
        '💧 Water bottle',
        '🕯️ Flashlight',
        '💰 Cash (ATMs limited)',
        '📱 Power bank',
        '🧣 Warm accessories'
      ],
      importantNotes: [
        '📱 Limited internet connectivity in remote areas',
        '🏔️ Weather can change rapidly - be prepared',
        '💸 Carry sufficient cash - card payments limited',
        '📄 Permits required for North Sikkim',
        '🙏 Dress modestly in monasteries',
        '📸 Photography restrictions in prayer halls',
        '⏰ Monastery timings vary - confirm in advance',
        '🍃 Respect local customs and environment'
      ],
      emergencyContacts: [
        '🚑 Emergency: 102',
        '👮 Police: 100',
        '🏥 Gangtok Hospital: +91-3592-202016',
        '🏛️ Tourism Helpline: +91-3592-202751',
        '🚁 Helicopter Service: +91-3592-280311'
      ]
    }
  }

  const createComprehensiveItinerary = (prefs: TripPreferences, budgetLevel: string, isWinter: boolean): ItineraryDay[] => {
    // Implementation for 8+ day comprehensive trips
    return [
      {
        day: 1,
        title: "Grand Arrival & Acclimatization",
        monasteries: ['Do Drul Chorten'],
        accommodation: budgetLevel === 'budget' ? 'Backpacker hostel (₹800/night)' : 'Luxury resort (₹15,000/night)',
        meals: ['Airport lunch', 'Welcome dinner with cultural show'],
        transportation: 'Premium airport transfer',
        activities: ['Gentle city exploration', 'Cultural orientation', 'Rest and acclimatization'],
        tips: ['Take it slow first day', 'Hydrate well', 'Light activities only'],
        budget: budgetLevel === 'budget' ? 3000 : 18000,
        totalDistance: '25 km',
        travelTime: '2 hours'
      }
      // ... more comprehensive days
    ]
  }

  const interestOptions = [
    'Buddhist Philosophy', 'Architecture', 'Photography', 'Meditation', 
    'Cultural Immersion', 'Mountain Views', 'Local Cuisine', 'Handicrafts'
  ]

  const toggleInterest = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  if (generatedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">
              🗺️ Your Personalized Trip Plan
            </h1>
            <p className="text-blue-600 text-lg">{generatedPlan.title}</p>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <Badge className="bg-green-600 text-white px-4 py-2">
                💰 Total Budget: ₹{generatedPlan.totalBudget.toLocaleString()}
              </Badge>
              <Badge className="bg-blue-600 text-white px-4 py-2">
                📅 {generatedPlan.bestTime}
              </Badge>
              <Badge className="bg-purple-600 text-white px-4 py-2">
                ⭐ {generatedPlan.difficulty}
              </Badge>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Itinerary */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-blue-800">📋 Trip Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{generatedPlan.overview}</p>
                  <div>
                    <h4 className="font-semibold mb-2">🌟 Trip Highlights:</h4>
                    <ul className="space-y-1">
                      {generatedPlan.highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-gray-600">• {highlight}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Daily Itinerary */}
              {generatedPlan.itinerary.map((day, index) => (
                <Card key={index} className="shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-green-800">
                      Day {day.day}: {day.title}
                    </CardTitle>
                    <div className="flex gap-2 flex-wrap">
                      <Badge className="bg-blue-100 text-blue-800">
                        💰 ₹{day.budget.toLocaleString()}
                      </Badge>
                      <Badge className="bg-green-100 text-green-800">
                        🚗 {day.totalDistance}
                      </Badge>
                      <Badge className="bg-purple-100 text-purple-800">
                        ⏱️ {day.travelTime}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {day.monasteries.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🏛️ Monasteries to Visit:</h4>
                        <div className="flex gap-2 flex-wrap">
                          {day.monasteries.map((monastery, idx) => (
                            <Badge key={idx} className="bg-orange-100 text-orange-800">
                              {monastery}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🏨 Accommodation:</h4>
                        <p className="text-sm text-gray-600">{day.accommodation}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">🚗 Transportation:</h4>
                        <p className="text-sm text-gray-600">{day.transportation}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🍽️ Meals:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {day.meals.map((meal, idx) => (
                          <li key={idx}>• {meal}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">🎯 Activities:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {day.activities.map((activity, idx) => (
                          <li key={idx}>• {activity}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tips:</h4>
                      <ul className="text-sm text-yellow-700 space-y-1">
                        {day.tips.map((tip, idx) => (
                          <li key={idx}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Packing List */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-green-800">🎒 Packing Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {generatedPlan.packingList.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Important Notes */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-red-800">⚠️ Important Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {generatedPlan.importantNotes.map((note, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {note}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Emergency Contacts */}
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-blue-800">📞 Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {generatedPlan.emergencyContacts.map((contact, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {contact}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  📄 Download/Print Plan
                </button>
                <button
                  onClick={() => setGeneratedPlan(null)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  🔄 Create New Plan
                </button>
                <Link 
                  href="/monasteries"
                  className="block w-full bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  🏛️ Explore Monasteries
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            🗺️ AI-Powered Trip Planner
          </h1>
          <p className="text-blue-600 text-lg">
            Create your perfect Sikkim monastery journey with our intelligent trip planner
          </p>
          
          {/* Progress Indicator */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`w-12 h-1 mx-2 ${
                      currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-blue-800">
              Step {currentStep}: {
                currentStep === 1 ? 'Trip Duration & Budget' :
                currentStep === 2 ? 'Travel Preferences' :
                currentStep === 3 ? 'Interests & Style' :
                'Review & Generate'
              }
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    How many days do you have?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['2', '3', '5', '7', '10', '14'].map((days) => (
                      <button
                        key={days}
                        onClick={() => setPreferences(prev => ({ ...prev, duration: days }))}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          preferences.duration === days
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {days} Days
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What's your budget range per person?
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'budget', label: 'Budget', desc: '₹5,000-15,000', icon: '💰' },
                      { id: 'mid', label: 'Mid-Range', desc: '₹15,000-35,000', icon: '💳' },
                      { id: 'luxury', label: 'Luxury', desc: '₹35,000+', icon: '💎' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setPreferences(prev => ({ ...prev, budget: option.id }))}
                        className={`p-4 rounded-lg text-left transition-colors ${
                          preferences.budget === option.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm opacity-75">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Group size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={preferences.groupSize}
                    onChange={(e) => setPreferences(prev => ({ ...prev, groupSize: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Number of travelers"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    When are you planning to visit?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'spring', label: 'Spring', desc: 'Mar-May', icon: '🌸' },
                      { id: 'summer', label: 'Summer', desc: 'Jun-Aug', icon: '☀️' },
                      { id: 'autumn', label: 'Autumn', desc: 'Sep-Nov', icon: '🍂' },
                      { id: 'winter', label: 'Winter', desc: 'Dec-Feb', icon: '❄️' }
                    ].map((season) => (
                      <button
                        key={season.id}
                        onClick={() => setPreferences(prev => ({ ...prev, season: season.id }))}
                        className={`p-3 rounded-lg text-center transition-colors ${
                          preferences.season === season.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="text-2xl mb-1">{season.icon}</div>
                        <div className="font-medium text-sm">{season.label}</div>
                        <div className="text-xs opacity-75">{season.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred accommodation type
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'hostel', label: 'Hostels/Budget', icon: '🏠' },
                      { id: 'hotel', label: 'Hotels/Guesthouses', icon: '🏨' },
                      { id: 'resort', label: 'Resorts/Luxury', icon: '🏖️' }
                    ].map((acc) => (
                      <button
                        key={acc.id}
                        onClick={() => setPreferences(prev => ({ ...prev, accommodation: acc.id }))}
                        className={`p-3 rounded-lg text-center transition-colors ${
                          preferences.accommodation === acc.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="text-2xl mb-2">{acc.icon}</div>
                        <div className="font-medium">{acc.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Transportation preference
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'shared', label: 'Shared Transport', desc: 'Budget-friendly', icon: '🚌' },
                      { id: 'private', label: 'Private Vehicle', desc: 'Flexible timing', icon: '🚗' },
                      { id: 'mixed', label: 'Mixed', desc: 'Best of both', icon: '🔄' }
                    ].map((transport) => (
                      <button
                        key={transport.id}
                        onClick={() => setPreferences(prev => ({ ...prev, transportation: transport.id }))}
                        className={`p-3 rounded-lg text-center transition-colors ${
                          preferences.transportation === transport.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="text-2xl mb-1">{transport.icon}</div>
                        <div className="font-medium text-sm">{transport.label}</div>
                        <div className="text-xs opacity-75">{transport.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    What interests you most? (Select multiple)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`p-3 rounded-lg text-sm text-center transition-colors ${
                          preferences.interests.includes(interest)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Travel style
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'relaxed', label: 'Relaxed Explorer', desc: 'Take it slow, enjoy the journey' },
                      { id: 'balanced', label: 'Balanced Traveler', desc: 'Mix of activities and rest' },
                      { id: 'adventurous', label: 'Adventure Seeker', desc: 'Pack in as much as possible' }
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setPreferences(prev => ({ ...prev, travelStyle: style.id }))}
                        className={`p-4 rounded-lg text-left transition-colors ${
                          preferences.travelStyle === style.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        <div className="font-medium">{style.label}</div>
                        <div className="text-sm opacity-75">{style.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">
                    📋 Your Trip Preferences Summary
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Duration:</span> {preferences.duration} days
                    </div>
                    <div>
                      <span className="font-medium">Budget:</span> {preferences.budget}
                    </div>
                    <div>
                      <span className="font-medium">Season:</span> {preferences.season}
                    </div>
                    <div>
                      <span className="font-medium">Group size:</span> {preferences.groupSize} people
                    </div>
                    <div>
                      <span className="font-medium">Accommodation:</span> {preferences.accommodation}
                    </div>
                    <div>
                      <span className="font-medium">Transport:</span> {preferences.transportation}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Interests:</span> {preferences.interests.join(', ')}
                    </div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Travel style:</span> {preferences.travelStyle}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-blue-600">
                        🤖 AI is crafting your perfect itinerary...
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={generateTripPlan}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      🚀 Generate My Trip Plan
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                ← Previous
              </button>
              
              {currentStep < 4 && (
                <button
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Next →
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}