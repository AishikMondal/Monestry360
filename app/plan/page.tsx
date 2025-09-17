"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Clock, 
  Sparkles,
  Mountain,
  Camera,
  Heart,
  Compass,
  Star,
  Save,
  Download,
  Share
} from "lucide-react"

interface TripFormData {
  startLocation: string
  duration: string
  budget: string
  travelMonth: string
  groupSize: string
  fitnessLevel: string
  interests: string[]
  transport: string
  accommodation: string
}

export default function PlanTripPage() {
  const [formData, setFormData] = useState<TripFormData>({
    startLocation: '',
    duration: '',
    budget: '',
    travelMonth: '',
    groupSize: '',
    fitnessLevel: '',
    interests: [],
    transport: '',
    accommodation: ''
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedGuide, setGeneratedGuide] = useState<any>(null)

  const generateGuide = async () => {
    setIsGenerating(true)
    
    // Enhanced trip generation with real logic
    try {
      const guide = await generatePersonalizedTrip()
      setGeneratedGuide(guide)
    } catch (error) {
      console.error('Error generating trip:', error)
      alert('Failed to generate trip. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generatePersonalizedTrip = async () => {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Calculate budget based on preferences
    const budgetCalculation = calculateBudget()
    
    // Generate monastery recommendations based on preferences
    const monasteryRecommendations = getMonasteryRecommendations()
    
    // Create detailed itinerary
    const itinerary = generateDetailedItinerary(monasteryRecommendations)
    
    // Generate essentials based on season, fitness level, etc.
    const essentials = generatePersonalizedEssentials()
    
    return {
      title: generateTripTitle(),
      totalBudget: budgetCalculation.total,
      budgetBreakdown: budgetCalculation.breakdown,
      itinerary,
      essentials,
      recommendations: generateRecommendations(),
      weatherInfo: getWeatherInfo(),
      routeMap: generateRouteInfo()
    }
  }

  // Enhanced budget calculation based on all preferences
  const calculateBudget = () => {
    const days = parseInt(formData.duration)
    let baseRate = 0
    
    // Base rate calculation
    switch (formData.budget) {
      case 'budget': baseRate = 3500; break
      case 'comfort': baseRate = 7000; break
      case 'luxury': baseRate = 15000; break
      default: baseRate = 5000
    }
    
    // Adjust for group size
    const groupMultiplier = formData.groupSize === '1' ? 1 : 
                          formData.groupSize === '2' ? 1.8 : 
                          formData.groupSize === '3-5' ? 4 : 6
    
    // Adjust for transport
    const transportCost = formData.transport === 'private' ? baseRate * 0.4 :
                         formData.transport === 'shared' ? baseRate * 0.2 : baseRate * 0.1
    
    // Adjust for accommodation
    const accommodationMultiplier = formData.accommodation === 'monastery' ? 0.5 :
                                   formData.accommodation === 'homestay' ? 0.7 : 1.2
    
    const totalPerPerson = Math.round((baseRate * accommodationMultiplier) * days)
    const transportTotal = Math.round(transportCost * days)
    
    return {
      total: `₹${Math.round(totalPerPerson * (formData.groupSize === '1' ? 1 : 0.9))}-${Math.round(totalPerPerson * (formData.groupSize === '1' ? 1.2 : 1.1))}`,
      breakdown: {
        accommodation: Math.round(totalPerPerson * 0.4),
        food: Math.round(totalPerPerson * 0.3),
        transport: transportTotal,
        activities: Math.round(totalPerPerson * 0.2),
        miscellaneous: Math.round(totalPerPerson * 0.1)
      }
    }
  }

  // Intelligent monastery recommendations based on preferences
  const getMonasteryRecommendations = () => {
    const allMonasteries = [
      {
        id: 1, name: 'Rumtek Monastery', district: 'East Sikkim', 
        difficulty: 'easy', interests: ['culture', 'architecture', 'photography'],
        description: 'The largest monastery in Sikkim, seat of the Kagyu lineage',
        bestTime: ['march', 'april', 'may', 'october', 'november']
      },
      {
        id: 2, name: 'Enchey Monastery', district: 'East Sikkim',
        difficulty: 'easy', interests: ['meditation', 'culture', 'nature'],
        description: 'Ancient monastery with sacred mask dances',
        bestTime: ['march', 'april', 'may', 'september', 'october']
      },
      {
        id: 3, name: 'Pemayangtse Monastery', district: 'West Sikkim',
        difficulty: 'moderate', interests: ['history', 'architecture', 'culture'],
        description: 'One of the oldest monasteries in Sikkim',
        bestTime: ['april', 'may', 'october', 'november']
      },
      {
        id: 4, name: 'Tashiding Monastery', district: 'West Sikkim',
        difficulty: 'challenging', interests: ['nature', 'meditation', 'festivals'],
        description: 'Sacred monastery on a hilltop with panoramic views',
        bestTime: ['march', 'april', 'may', 'october']
      },
      {
        id: 5, name: 'Yuksom Monastery', district: 'West Sikkim',
        difficulty: 'challenging', interests: ['history', 'nature', 'meditation'],
        description: 'Historic monastery in the first capital of Sikkim',
        bestTime: ['april', 'may', 'september', 'october']
      }
    ]
    
    // Filter based on fitness level
    const fitnessFilter = formData.fitnessLevel === 'easy' ? ['easy'] :
                         formData.fitnessLevel === 'moderate' ? ['easy', 'moderate'] :
                         ['easy', 'moderate', 'challenging']
    
    // Filter and score monasteries
    const scoredMonasteries = allMonasteries
      .filter(m => fitnessFilter.includes(m.difficulty))
      .filter(m => m.bestTime.includes(formData.travelMonth))
      .map(monastery => {
        let score = 0
        
        // Score based on interests match
        const interestMatches = monastery.interests.filter(interest => 
          formData.interests.includes(interest)
        ).length
        score += interestMatches * 10
        
        // Base score for monastery quality
        score += Math.random() * 20 // Simulate monastery rating
        
        return { ...monastery, score }
      })
      .sort((a, b) => b.score - a.score)
    
    return scoredMonasteries.slice(0, parseInt(formData.duration))
  }

  const generateTripTitle = () => {
    const duration = formData.duration
    const budgetType = formData.budget === 'budget' ? 'Budget' :
                      formData.budget === 'comfort' ? 'Comfortable' : 'Luxury'
    
    return `${duration}-Day ${budgetType} Sikkim Monastery Journey`
  }

  const getWeatherInfo = () => {
    const weatherData: { [key: string]: any } = {
      'january': { temp: '5-15°C', condition: 'Cold, possible snow', clothing: 'Heavy winter gear' },
      'february': { temp: '8-18°C', condition: 'Cold, clear skies', clothing: 'Warm layers' },
      'march': { temp: '12-22°C', condition: 'Pleasant, rhododendrons bloom', clothing: 'Light jacket' },
      'april': { temp: '15-25°C', condition: 'Excellent weather', clothing: 'Light layers' },
      'may': { temp: '18-28°C', condition: 'Warm, clear mountain views', clothing: 'Summer clothes' },
      'september': { temp: '15-25°C', condition: 'Post-monsoon clarity', clothing: 'Light jacket' },
      'october': { temp: '12-22°C', condition: 'Perfect weather, clear skies', clothing: 'Light layers' },
      'november': { temp: '8-18°C', condition: 'Cool, excellent visibility', clothing: 'Warm layers' },
      'december': { temp: '5-15°C', condition: 'Cold, festive season', clothing: 'Winter gear' }
    }
    
    return weatherData[formData.travelMonth] || { temp: '10-20°C', condition: 'Variable', clothing: 'Layers' }
  }

  const generateRecommendations = () => ({
    bestTimeToVisit: formData.travelMonth === 'april' || formData.travelMonth === 'october' ? 
      'Perfect timing! This is ideal weather for monastery visits.' :
      'Good choice, though April and October offer the best weather.',
    
    packingTips: [
      'Comfortable walking shoes with good grip',
      formData.travelMonth === 'january' || formData.travelMonth === 'december' ? 'Heavy winter clothing' : 'Layered clothing',
      'Camera with extra batteries (cold weather drains them fast)',
      'Power bank and universal adapter',
      formData.interests.includes('meditation') ? 'Meditation cushion or mat' : 'Notebook for journaling'
    ],
    
    culturalTips: [
      'Remove shoes before entering monastery halls',
      'Dress modestly - cover shoulders and knees',
      'Ask permission before photographing monks or inside temples',
      'Maintain silence during prayers and meditation',
      'Bring small donations for monasteries (₹20-50 is appropriate)'
    ],
    
    healthSafety: [
      'Carry altitude sickness medication if going above 3000m',
      'Stay hydrated - mountain air is dry',
      'Use sunscreen - UV is stronger at altitude',
      'Keep emergency contacts handy',
      'Inform someone about your daily itinerary'
    ]
  })

  const generateRouteInfo = () => ({
    startingPoint: formData.startLocation,
    totalDistance: `${parseInt(formData.duration) * 45}km approx`,
    transportMode: formData.transport,
    routeHighlights: [
      'Scenic mountain roads with valley views',
      'Traditional Sikkimese villages en route',
      'Tea gardens and cardamom plantations',
      'Himalayan wildlife spotting opportunities'
    ]
  })

  const generateDetailedItinerary = (recommendedMonasteries: any[]) => {
    const days = parseInt(formData.duration)
    const itinerary = []
    
    for (let i = 1; i <= days; i++) {
      const monastery = recommendedMonasteries[i - 1] || recommendedMonasteries[0]
      const isRestDay = days > 5 && i === Math.ceil(days / 2)
      
      // Generate activities based on interests and monastery type
      const activities = generateDayActivities(monastery, isRestDay)
      
      // Calculate daily budget
      const dailyBudget = calculateDailyBudget(i, days)
      
      // Generate meals based on accommodation preference
      const meals = generateMeals(monastery.district)
      
      // Get accommodation based on preferences
      const accommodation = getAccommodationForDay(monastery.district, i)
      
      itinerary.push({
        day: i,
        title: isRestDay ? `Day ${i}: Rest & Exploration` : `Day ${i}: ${monastery.name}`,
        monastery: monastery.name,
        district: monastery.district,
        description: monastery.description,
        activities,
        accommodation,
        meals,
        budget: dailyBudget,
        highlights: generateDayHighlights(monastery, formData.interests),
        travelTime: i === 1 ? calculateTravelTime(formData.startLocation, monastery.district) : '1-2 hours',
        difficulty: monastery.difficulty,
        weatherNote: getWeatherInfo().condition
      })
    }
    
    return itinerary
  }

  const generateDayActivities = (monastery: any, isRestDay: boolean) => {
    const baseActivities = ['Early morning prayers (5:30 AM)', 'Monastery tour and architecture study']
    
    if (isRestDay) {
      return [
        'Leisurely breakfast and rest',
        'Optional local market visit',
        'Afternoon relaxation or spa',
        'Cultural show or local interaction'
      ]
    }
    
    // Add activities based on interests
    if (formData.interests.includes('meditation')) {
      baseActivities.push('Guided meditation session with monks')
    }
    if (formData.interests.includes('photography')) {
      baseActivities.push('Photography workshop - capturing monastery art')
    }
    if (formData.interests.includes('culture')) {
      baseActivities.push('Traditional craft learning session')
    }
    if (formData.interests.includes('food')) {
      baseActivities.push('Traditional cooking demonstration')
    }
    
    return baseActivities
  }

  const calculateDailyBudget = (day: number, totalDays: number) => {
    const budgetData = calculateBudget()
    const dailyBase = parseInt(budgetData.total.split('₹')[1].split('-')[0]) / totalDays
    
    // First and last days might cost more due to transport
    const multiplier = (day === 1 || day === totalDays) ? 1.2 : 1
    
    return `₹${Math.round(dailyBase * multiplier)}`
  }

  const generateMeals = (district: string) => {
    const localSpecialties = {
      'East Sikkim': ['Thukpa (noodle soup)', 'Momos with local vegetables', 'Butter tea'],
      'West Sikkim': ['Gundruk soup', 'Sel roti', 'Local organic vegetables'],
      'North Sikkim': ['Yak cheese dishes', 'Tibetan bread', 'Mountain herbs tea']
    }
    
    const regionFood = localSpecialties[district as keyof typeof localSpecialties] || 
                     ['Traditional breakfast', 'Local lunch', 'Regional dinner']
    
    return formData.accommodation === 'monastery' ? 
      ['Simple monastery breakfast', 'Vegetarian monastery meal', ...regionFood.slice(1)] :
      regionFood
  }

  const getAccommodationForDay = (district: string, day: number) => {
    const accommodationTypes = {
      monastery: `${district} Monastery Guesthouse`,
      homestay: `Traditional ${district} Family Homestay`, 
      hotel: formData.budget === 'luxury' ? 
        `Premium ${district} Resort` : `Comfortable ${district} Hotel`
    }
    
    return accommodationTypes[formData.accommodation as keyof typeof accommodationTypes] || 
           'Local accommodation'
  }

  const generateDayHighlights = (monastery: any, interests: string[]) => {
    const highlights = ['Ancient Buddhist artifacts', 'Mountain panoramic views']
    
    if (interests.includes('architecture')) {
      highlights.push('Traditional Tibetan architecture study')
    }
    if (interests.includes('meditation')) {
      highlights.push('Silent meditation in sacred halls')
    }
    if (interests.includes('photography')) {
      highlights.push('Golden hour photography session')
    }
    if (interests.includes('culture')) {
      highlights.push('Interaction with resident monks')
    }
    
    return highlights
  }

  const calculateTravelTime = (start: string, destination: string) => {
    const travelTimes: { [key: string]: { [key: string]: string } } = {
      'bagdogra': { 'East Sikkim': '4-5 hours', 'West Sikkim': '5-6 hours' },
      'siliguri': { 'East Sikkim': '3-4 hours', 'West Sikkim': '4-5 hours' },
      'gangtok': { 'East Sikkim': '30 mins', 'West Sikkim': '2-3 hours' }
    }
    
    return travelTimes[start]?.[destination] || '2-3 hours'
  }

  const generatePersonalizedEssentials = () => {
    const weather = getWeatherInfo()
    const season = ['december', 'january', 'february'].includes(formData.travelMonth) ? 'winter' :
                  ['march', 'april', 'may'].includes(formData.travelMonth) ? 'spring' :
                  ['september', 'october', 'november'].includes(formData.travelMonth) ? 'autumn' : 'summer'
    
    // Seasonal packing list
    const seasonalPacking = {
      winter: ['Heavy winter jacket', 'Thermal innerwear', 'Woolen socks', 'Gloves and muffler', 'Snow boots'],
      spring: ['Light jacket', 'Layered clothing', 'Light sweater', 'Rain protection', 'Comfortable walking shoes'],
      autumn: ['Warm jacket', 'Layered clothing', 'Light woolens', 'Wind protection', 'Sturdy shoes'],
      summer: ['Light cotton clothes', 'Sun hat', 'Sunglasses', 'Light jacket for evenings', 'Comfortable shoes']
    }
    
    const basePacking = [
      'Government ID (Aadhar/Passport)',
      'Sikkim permit (if required)',
      'First aid kit with basic medicines',
      'Power bank and chargers',
      'Reusable water bottle',
      ...seasonalPacking[season]
    ]
    
    // Add interest-specific items
    if (formData.interests.includes('photography')) {
      basePacking.push('Camera with extra batteries', 'Tripod for landscape shots', 'Memory cards')
    }
    if (formData.interests.includes('meditation')) {
      basePacking.push('Meditation cushion', 'Prayer beads (mala)', 'Journal for reflections')
    }
    if (formData.interests.includes('nature')) {
      basePacking.push('Binoculars for bird watching', 'Nature guidebook', 'Hiking poles')
    }
    
    // Fitness-based additions
    if (formData.fitnessLevel === 'challenging') {
      basePacking.push('Altitude sickness medication', 'Energy bars', 'Electrolyte supplements')
    }
    
    return {
      packing: basePacking,
      
      tips: [
        'Book accommodations in advance, especially during peak season',
        'Carry cash as ATMs may be limited in remote areas',
        'Download offline maps before traveling',
        formData.accommodation === 'monastery' ? 'Follow monastery schedules strictly' : 'Respect local customs',
        weather.temp.includes('5') ? 'Prepare for possible altitude effects' : 'Stay hydrated in mountain air',
        `Weather: ${weather.condition} - ${weather.clothing.toLowerCase()}`
      ],
      
      emergency: [
        'STNM Hospital Gangtok: +91-3592-202048',
        'Police: 100',
        'Sikkim Tourism Helpline: 1363',
        'Ambulance: 108',
        'District Collector Office: +91-3595-234201',
        `Nearest hospital from ${formData.startLocation}: ${getEmergencyInfo()}`
      ],
      
      permits: [
        'Inner Line Permit required for Tsomgo Lake, Nathula, Gurudongmar Lake',
        'Protected Area Permit needed for trekking areas',
        'Available at Sikkim Tourism offices or online',
        'Carry 2 passport size photos and ID proof'
      ],
      
      culturalGuidelines: [
        'Dress modestly in monasteries - cover shoulders and knees',
        'Remove shoes before entering prayer halls',
        'Do not point feet towards Buddha statues',
        'Ask permission before photographing monks',
        'Maintain silence during prayers and ceremonies',
        'Small donations (₹20-50) are appreciated but not mandatory'
      ]
    }
  }

  const getEmergencyInfo = () => {
    const emergencyContacts: { [key: string]: string } = {
      'bagdogra': 'Siliguri District Hospital: +91-353-252-1064',
      'siliguri': 'Siliguri District Hospital: +91-353-252-1064', 
      'gangtok': 'STNM Hospital: +91-3592-202048',
      'darjeeling': 'Darjeeling District Hospital: +91-354-225-4462'
    }
    
    return emergencyContacts[formData.startLocation] || 'Local district hospital: 102'
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const getInterestLabel = (interest: string) => {
    const labels: { [key: string]: string } = {
      'photography': '📸 Photography',
      'meditation': '🧘 Meditation', 
      'culture': '🎨 Culture',
      'nature': '🌿 Nature',
      'architecture': '🏛️ Architecture',
      'festivals': '🎉 Festivals',
      'food': '🍽️ Food',
      'history': '📚 History'
    }
    return labels[interest] || interest
  }

  const saveTrip = () => {
    if (!generatedGuide) return
    alert('Trip saved successfully! You can view it in your profile.')
  }

  if (generatedGuide) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-8 px-6 transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800 dark:text-green-300 mb-4">
              🎉 Your Personalized Travel Guide
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Complete monastery journey through Sikkim
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button onClick={saveTrip} className="bg-green-500 hover:bg-green-600">
              <Save className="mr-2 h-4 w-4" />
              Save Trip
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Share className="mr-2 h-4 w-4" />
              Share Journey
            </Button>
            <Button variant="ghost" onClick={() => setGeneratedGuide(null)}>
              ← Plan Another Trip
            </Button>
          </div>

          {/* Trip Overview */}
          <Card className="mb-8 shadow-xl dark:shadow-2xl dark:shadow-green-500/20 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 text-white relative">
              <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
              <div className="relative z-10">
                <CardTitle className="text-2xl text-center font-bold">
                  {generatedGuide.title}
                </CardTitle>
                <p className="text-center text-green-100 dark:text-green-200 text-sm mt-2">
                  Your personalized spiritual journey awaits
                </p>
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">{formData.duration}</div>
                  <div className="text-sm text-gray-500">Days</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{generatedGuide.totalBudget}</div>
                  <div className="text-sm text-gray-500">Total Budget</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">{generatedGuide.itinerary.length}</div>
                  <div className="text-sm text-gray-500">Monasteries</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itinerary */}
          <div className="space-y-6">
            {generatedGuide.itinerary.map((day: any) => (
              <Card key={day.day} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-indigo-600" />
                      {day.title}
                    </span>
                    <Badge>{day.budget}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Mountain className="mr-2 h-4 w-4" />
                        Monastery Visit
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{day.monastery}</p>
                      
                      <h4 className="font-semibold mb-2 flex items-center">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Activities
                      </h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {day.activities.map((activity: string, idx: number) => (
                          <li key={idx}>• {activity}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">🏨 Accommodation</h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{day.accommodation}</p>
                      
                      <h4 className="font-semibold mb-2">🍽️ Meals</h4>
                      <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        {day.meals.map((meal: string, idx: number) => (
                          <li key={idx}>• {meal}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Star className="mr-2 h-4 w-4 text-yellow-500" />
                      Day Highlights
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {day.highlights.map((highlight: string, idx: number) => (
                        <Badge key={idx} variant="secondary">{highlight}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Essentials */}
          <Card className="mt-8 shadow-xl">
            <CardHeader>
              <CardTitle>📋 Essential Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">🎒 Packing List</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {generatedGuide.essentials.packing.map((item: string, idx: number) => (
                      <li key={idx}>
                        <input type="checkbox" className="mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">💡 Important Tips</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {generatedGuide.essentials.tips.map((tip: string, idx: number) => (
                      <li key={idx}>• {tip}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">🚨 Emergency Contacts</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {generatedGuide.essentials.emergency.map((contact: string, idx: number) => (
                      <li key={idx}>• {contact}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-12 px-6 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6">
            <span className="text-2xl">📋</span>
          </div>
          <h1 className="text-4xl font-bold text-green-800 dark:text-green-300 mb-4">
            Plan Your Visit
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-2 max-w-2xl mx-auto">
            Create your perfect monastery journey through Sikkim
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Fill in your preferences and get a detailed, personalized travel guide
          </p>
        </div>

        {/* Form */}
        <Card className="shadow-2xl dark:shadow-2xl dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 dark:from-green-600 dark:to-blue-600 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
            <div className="relative z-10">
              <CardTitle className="text-2xl text-center font-bold">
                🎯 Your Travel Preferences
              </CardTitle>
              <p className="text-center text-green-100 dark:text-green-200 text-sm mt-2">
                Customize every detail of your sacred journey
              </p>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/10 rounded-full"></div>
          </CardHeader>
          
          <CardContent className="p-8 space-y-8 bg-white dark:bg-gray-800/50">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Starting Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    📍 Starting from
                  </label>
                  <select
                    value={formData.startLocation}
                    onChange={(e) => setFormData(prev => ({...prev, startLocation: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <option value="">Select starting location</option>
                    <option value="bagdogra">Bagdogra Airport</option>
                    <option value="siliguri">Siliguri (NJP Station)</option>
                    <option value="gangtok">Gangtok</option>
                    <option value="darjeeling">Darjeeling</option>
                    <option value="kalimpong">Kalimpong</option>
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    📅 How many days do you have?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['1', '2', '3', '4', '5', '7', '10'].map((days) => (
                      <button
                        key={days}
                        onClick={() => setFormData(prev => ({...prev, duration: days}))}
                        className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                          formData.duration === days
                            ? 'bg-green-600 dark:bg-green-500 text-white shadow-lg dark:shadow-green-500/20 transform scale-105'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700/60 dark:text-gray-300 dark:hover:bg-gray-600/80 hover:scale-105 shadow-sm dark:shadow-none'
                        }`}
                      >
                        {days} Day{days !== '1' ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    💰 Budget preference per person
                  </label>
                  <div className="space-y-3">
                    <button
                      onClick={() => setFormData(prev => ({...prev, budget: 'budget'}))}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 group ${
                        formData.budget === 'budget'
                          ? 'bg-gradient-to-r from-green-600 to-green-500 dark:from-green-500 dark:to-green-600 text-white shadow-lg dark:shadow-green-500/20 transform scale-105'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-700/80 border border-gray-200 dark:border-gray-600/50 hover:border-green-300 dark:hover:border-green-500/50 hover:shadow-md dark:hover:shadow-green-500/10'
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
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-medium">Comfortable Travel</div>
                      <div className="text-sm opacity-75">₹6,000-10,000 per day</div>
                      <div className="text-xs opacity-60">Good hotels, private transport, quality meals</div>
                    </button>
                    <button
                      onClick={() => setFormData(prev => ({...prev, budget: 'luxury'}))}
                      className={`w-full p-4 rounded-lg text-left transition-colors ${
                        formData.budget === 'luxury'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-medium">Luxury Experience</div>
                      <div className="text-sm opacity-75">₹15,000+ per day</div>
                      <div className="text-xs opacity-60">Premium hotels, helicopter tours, exclusive experiences</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Travel Month */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    🗓️ When do you want to travel?
                  </label>
                  <select
                    value={formData.travelMonth}
                    onChange={(e) => setFormData(prev => ({...prev, travelMonth: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                  >
                    <option value="">Select travel month</option>
                    <option value="january">January (Winter - Snow possible)</option>
                    <option value="february">February (Winter - Clear skies)</option>
                    <option value="march">March (Spring - Rhododendrons bloom)</option>
                    <option value="april">April (Spring - Pleasant weather)</option>
                    <option value="may">May (Pre-monsoon - Clear views)</option>
                    <option value="september">September (Post-monsoon)</option>
                    <option value="october">October (Autumn - Best weather)</option>
                    <option value="november">November (Winter starts)</option>
                    <option value="december">December (Winter - Festivals)</option>
                  </select>
                </div>

                {/* Group Size */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    👥 How many people in your group?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '1', label: 'Solo (1 person)' },
                      { value: '2', label: 'Couple (2 people)' },
                      { value: '3-5', label: 'Small Group (3-5)' },
                      { value: '6+', label: 'Large Group (6+)' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData(prev => ({...prev, groupSize: option.value}))}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          formData.groupSize === option.value
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fitness Level */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    💪 Your fitness level?
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'easy', label: 'Easy walks only', desc: 'Comfortable paths, minimal elevation' },
                      { value: 'moderate', label: 'Moderate hiking', desc: 'Some uphill walks, manageable trails' },
                      { value: 'challenging', label: 'Challenging treks', desc: 'Steep paths, high altitude comfortable' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData(prev => ({...prev, fitnessLevel: option.value}))}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          formData.fitnessLevel === option.value
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs opacity-75">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transport Preference */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    🚗 Preferred transportation
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'private', label: 'Private Vehicle', desc: 'Your own car/taxi throughout' },
                      { value: 'shared', label: 'Shared Transportation', desc: 'Share with other travelers' },
                      { value: 'public', label: 'Public Transport', desc: 'Buses, shared jeeps (budget-friendly)' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setFormData(prev => ({...prev, transport: option.value}))}
                        className={`w-full p-3 rounded-lg text-left transition-colors ${
                          formData.transport === option.value
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs opacity-75">{option.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Preferences - Full Width */}
            <div className="space-y-6">
              {/* Accommodation */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  🏨 Accommodation preference
                </label>
                <div className="grid md:grid-cols-3 gap-3">
                  {[
                    { value: 'monastery', label: 'Monastery Stay', desc: 'Sleep in monastery guesthouses' },
                    { value: 'homestay', label: 'Local Homestays', desc: 'Stay with local families' },
                    { value: 'hotel', label: 'Hotels/Resorts', desc: 'Comfortable hotels and resorts' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData(prev => ({...prev, accommodation: option.value}))}
                      className={`p-4 rounded-lg text-center transition-colors ${
                        formData.accommodation === option.value
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-medium">{option.label}</div>
                      <div className="text-xs opacity-75 mt-1">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  ❤️ What interests you most? (Select multiple)
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    'photography', 'meditation', 'culture', 'nature', 
                    'architecture', 'festivals', 'food', 'history'
                  ].map((interest) => (
                    <button
                      key={interest}
                      onClick={() => handleInterestToggle(interest)}
                      className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                        formData.interests.includes(interest)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {getInterestLabel(interest)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center pt-6">
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-200 dark:border-green-800 border-t-green-600 dark:border-t-green-400 mx-auto shadow-lg dark:shadow-green-500/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full opacity-75 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    🤖 Creating your personalized monastery travel guide...
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Analyzing your preferences and optimizing the perfect itinerary
                  </p>
                </div>
              ) : (
                <button
                  onClick={generateGuide}
                  disabled={!formData.startLocation || !formData.duration || !formData.budget || !formData.travelMonth}
                  className={`px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 ${
                    formData.startLocation && formData.duration && formData.budget && formData.travelMonth
                      ? 'bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 hover:from-green-700 hover:to-blue-700 dark:hover:from-green-400 dark:hover:to-blue-400 text-white shadow-lg hover:shadow-xl dark:shadow-green-500/30 dark:hover:shadow-green-500/40 transform hover:scale-105 hover:rotate-1'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700/60 dark:text-gray-400 dark:border dark:border-gray-600/50'
                  }`}
                >
                  🚀 Generate My Travel Guide
                </button>
              )}
              
              {(!formData.startLocation || !formData.duration || !formData.budget || !formData.travelMonth) && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Please fill all required fields to generate your guide
                </p>
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </>
  )
}
