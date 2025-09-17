"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Calendar,
  MapPin,
  Users,
  Star,
  TrendingUp,
  Mountain,
  Route,
  Clock,
  Award,
  Camera,
  Heart,
  BookOpen,
  Activity
} from "lucide-react"

interface DashboardStats {
  totalMonasteries: number
  visitedMonasteries: number
  plannedTrips: number
  completedTrips: number
  totalDistance: string
  favoriteMonasteries: number
  reviewsWritten: number
  photosShared: number
}

interface RecentActivity {
  id: string
  type: 'visit' | 'plan' | 'review' | 'photo'
  title: string
  description: string
  date: string
  icon: any
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalMonasteries: 25,
    visitedMonasteries: 8,
    plannedTrips: 3,
    completedTrips: 2,
    totalDistance: "245 km",
    favoriteMonasteries: 5,
    reviewsWritten: 6,
    photosShared: 24
  })
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push("/auth/login")
        return
      }

      setUser(session.user)
      loadDashboardData()
      setIsLoading(false)
    }

    checkUser()
  }, [supabase, router])

  const loadDashboardData = () => {
    // Demo recent activities
    const activities: RecentActivity[] = [
      {
        id: "1",
        type: "visit",
        title: "Visited Rumtek Monastery",
        description: "Rated 5 stars and shared 8 photos",
        date: "2 days ago",
        icon: Mountain
      },
      {
        id: "2", 
        type: "plan",
        title: "Created '7-Day Sikkim Tour'",
        description: "Planned itinerary for 4 monasteries",
        date: "1 week ago",
        icon: Route
      },
      {
        id: "3",
        type: "review",
        title: "Reviewed Enchey Monastery",
        description: "Wrote detailed review with tips",
        date: "2 weeks ago",
        icon: Star
      },
      {
        id: "4",
        type: "photo",
        title: "Uploaded monastery photos",
        description: "Shared 12 photos from Pemayangtse",
        date: "3 weeks ago",
        icon: Camera
      }
    ]

    setRecentActivities(activities)
  }

  const getStatColor = (statName: string) => {
    const colors = {
      totalMonasteries: "from-blue-500 to-blue-600",
      visitedMonasteries: "from-green-500 to-green-600", 
      plannedTrips: "from-purple-500 to-purple-600",
      completedTrips: "from-orange-500 to-orange-600",
      totalDistance: "from-pink-500 to-pink-600",
      favoriteMonasteries: "from-red-500 to-red-600",
      reviewsWritten: "from-indigo-500 to-indigo-600",
      photosShared: "from-teal-500 to-teal-600"
    }
    return colors[statName as keyof typeof colors] || "from-gray-500 to-gray-600"
  }

  const getActivityColor = (type: string) => {
    const colors = {
      visit: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
      plan: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
      review: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
      photo: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
          </div>
        </div>
      </>
    )
  }

  if (!user) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Please Sign In</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">You need to be signed in to view your dashboard.</p>
            <Button onClick={() => router.push("/auth/login")} className="bg-green-600 hover:bg-green-700">
              Sign In
            </Button>
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
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                  Welcome back!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Here's your spiritual journey overview
                </p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Monasteries</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stats.totalMonasteries}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${getStatColor('totalMonasteries')}`}>
                    <Mountain className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Visited</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stats.visitedMonasteries}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${getStatColor('visitedMonasteries')}`}>
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Trips Planned</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stats.plannedTrips}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${getStatColor('plannedTrips')}`}>
                    <Route className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-105 transition-transform duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Distance Traveled</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-gray-200">{stats.totalDistance}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-gradient-to-r ${getStatColor('totalDistance')}`}>
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl dark:shadow-2xl dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                    <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const IconComponent = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors">
                          <div className={`p-2 rounded-full bg-gradient-to-r ${getStatColor(activity.type)}`}>
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 dark:text-gray-200">{activity.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{activity.date}</p>
                          </div>
                          <Badge className={getActivityColor(activity.type)}>
                            {activity.type}
                          </Badge>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats & Actions */}
            <div className="space-y-6">
              {/* Additional Stats */}
              <Card className="shadow-xl dark:shadow-2xl dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">Your Journey</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">32%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{width: '32%'}}></div>
                  </div>
                  
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Favorites</span>
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{stats.favoriteMonasteries}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Reviews</span>
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{stats.reviewsWritten}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Camera className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Photos</span>
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-gray-200">{stats.photosShared}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-xl dark:shadow-2xl dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                  <Button 
                    onClick={() => router.push("/plan")}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <Route className="mr-2 h-4 w-4" />
                    Plan New Trip
                  </Button>
                  
                  <Button 
                    onClick={() => router.push("/maps")}
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Explore Map
                  </Button>
                  
                  <Button 
                    onClick={() => router.push("/monasteries")}
                    variant="outline"
                    className="w-full border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    >
                    <Mountain className="mr-2 h-4 w-4" />
                    Browse Monasteries
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}