"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import dynamic from "next/dynamic"

// Dynamically import the map component to avoid SSR issues
const InteractiveMapComponent = dynamic(
  () => import('@/components/LeafletMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center border border-gray-300 dark:border-gray-600">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Loading Interactive Map...</p>
        </div>
      </div>
    )
  }
)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MapPin, 
  Star, 
  Clock, 
  Camera,
  Heart,
  Navigation as NavigationIcon,
  Search,
  Route,
  Mountain,
  ExternalLink,
  Zap
} from "lucide-react"

export default function InteractiveMap() {
  const searchParams = useSearchParams()
  const [selectedMonastery, setSelectedMonastery] = useState<any>(null)
  const [filter, setFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [mapView, setMapView] = useState<'interactive' | 'embedded'>('interactive')

  const monasteries: any[] = [
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
      difficulty: "easy"
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
      difficulty: "easy"
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
      difficulty: "moderate"
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
      difficulty: "challenging"
    },
    {
      id: 5,
      name: "Dubdi Monastery", 
      location: "Yuksom, West Sikkim",
      district: "West Sikkim",
      coordinates: { lat: 27.3833, lng: 88.2167 },
      rating: 4.5,
      reviewCount: 334,
      description: "The first monastery built in Sikkim, offering historical significance",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
      established: "1701",
      altitude: "2,100m",
      bestTime: ["April", "May", "September", "October"],
      highlights: ["Historical Significance", "Forest Trek", "Ancient Relics"],
      difficulty: "challenging"
    }
  ]

  // Handle URL monastery parameter
  useEffect(() => {
    const monasteryId = searchParams.get('monastery')
    if (monasteryId) {
      const monastery = monasteries.find(m => m.id.toString() === monasteryId)
      if (monastery) {
        setSelectedMonastery(monastery)
      }
    }
  }, [searchParams])

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800)
  }, [])

  const filteredMonasteries = monasteries.filter(monastery => {
    const matchesFilter = filter === "all" || monastery.difficulty === filter
    const matchesSearch = monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monastery.district.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "moderate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
      case "challenging": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 dark:border-green-800 border-t-green-600 dark:border-t-green-400 mx-auto shadow-lg dark:shadow-green-500/30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600 dark:text-green-400 animate-pulse" />
              </div>
            </div>
            <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
              Loading Interactive Map...
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Preparing monastery locations
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-6 shadow-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Interactive Monastery Map
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore {filteredMonasteries.length} sacred monasteries across Sikkim with interactive locations
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                🗺️ Interactive Map Active
              </Badge>
              {selectedMonastery && (
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  📍 {selectedMonastery.name} Selected
                </Badge>
              )}
            </div>
          </div>

          {/* Search and Filter */}
          <Card className="mb-8 shadow-xl dark:shadow-2xl dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search monasteries or districts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700/80 text-gray-800 dark:text-gray-200 transition-all duration-200"
                    />
                  </div>
                  <div className="flex gap-2">
                    {["all", "easy", "moderate", "challenging"].map((filterOption) => (
                      <Button
                        key={filterOption}
                        onClick={() => setFilter(filterOption)}
                        variant={filter === filterOption ? "default" : "outline"}
                        className={filter === filterOption ? "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600" : ""}
                      >
                        {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Map Options */}
                <div className="flex items-center justify-center gap-4 pt-2 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex gap-2 flex-wrap justify-center">
                    <Button
                      onClick={() => setMapView('interactive')}
                      variant={mapView === 'interactive' ? "default" : "outline"}
                      size="sm"
                      className={mapView === 'interactive' ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      🗺️ Google Maps
                    </Button>
                    <Button
                      onClick={() => setMapView('embedded')}
                      variant={mapView === 'embedded' ? "default" : "outline"}
                      size="sm"
                      className={mapView === 'embedded' ? "bg-blue-600 hover:bg-blue-700" : ""}
                    >
                      🌍 Regional View
                    </Button>
                    <Button
                      onClick={() => {
                        if (filteredMonasteries.length > 0) {
                          setSelectedMonastery(null) // Show all monasteries
                          setMapView('interactive')
                        }
                      }}
                      variant="outline"
                      size="sm"
                      className="border-purple-200 dark:border-purple-700 text-purple-700 dark:text-purple-300"
                    >
                      🎯 Show All
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl dark:shadow-2xl dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-gray-800 dark:text-gray-200">
                    <div className="flex items-center gap-2">
                      <NavigationIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Sikkim Monasteries Map
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 dark:text-green-400">Live</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {mapView === 'embedded' ? (
                    // Real Embedded Map View with Monasteries
                    <div className="h-96 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 relative">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113767.45834654283!2d88.51095!3d27.3389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39e94e207aa48c03%3A0x58c4c7c4b9e2a9c9!2sSikkim!5e0!3m2!1sen!2sin!4v1635789456789!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Sikkim Monasteries Map"
                      />
                      {/* Overlay showing monasteries are marked */}
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 px-3 py-2 rounded-lg shadow-lg">
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          🏛️ {filteredMonasteries.length} Monasteries in Region
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Real Interactive Map
                    <div className="h-96 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 relative">
                      {/* Primary monastery location for map center */}
                      {selectedMonastery ? (
                        <iframe
                          src={`https://maps.google.com/maps?q=${selectedMonastery.coordinates.lat},${selectedMonastery.coordinates.lng}&hl=en&z=12&output=embed`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`${selectedMonastery.name} Location`}
                        />
                      ) : (
                        <iframe
                          src="https://maps.google.com/maps?q=27.3389,88.6065&hl=en&z=10&output=embed"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Sikkim Monasteries Region"
                        />
                      )}
                      
                      {/* Map Overlay */}
                      <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-800/95 px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                          📍 {selectedMonastery ? selectedMonastery.name : 'Sikkim Region'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {filteredMonasteries.length} monasteries • Real Map
                        </div>
                      </div>
                      
                      {selectedMonastery && (
                        <div className="absolute top-4 right-4 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg shadow-lg border border-blue-200 dark:border-blue-700">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-medium text-blue-700 dark:text-blue-300">Selected</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute bottom-4 left-4 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg shadow-lg border border-green-200 dark:border-green-700">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-green-700 dark:text-green-300">Live Map</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* External Map Links */}
                  <div className="mt-4 flex gap-2 justify-center flex-wrap">
                    <Button
                      onClick={() => {
                        const url = selectedMonastery 
                          ? `https://www.openstreetmap.org/#map=15/${selectedMonastery.coordinates.lat}/${selectedMonastery.coordinates.lng}`
                          : 'https://www.openstreetmap.org/#map=10/27.3389/88.6065'
                        window.open(url, '_blank')
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      OpenStreetMap
                    </Button>
                    <Button
                      onClick={() => {
                        const url = selectedMonastery 
                          ? `https://www.google.com/maps/@${selectedMonastery.coordinates.lat},${selectedMonastery.coordinates.lng},15z`
                          : 'https://www.google.com/maps/@27.3389,88.6065,10z'
                        window.open(url, '_blank')
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Google Maps
                    </Button>
                    <Button
                      onClick={() => {
                        // Create a multi-point Google Maps URL with all monastery locations
                        const monasteryCoords = filteredMonasteries
                          .map(m => `${m.coordinates.lat},${m.coordinates.lng}`)
                          .join('|')
                        const url = `https://www.google.com/maps/dir/${monasteryCoords}`
                        window.open(url, '_blank')
                      }}
                      variant="outline"
                      size="sm"
                      className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                    >
                      <Route className="w-3 h-3 mr-1" />
                      All Monasteries
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monastery List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Monasteries ({filteredMonasteries.length})
              </h2>
              {filteredMonasteries.map((monastery) => (
                <Card
                  key={monastery.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm ${
                    selectedMonastery?.id === monastery.id
                      ? 'ring-2 ring-green-500 dark:ring-green-400 shadow-xl dark:shadow-green-500/20'
                      : 'hover:shadow-xl dark:hover:shadow-green-500/15'
                  }`}
                  onClick={() => setSelectedMonastery(monastery)}
                >
                  <div className="relative">
                    <img
                      src={monastery.image}
                      alt={monastery.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vbmFzdGVyeSBJbWFnZTwvdGV4dD4KICA8L3N2Zz4=';
                      }}
                    />
                    <Badge className={`absolute top-2 right-2 ${getDifficultyColor(monastery.difficulty)}`}>
                      {monastery.difficulty}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                      {monastery.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {monastery.rating}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({monastery.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        <span>{monastery.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mountain className="h-3 w-3" />
                        <span>Altitude: {monastery.altitude}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span>Est. {monastery.established}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Selected Monastery Details */}
          {selectedMonastery && (
            <Card className="mt-8 shadow-xl dark:shadow-2xl dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20"></div>
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{selectedMonastery.name}</CardTitle>
                    <p className="text-green-100">{selectedMonastery.location}</p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    onClick={() => setSelectedMonastery(null)}
                  >
                    ✕
                  </Button>
                </div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedMonastery.image}
                      alt={selectedMonastery.name}
                      className="w-full h-64 object-cover rounded-lg mb-4"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI2NCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk1vbmFzdGVyeSBJbWFnZTwvdGV4dD4KICA8L3N2Zz4=';
                      }}
                    />
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {selectedMonastery.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg dark:shadow-green-500/20">
                        <Route className="mr-2 h-4 w-4" />
                        Get Directions
                      </Button>
                      <Button variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <Camera className="mr-2 h-4 w-4" />
                        View Gallery
                      </Button>
                      <Button variant="outline" className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <Heart className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMonastery.highlights.map((highlight: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Best Time to Visit</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMonastery.bestTime.map((month: string, index: number) => (
                          <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                            {month}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">Established:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedMonastery.established}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">Altitude:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedMonastery.altitude}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">District:</span>
                        <p className="text-gray-600 dark:text-gray-400">{selectedMonastery.district}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">Difficulty:</span>
                        <Badge className={getDifficultyColor(selectedMonastery.difficulty)}>
                          {selectedMonastery.difficulty}
                        </Badge>
                      </div>
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