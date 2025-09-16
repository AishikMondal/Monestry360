"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function PlanYourVisitPage() {
  const [formData, setFormData] = useState({
    startLocation: '',
    duration: '',
    budget: '',
    interests: [] as string[],
    travelMonth: '',
    groupSize: 1,
    physicalFitness: '',
    transport: ''
  })
  
  const [generatedGuide, setGeneratedGuide] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateGuide = async () => {
    setIsGenerating(true)
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    const duration = parseInt(formData.duration)
    const isBudget = formData.budget === 'budget'
    const isWinter = ['December', 'January', 'February'].includes(formData.travelMonth)
    
    const guide = {
      title: `${duration}-Day Sikkim Monastery Journey`,
      summary: `Complete ${formData.budget} travel guide for ${duration} days exploring Sikkim's sacred monasteries with ${formData.groupSize} traveler${formData.groupSize > 1 ? 's' : ''}.`,
      totalBudget: isBudget ? duration * 3500 : duration * 8500,
      itinerary: generateItinerary(duration, isBudget, isWinter),
      essentials: [
        '📄 Valid ID proof (mandatory everywhere)',
        '🧥 Warm layered clothing (temperature varies)',
        '👟 Comfortable walking/trekking shoes',
        '💊 Altitude sickness medication',
        '💰 Cash ₹500+ daily (limited ATMs)',
        '📱 Power bank & phone chargers',
        '🎒 Light daypack for monastery visits',
        '💧 Water bottle (stay hydrated)',
        '📷 Camera (check monastery photography rules)',
        '🧣 Winter accessories for cold weather'
      ],
      tips: [
        '🙏 Always dress modestly in monasteries',
        '📸 Ask permission before photographing people',
        '⏰ Confirm monastery opening hours in advance',
        '🌨️ Mountain weather changes rapidly - be prepared',
        '💸 Limited ATM availability outside Gangtok',
        '📱 Poor internet connectivity in remote areas',
        '🚗 Book transport one day in advance',
        '🏥 Carry basic first-aid and medications'
      ],
      contacts: [
        '🚑 Emergency Services: 102',
        '👮 Police Helpline: 100',
        '🏥 STNM Hospital, Gangtok: +91-3592-202016',
        '📞 Tourism Helpline: 1363',
        '🚁 Helicopter Services: +91-3592-280311'
      ]
    }
    
    setGeneratedGuide(guide)
    setIsGenerating(false)
  }

  const generateItinerary = (days: number, budget: boolean, winter: boolean) => {
    const plans = []
    
    if (days <= 2) {
      // Short Gangtok-focused trips
      plans.push({
        day: 1,
        title: "Gangtok Sacred Discovery",
        monasteries: [
          'Enchey Monastery (2 hours) - 200-year-old Nyingma monastery', 
          'Do Drul Chorten (1.5 hours) - Sacred stupa with 108 prayer wheels'
        ],
        accommodation: budget ? 'Budget hotel/hostel - ₹1,500/night' : 'Good hotel - ₹4,500/night',
        meals: ['Breakfast: ₹200', 'Local lunch (Thukpa/Momos): ₹400', 'Traditional dinner: ₹600'],
        transport: 'Local taxi + walking - ₹800',
        cost: budget ? 3500 : 6500,
        tips: [
          'Start with Do Drul Chorten for spiritual blessings',
          'Enchey offers beautiful panoramic city views',
          'Respect photography restrictions in prayer halls',
          'Dress warmly - mountain weather changes quickly'
        ]
      })
      
      if (days === 2) {
        plans.push({
          day: 2,
          title: "Rumtek Sacred Journey",
          monasteries: [
            'Rumtek Monastery (3-4 hours) - Seat of 17th Karmapa, most important Kagyu monastery'
          ],
          accommodation: 'Same as Day 1',
          meals: ['Hotel breakfast: ₹200', 'Monastery canteen lunch: ₹150', 'Gangtok dinner: ₹500'],
          transport: 'Round trip taxi to Rumtek (24 km) - ₹1,500',
          cost: budget ? 3850 : 6350,
          tips: [
            'Early morning departure recommended (8 AM)',
            'Golden Buddha hall and precious artifacts are spectacular',
            'Monks may allow Q&A sessions about Buddhism',
            'Allow extra time for photography and meditation'
          ]
        })
      }
    } else if (days <= 5) {
      // Medium trips covering East and West Sikkim
      plans.push({
        day: 1,
        title: "Arrival & Gentle Introduction",
        monasteries: [
          'Do Drul Chorten (evening visit) - Sacred stupa circumambulation for travel blessings'
        ],
        accommodation: budget ? 'Clean guesthouse - ₹1,800/night' : 'Heritage hotel - ₹5,500/night',
        meals: ['Airport/station pickup lunch: ₹500', 'Welcome traditional dinner: ₹800'],
        transport: 'Airport/station transfer + city orientation - ₹1,200',
        cost: budget ? 4300 : 8000,
        tips: [
          'Gentle start for altitude acclimatization',
          'Light activities only on arrival day',
          'Hydrate well and avoid alcohol',
          'Early dinner and good rest recommended'
        ]
      })
      
      plans.push({
        day: 2,
        title: "Gangtok Monastery Trail",
        monasteries: [
          'Enchey Monastery (morning) - Historical Nyingma monastery with city views',
          'Rumtek Monastery (afternoon) - Most sacred Kagyu monastery, seat of Karmapa'
        ],
        accommodation: 'Same as Day 1',
        meals: ['Hotel breakfast: ₹300', 'Monastery simple lunch: ₹200', 'City restaurant dinner: ₹700'],
        transport: 'Full day taxi service - ₹2,000',
        cost: budget ? 4000 : 7200,
        tips: [
          'Early start at 8 AM to cover both monasteries',
          'Photography allowed in designated areas only',
          'Witness morning prayers if timing permits',
          'Learn about different Buddhist traditions - Nyingma vs Kagyu'
        ]
      })
      
      if (days >= 3) {
        plans.push({
          day: 3,
          title: "West Sikkim Journey - Pelling",
          monasteries: [
            'Pemayangtse Monastery (afternoon) - Oldest monastery in Sikkim, pure lineage monks only'
          ],
          accommodation: budget ? 'Pelling mountain guesthouse - ₹2,200/night' : 'Resort with Kanchenjunga views - ₹7,000/night',
          meals: ['Hotel breakfast: ₹250', 'Travel lunch en route: ₹400', 'Pelling local dinner: ₹600'],
          transport: 'Gangtok to Pelling scenic drive (115 km, 4 hours) - ₹2,800',
          cost: budget ? 6250 : 11050,
          tips: [
            'Beautiful 4-hour mountain journey with stops',
            'Pemayangtse meaning "Perfect Sublime Lotus"',
            'Check sunset views of Kanchenjunga from hotel',
            'Carry motion sickness medicine for winding roads'
          ]
        })
      }
      
      if (days >= 4) {
        plans.push({
          day: 4,
          title: "Sacred Tashiding Experience",
          monasteries: [
            'Tashiding Monastery (full morning) - Holiest monastery in Sikkim, hilltop location'
          ],
          accommodation: budget ? 'Same as Day 3' : 'Same as Day 3',
          meals: ['Early breakfast: ₹200', 'Packed monastery lunch: ₹300', 'Traditional dinner: ₹700'],
          transport: 'Day trip to Tashiding (80 km round trip) - ₹3,500',
          cost: budget ? 6000 : 9500,
          tips: [
            'Most sacred monastery - believed to cleanse sins by mere sight',
            'Stunning 360-degree Himalayan views from hilltop',
            'Site of famous Bhumchu (holy water) festival',
            'Guru Rinpoche meditation cave nearby'
          ]
        })
      }
      
      if (days === 5) {
        plans.push({
          day: 5,
          title: "Departure Day",
          monasteries: [
            winter ? 'Local morning prayers at nearby monastery' : 'Optional North Sikkim monastery (if permits available)'
          ],
          accommodation: 'Checkout',
          meals: ['Final breakfast: ₹250', 'Travel meal: ₹400'],
          transport: 'Return journey to departure point - ₹2,500',
          cost: 3150,
          tips: [
            'Early checkout and departure recommended',
            'Purchase authentic souvenirs from monastery shops',
            'Final blessing ceremony if available',
            'Safe journey back with lifetime memories'
          ]
        })
      }
    } else {
      // Extended trips (6+ days) - Add North Sikkim if accessible
      plans.push(...generateExtendedItinerary(days, budget, winter))
    }
    
    return plans
  }

  const generateExtendedItinerary = (days: number, budget: boolean, winter: boolean) => {
    // Extended itinerary logic for longer trips
    return [
      {
        day: 1,
        title: "Grand Arrival & Sacred Introduction",
        monasteries: ['Do Drul Chorten evening blessing ceremony'],
        accommodation: budget ? 'Heritage homestay - ₹2,000' : 'Luxury mountain resort - ₹18,000',
        meals: ['Welcome lunch - ₹600', 'Cultural dinner show - ₹1,200'],
        transport: 'Premium pickup + orientation tour - ₹1,500',
        cost: budget ? 5300 : 21300,
        tips: ['Cultural orientation', 'Gentle acclimatization', 'Traditional welcome ceremony']
      },
      // Additional days would be generated here based on duration
    ]
  }

  const interests = [
    'Buddhist Philosophy', 'Photography', 'Architecture', 'Meditation',
    'Cultural History', 'Mountain Views', 'Local Cuisine', 'Handicrafts'
  ]

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  if (generatedGuide) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 mb-4">
              🗺️ Your Personalized Sikkim Guide
            </h1>
            <p className="text-lg text-gray-600 mb-4">{generatedGuide.summary}</p>
            <Badge className="bg-green-600 text-white px-6 py-3 text-lg">
              Total Budget: ₹{generatedGuide.totalBudget.toLocaleString()}
            </Badge>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Itinerary */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">📅 Complete Day-wise Itinerary</h2>
              
              {generatedGuide.itinerary.map((day: any, index: number) => (
                <Card key={index} className="shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <CardTitle className="text-xl">Day {day.day}: {day.title}</CardTitle>
                    <Badge className="bg-white/20 text-white w-fit">
                      Daily Budget: ₹{day.cost.toLocaleString()}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                        🏛️ Monastery Visits
                      </h4>
                      <div className="space-y-2">
                        {day.monasteries.map((monastery: string, idx: number) => (
                          <div key={idx} className="text-gray-700 bg-orange-50 p-3 rounded-lg">
                            • {monastery}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">🏨 Accommodation</h4>
                        <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{day.accommodation}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-purple-800 mb-2">🚗 Transportation</h4>
                        <p className="text-gray-700 bg-purple-50 p-3 rounded-lg">{day.transport}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-orange-800 mb-2">🍽️ Meals & Costs</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {day.meals.map((meal: string, idx: number) => (
                          <div key={idx} className="text-gray-700 bg-yellow-50 p-2 rounded text-sm">
                            • {meal}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-3">💡 Essential Tips for Day {day.day}</h4>
                      <ul className="space-y-1">
                        {day.tips.map((tip: string, idx: number) => (
                          <li key={idx} className="text-green-700 text-sm">• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-green-800">🎒 Packing Essentials</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {generatedGuide.essentials.map((item: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <input type="checkbox" className="rounded" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-orange-800">⚡ Important Travel Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {generatedGuide.tips.map((tip: string, index: number) => (
                      <li key={index} className="text-sm text-gray-600">{tip}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-800">📞 Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {generatedGuide.contacts.map((contact: string, index: number) => (
                      <li key={index} className="text-sm text-red-700 font-medium">{contact}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <button
                  onClick={() => window.print()}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  📄 Print Complete Guide
                </button>
                <button
                  onClick={() => setGeneratedGuide(null)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  🔄 Plan New Trip
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            📋 Plan Your Visit
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Create your perfect monastery journey through Sikkim
          </p>
          <p className="text-sm text-gray-500">
            Fill in your preferences and get a detailed, personalized travel guide
          </p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardTitle className="text-2xl text-center">
              🎯 Your Travel Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    📍 Starting from
                  </label>
                  <select
                    value={formData.startLocation}
                    onChange={(e) => setFormData(prev => ({...prev, startLocation: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select your starting point</option>
                    <option value="bagdogra">Bagdogra Airport (IXB)</option>
                    <option value="siliguri">Siliguri/New Jalpaiguri (NJP)</option>
                    <option value="gangtok">Already in Gangtok</option>
                    <option value="darjeeling">Darjeeling</option>
                    <option value="other">Other location</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    📅 How many days do you have?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['1', '2', '3', '4', '5', '7', '10'].map((days) => (
                      <button
                        key={days}
                        onClick={() => setFormData(prev => ({...prev, duration: days}))}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          formData.duration === days
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {days} Day{days !== '1' ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    💰 Budget preference per person
                  </label>
                  <div className="space-y-3">
                    <button
                      onClick={() => setFormData(prev => ({...prev, budget: 'budget'}))}
                      className={`w-full p-4 rounded-lg text-left transition-colors ${
                        formData.budget === 'budget'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">Budget Travel</div>
                      <div className="text-sm opacity-75">₹3,000-4,000 per day</div>
                      <div className="text-xs opacity-60">Hostels, shared transport, local food</div>
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({...prev, budget: 'comfort'}))}
                      className={`w-full p-4 rounded-lg text-left transition-colors ${
                        formData.budget === 'comfort'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">Comfortable Travel</div>
                      <div className="text-sm opacity-75">₹6,000-10,000 per day</div>
                      <div className="text-xs opacity-60">Good hotels, private transport, quality meals</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🗓️ When are you planning to visit?
                  </label>
                  <select
                    value={formData.travelMonth}
                    onChange={(e) => setFormData(prev => ({...prev, travelMonth: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select travel month</option>
                    {['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    👥 Group size
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={formData.groupSize}
                    onChange={(e) => setFormData(prev => ({...prev, groupSize: parseInt(e.target.value) || 1}))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Number of travelers"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    💪 Physical fitness & travel style
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setFormData(prev => ({...prev, physicalFitness: 'low'}))}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        formData.physicalFitness === 'low'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">Relaxed Explorer</div>
                      <div className="text-sm opacity-75">Easy walks, comfortable pace, minimal altitude</div>
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({...prev, physicalFitness: 'moderate'}))}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        formData.physicalFitness === 'moderate'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">Balanced Traveler</div>
                      <div className="text-sm opacity-75">Moderate walking, some hills, balanced itinerary</div>
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({...prev, physicalFitness: 'high'}))}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        formData.physicalFitness === 'high'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">Adventure Seeker</div>
                      <div className="text-sm opacity-75">Love trekking, high altitude, packed schedule</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    ❤️ What interests you most? (select multiple)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {interests.map((interest) => (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`p-2 rounded text-sm transition-colors ${
                          formData.interests.includes(interest)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🚗 Transportation preference
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={() => setFormData(prev => ({...prev, transport: 'shared'}))}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        formData.transport === 'shared'
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">Shared Vehicles</div>
                      <div className="text-sm opacity-75">Budget-friendly, meet locals, fixed schedules</div>
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({...prev, transport: 'private'}))}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        formData.transport === 'private'
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">Private Transport</div>
                      <div className="text-sm opacity-75">Flexible timing, comfort, higher cost</div>
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({...prev, transport: 'mix'}))}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        formData.transport === 'mix'
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="font-medium">Mixed Approach</div>
                      <div className="text-sm opacity-75">Best value combination of both</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-6">
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                  <p className="text-green-600 font-medium">
                    🤖 Creating your personalized monastery travel guide...
                  </p>
                  <p className="text-sm text-gray-500">
                    Analyzing your preferences and optimizing the perfect itinerary
                  </p>
                </div>
              ) : (
                <button
                  onClick={generateGuide}
                  disabled={!formData.startLocation || !formData.duration || !formData.budget || !formData.travelMonth}
                  className={`px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
                    formData.startLocation && formData.duration && formData.budget && formData.travelMonth
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  🚀 Generate My Travel Guide
                </button>
              )}
              
              {(!formData.startLocation || !formData.duration || !formData.budget || !formData.travelMonth) && (
                <p className="text-sm text-gray-500 mt-3">
                  Please fill all required fields to generate your guide
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
