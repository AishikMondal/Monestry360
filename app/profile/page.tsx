"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  User,
  MapPin,
  Calendar,
  Heart,
  Bookmark,
  Settings,
  Edit3,
  Camera,
  Star,
  Clock,
  Route,
  Mountain,
  Award,
  BarChart3,
  PlusCircle
} from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string
  user_type: "traveller" | "monastery"
  phone?: string
  emergency_contact?: string
}

interface SavedMonastery {
  id: string
  name: string
  district: string
  image: string
  visited: boolean
  rating?: number
  notes?: string
  visitDate?: string
}

interface SavedTrip {
  id: string
  name: string
  duration: string
  budget: string
  monasteries: number
  createdDate: string
  status: "planned" | "completed" | "in-progress"
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [savedMonasteries, setSavedMonasteries] = useState<SavedMonastery[]>([])
  const [savedTrips, setSavedTrips] = useState<SavedTrip[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push("/auth/login")
        return
      }

      setUser(session.user)
      
      // Get user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()
      
      setProfile(profileData)
      
      // Load demo data
      loadSavedData()
      setIsLoading(false)
    }

    getProfile()
  }, [supabase, router])

  const loadSavedData = () => {
    // Demo saved monasteries
    const demoMonasteries: SavedMonastery[] = [
      {
        id: "1",
        name: "Rumtek Monastery",
        district: "East Sikkim",
        image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400",
        visited: true,
        rating: 5,
        notes: "Amazing architecture and peaceful atmosphere",
        visitDate: "2024-01-15"
      },
      {
        id: "2", 
        name: "Enchey Monastery",
        district: "East Sikkim",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400",
        visited: false,
        notes: "Planning to visit next month"
      },
      {
        id: "3",
        name: "Pemayangtse Monastery", 
        district: "West Sikkim",
        image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699?w=400",
        visited: true,
        rating: 4,
        visitDate: "2024-02-20"
      }
    ]

    // Demo saved trips
    const demoTrips: SavedTrip[] = [
      {
        id: "1",
        name: "East Sikkim Spiritual Journey",
        duration: "3 Days",
        budget: "₹15,000",
        monasteries: 4,
        createdDate: "2024-01-10",
        status: "completed"
      },
      {
        id: "2",
        name: "Complete Sikkim Monastery Tour",
        duration: "7 Days", 
        budget: "₹45,000",
        monasteries: 8,
        createdDate: "2024-03-01",
        status: "planned"
      }
    ]

    setSavedMonasteries(demoMonasteries)
    setSavedTrips(demoTrips)
  }

  const getUserInitials = () => {
    if (!profile?.full_name) return "U"
    return profile.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-muted-foreground mb-4">You need to be signed in to view your profile.</p>
          <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
        </div>
      </div>
    )
  }

  const stats = {
    visited: savedMonasteries.filter(m => m.visited).length,
    planned: savedTrips.filter(t => t.status === "planned").length,
    totalDistance: "156 km",
    achievements: 5
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="shadow-xl dark:shadow-2xl dark:shadow-green-500/10 mb-8 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-8 bg-white dark:bg-gradient-to-br dark:from-gray-800/80 dark:to-gray-900/80">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-green-500 dark:to-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg dark:shadow-2xl dark:shadow-green-500/30">
                  {getUserInitials()}
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full p-2 shadow-lg"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{profile.full_name}</h1>
                <p className="text-muted-foreground mb-2">{user.email}</p>
                <Badge variant="secondary" className="mb-4">
                  {profile.user_type === "traveller" ? "Spiritual Traveller" : "Monastery"}
                </Badge>
                
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border dark:border-green-500/20 shadow-sm dark:shadow-green-500/10">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.visited}</div>
                    <div className="text-xs text-green-700 dark:text-green-300">Monasteries Visited</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border dark:border-blue-500/20 shadow-sm dark:shadow-blue-500/10 hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.planned}</div>
                    <div className="text-xs text-blue-700 dark:text-blue-300">Trips Planned</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl border dark:border-purple-500/20 shadow-sm dark:shadow-purple-500/10 hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalDistance}</div>
                    <div className="text-xs text-purple-700 dark:text-purple-300">Distance Traveled</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl border dark:border-orange-500/20 shadow-sm dark:shadow-orange-500/10 hover:scale-105 transition-transform">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.achievements}</div>
                    <div className="text-xs text-orange-700 dark:text-orange-300">Achievements</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button 
                  onClick={() => router.push("/settings")} 
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-all duration-200 hover:scale-105"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
                <Button 
                  onClick={() => router.push("/plan")}
                  className="bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 hover:from-green-700 hover:to-blue-700 dark:hover:from-green-400 dark:hover:to-blue-400 text-white shadow-lg dark:shadow-green-500/20 hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  <Route className="mr-2 h-4 w-4" />
                  Plan New Trip
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card className="shadow-xl dark:shadow-2xl dark:shadow-green-500/10 overflow-hidden border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
          <div className="border-b border-gray-200 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/30">
            <nav className="flex space-x-8 px-8">
              {[
                { id: "overview", label: "Overview", icon: User },
                { id: "monasteries", label: "Saved Monasteries", icon: Mountain },
                { id: "trips", label: "My Trips", icon: Route },
                { id: "achievements", label: "Achievements", icon: Award }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-4 border-b-2 font-medium text-sm transition-all duration-200 ${
                      activeTab === tab.id
                        ? "border-green-500 dark:border-green-400 text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-500/10 rounded-t-lg px-3"
                        : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/30 rounded-t-lg px-3"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <Mountain className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Visited Rumtek Monastery</p>
                        <p className="text-sm text-gray-500">Rated 5 stars • 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <Route className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Created "Complete Sikkim Tour"</p>
                        <p className="text-sm text-gray-500">7-day itinerary • 1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => router.push("/monasteries")}
                      variant="outline"
                      className="h-20 flex-col gap-2"
                    >
                      <Mountain className="h-6 w-6" />
                      Explore Monasteries
                    </Button>
                    <Button
                      onClick={() => router.push("/plan")}
                      variant="outline"
                      className="h-20 flex-col gap-2"
                    >
                      <Calendar className="h-6 w-6" />
                      Plan New Trip
                    </Button>
                    <Button
                      onClick={() => router.push("/maps")}
                      variant="outline"
                      className="h-20 flex-col gap-2"
                    >
                      <MapPin className="h-6 w-6" />
                      View Map
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Saved Monasteries Tab */}
            {activeTab === "monasteries" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Saved Monasteries</h3>
                  <Badge variant="secondary">{savedMonasteries.length} monasteries</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedMonasteries.map((monastery) => (
                    <Card key={monastery.id} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative">
                        <img
                          src={monastery.image}
                          alt={monastery.name}
                          className="w-full h-48 object-cover"
                        />
                        {monastery.visited && (
                          <Badge className="absolute top-2 right-2 bg-green-500">
                            Visited
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-1">{monastery.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{monastery.district}</p>
                        
                        {monastery.visited && monastery.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < monastery.rating! ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({monastery.rating}/5)</span>
                          </div>
                        )}

                        {monastery.notes && (
                          <p className="text-sm text-gray-600 mb-3 italic">"{monastery.notes}"</p>
                        )}

                        {monastery.visitDate && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                            <Clock className="h-3 w-3" />
                            Visited on {new Date(monastery.visitDate).toLocaleDateString()}
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit Notes
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => router.push(`/monastery/${monastery.id}`)}
                            className="flex-1"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Saved Trips Tab */}
            {activeTab === "trips" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">My Trips</h3>
                  <Button onClick={() => router.push("/plan")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    Plan New Trip
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedTrips.map((trip) => (
                    <Card key={trip.id} className="shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-semibold text-lg">{trip.name}</h4>
                          <Badge
                            variant={trip.status === "completed" ? "default" : trip.status === "planned" ? "secondary" : "outline"}
                          >
                            {trip.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock className="h-4 w-4" />
                            Duration: {trip.duration}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Mountain className="h-4 w-4" />
                            {trip.monasteries} monasteries included
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            Budget: {trip.budget}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Created: {new Date(trip.createdDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit3 className="h-3 w-3 mr-1" />
                            Edit Trip
                          </Button>
                          <Button size="sm" className="flex-1">
                            View Itinerary
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <div>
                <h3 className="text-xl font-semibold mb-6">Achievements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/50 dark:to-orange-900/50 border border-yellow-200 dark:border-yellow-700 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-yellow-600" />
                    </div>
                    <h4 className="font-semibold mb-2">First Visit</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Visited your first monastery</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/50 dark:to-emerald-900/50 border border-green-200 dark:border-green-700 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mountain className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Explorer</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Visited 3+ monasteries</p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/50 dark:to-cyan-900/50 border border-blue-200 dark:border-blue-700 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Route className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Trip Planner</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Created your first trip plan</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}