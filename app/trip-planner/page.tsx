"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Plus,
  Minus,
  Route,
  Download,
  Share,
  Star,
  Mountain,
  Car,
  User,
  Plane,
  CheckCircle,
  AlertCircle,
  Users,
  DollarSign
} from "lucide-react"

interface Monastery {
  id: number
  name: string
  location: string
  district: string
  coordinates: { lat: number, lng: number }
  rating: number
  reviewCount: number
  description: string
  image: string
  established: string
  altitude: string
  bestTime: string[]
  highlights: string[]
  difficulty: "easy" | "moderate" | "challenging"
  estimatedTime: string
  entryFee: number
}

interface TripDay {
  day: number
  date: string
  monasteries: Monastery[]
  totalTime: string
  district: string
}

export default function TripPlannerPage() {
  const searchParams = useSearchParams()
  const [selectedMonasteries, setSelectedMonasteries] = useState<Monastery[]>([])
  const [tripDuration, setTripDuration] = useState(3)
  const [startDate, setStartDate] = useState("")
  const [tripPlan, setTripPlan] = useState<TripDay[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Handle URL monastery parameter
  useEffect(() => {
    const monasteryId = searchParams.get('monastery')
    if (monasteryId) {
      const monastery = monasteries.find(m => m.id.toString() === monasteryId)
      if (monastery && !selectedMonasteries.find(m => m.id === monastery.id)) {
        setSelectedMonasteries(prev => [...prev, monastery])
      }
    }
  }, [searchParams])

  const monasteries: Monastery[] = [
    {
      id: 1,
      name: "Rumtek Monastery",
      location: "Rumtek, East Sikkim",
      district: "East Sikkim",
      coordinates: { lat: 27.3153, lng: 88.5502 },
      rating: 4.8,
      reviewCount: 1245,
      description: "The largest monastery in Sikkim and the main seat of the Karma Kagyu lineage",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
      established: "1966",
      altitude: "1,550m",
      bestTime: ["March", "April", "May", "October", "November"],
      highlights: ["Golden Stupa", "Tibetan Architecture", "Monk Ceremonies"],
      difficulty: "easy",
      estimatedTime: "2-3 hours",
      entryFee: 0
    },
    {
      id: 2,
      name: "Enchey Monastery",
      location: "Gangtok, East Sikkim",
      district: "East Sikkim",
      coordinates: { lat: 27.3314, lng: 88.6138 },
      rating: 4.6,
      reviewCount: 892,
      description: "Ancient monastery famous for its mask dance festival and spiritual ambiance",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400",
      established: "1909",
      altitude: "1,675m",
      bestTime: ["March", "April", "May", "September", "October"],
      highlights: ["Cham Dance", "Prayer Wheels", "City Views"],
      difficulty: "easy",
      estimatedTime: "1-2 hours",
      entryFee: 0
    },
    {
      id: 3,
      name: "Pemayangtse Monastery",
      location: "Pelling, West Sikkim",
      district: "West Sikkim",
      coordinates: { lat: 27.2958, lng: 88.2139 },
      rating: 4.7,
      reviewCount: 756,
      description: "One of the oldest monasteries in Sikkim with stunning Kanchenjunga views",
      image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400",
      established: "1705",
      altitude: "2,085m",
      bestTime: ["April", "May", "October", "November"],
      highlights: ["Kanchenjunga Views", "Ancient Murals", "Wooden Carvings"],
      difficulty: "moderate",
      estimatedTime: "2-4 hours",
      entryFee: 10
    },
    {
      id: 4,
      name: "Tashiding Monastery",
      location: "Tashiding, West Sikkim",
      district: "West Sikkim",
      coordinates: { lat: 27.3472, lng: 88.2764 },
      rating: 4.9,
      reviewCount: 445,
      description: "Sacred hilltop monastery with panoramic mountain views",
      image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
      established: "1641",
      altitude: "1,465m",
      bestTime: ["March", "April", "May", "October"],
      highlights: ["Sacred Stupas", "Mountain Views", "Holy Festival"],
      difficulty: "challenging",
      estimatedTime: "3-5 hours",
      entryFee: 0
    },
    {
      id: 5,
      name: "Phodong Monastery",
      location: "Phodong, North Sikkim",
      district: "North Sikkim",
      coordinates: { lat: 27.4711, lng: 88.5747 },
      rating: 4.5,
      reviewCount: 334,
      description: "One of the six most important monasteries of Sikkim with ancient Buddhist scriptures",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400",
      established: "1740",
      altitude: "1,200m",
      bestTime: ["April", "May", "September", "October"],
      highlights: ["Ancient Scriptures", "Mountain Setting", "Buddhist Art"],
      difficulty: "moderate",
      estimatedTime: "2-3 hours",
      entryFee: 0
    },
    {
      id: 6,
      name: "Do Drul Chorten",
      location: "Gangtok, East Sikkim",
      district: "East Sikkim",
      coordinates: { lat: 27.3270, lng: 88.6051 },
      rating: 4.4,
      reviewCount: 678,
      description: "One of the most important stupas in Sikkim with sacred relics",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
      established: "1945",
      altitude: "1,640m",
      bestTime: ["March", "April", "May", "October", "November"],
      highlights: ["Sacred Relics", "Prayer Wheels", "Architecture"],
      difficulty: "easy",
      estimatedTime: "1-2 hours",
      entryFee: 0
    }
  ]

  const filteredMonasteries = monasteries.filter(monastery => {
    const matchesFilter = filter === "all" || monastery.difficulty === filter
    const matchesSearch = monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monastery.district.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const toggleMonastery = (monastery: Monastery) => {
    setSelectedMonasteries(prev => {
      const isSelected = prev.find(m => m.id === monastery.id)
      if (isSelected) {
        return prev.filter(m => m.id !== monastery.id)
      } else {
        return [...prev, monastery]
      }
    })
  }

  const generateTripPlan = () => {
    if (selectedMonasteries.length === 0 || !startDate) return

    setIsGenerating(true)
    
    // Simulate API call
    setTimeout(() => {
      const monasteriesPerDay = Math.ceil(selectedMonasteries.length / tripDuration)
      const newTripPlan: TripDay[] = []

      for (let day = 1; day <= tripDuration; day++) {
        const startIndex = (day - 1) * monasteriesPerDay
        const endIndex = Math.min(startIndex + monasteriesPerDay, selectedMonasteries.length)
        const dayMonasteries = selectedMonasteries.slice(startIndex, endIndex)

        if (dayMonasteries.length > 0) {
          const date = new Date(startDate)
          date.setDate(date.getDate() + (day - 1))
          
          // Group by district for efficient travel
          const districts = [...new Set(dayMonasteries.map(m => m.district))]
          const primaryDistrict = districts[0]

          newTripPlan.push({
            day,
            date: date.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            monasteries: dayMonasteries,
            totalTime: `${dayMonasteries.length * 2.5} hours`,
            district: primaryDistrict
          })
        }
      }

      setTripPlan(newTripPlan)
      setIsGenerating(false)
    }, 2000)
  }

  const getTotalCost = () => {
    return selectedMonasteries.reduce((sum, monastery) => sum + monastery.entryFee, 0)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "moderate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "challenging": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-8 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6 shadow-lg">
              <Route className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Monastery Trip Planner
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Plan your perfect monastery journey across Sikkim with personalized itineraries
            </p>
            {searchParams.get('monastery') && selectedMonasteries.length > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg">
                <CheckCircle className="h-4 w-4" />
                <span>Monastery automatically added to your trip!</span>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Monastery Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Search and Filter */}
              <Card className="shadow-xl dark:shadow-2xl dark:shadow-purple-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">Select Monasteries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <input
                        type="text"
                        placeholder="Search monasteries..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700/80 text-gray-800 dark:text-gray-200"
                      />
                      <div className="flex gap-2">
                        {["all", "easy", "moderate", "challenging"].map((filterOption) => (
                          <Button
                            key={filterOption}
                            onClick={() => setFilter(filterOption)}
                            variant={filter === filterOption ? "default" : "outline"}
                            size="sm"
                            className={filter === filterOption ? "bg-purple-600 hover:bg-purple-700" : ""}
                          >
                            {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Monastery Grid */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {filteredMonasteries.map((monastery) => {
                      const isSelected = selectedMonasteries.find(m => m.id === monastery.id)
                      return (
                        <Card
                          key={monastery.id}
                          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                            isSelected
                              ? 'ring-2 ring-purple-500 dark:ring-purple-400 shadow-xl dark:shadow-purple-500/20 bg-purple-50 dark:bg-purple-900/20'
                              : 'hover:shadow-lg dark:hover:shadow-purple-500/10'
                          } border-0 dark:border dark:border-gray-700/50 bg-white dark:bg-gray-800/90`}
                          onClick={() => toggleMonastery(monastery)}
                        >
                          <div className="relative">
                            <img
                              src={monastery.image}
                              alt={monastery.name}
                              className="w-full h-32 object-cover rounded-t-lg"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vbmFzdGVyeSBJbWFnZTwvdGV4dD48L3N2Zz4=';
                              }}
                            />
                            <Badge className={`absolute top-2 right-2 ${getDifficultyColor(monastery.difficulty)}`}>
                              {monastery.difficulty}
                            </Badge>
                            {isSelected && (
                              <div className="absolute top-2 left-2 bg-purple-600 text-white rounded-full p-1">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-bold text-sm mb-2 text-gray-800 dark:text-gray-200">
                              {monastery.name}
                            </h3>
                            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{monastery.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{monastery.estimatedTime}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span>{monastery.rating}</span>
                                </div>
                                <span className="font-medium">
                                  {monastery.entryFee === 0 ? 'Free' : `₹${monastery.entryFee}`}
                                </span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Trip Configuration */}
            <div className="space-y-6">
              {/* Trip Settings */}
              <Card className="shadow-xl dark:shadow-2xl dark:shadow-purple-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">Trip Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent bg-white dark:bg-gray-700/80 text-gray-800 dark:text-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Trip Duration: {tripDuration} days
                    </label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTripDuration(Math.max(1, tripDuration - 1))}
                        disabled={tripDuration <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-center min-w-16">
                        {tripDuration}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setTripDuration(Math.min(7, tripDuration + 1))}
                        disabled={tripDuration >= 7}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Selected Monasteries:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{selectedMonasteries.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Entry Fees:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">₹{getTotalCost()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Estimated Duration:</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{tripDuration} days</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={generateTripPlan}
                    disabled={selectedMonasteries.length === 0 || !startDate || isGenerating}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg dark:shadow-purple-500/20"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        <Route className="mr-2 h-4 w-4" />
                        Generate Trip Plan
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              {/* Selected Monasteries Summary */}
              {selectedMonasteries.length > 0 && (
                <Card className="shadow-lg dark:shadow-lg dark:shadow-purple-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-gray-800 dark:text-gray-200 text-lg">
                      Selected Monasteries ({selectedMonasteries.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {selectedMonasteries.map((monastery) => (
                        <div key={monastery.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{monastery.name}</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">{monastery.district}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleMonastery(monastery)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Generated Trip Plan */}
          {tripPlan.length > 0 && (
            <Card className="mt-8 shadow-xl dark:shadow-2xl dark:shadow-purple-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">Your Monastery Journey</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Share className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {tripPlan.map((day) => (
                    <div key={day.day} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                            Day {day.day}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{day.date}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                            {day.district}
                          </Badge>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {day.totalTime}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {day.monasteries.map((monastery, index) => (
                          <div key={monastery.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                                Stop #{index + 1}
                              </span>
                              <Badge className={`${getDifficultyColor(monastery.difficulty)} text-xs`}>
                                {monastery.difficulty}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">
                              {monastery.name}
                            </h4>
                            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                <span>{monastery.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{monastery.estimatedTime}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Mountain className="h-3 w-3" />
                                <span>{monastery.altitude}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trip Summary */}
                <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Trip Summary</h4>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedMonasteries.length}</div>
                      <div className="text-gray-600 dark:text-gray-400">Monasteries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{tripDuration}</div>
                      <div className="text-gray-600 dark:text-gray-400">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">₹{getTotalCost()}</div>
                      <div className="text-gray-600 dark:text-gray-400">Entry Fees</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {[...new Set(selectedMonasteries.map(m => m.district))].length}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">Districts</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  )
}