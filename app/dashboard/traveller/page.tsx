import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MapPin, Calendar, Compass, Heart, User, Settings } from "lucide-react"

export default async function TravellerDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile and traveller data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || profile.user_type !== "traveller") {
    redirect("/dashboard/monastery")
  }

  const { data: traveller } = await supabase.from("travellers").select("*").eq("id", user.id).single()

  const { data: tripPlans } = await supabase
    .from("trip_plans")
    .select("*")
    .eq("traveller_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Welcome back, {profile.full_name}!</h1>
          <p className="text-green-600">Continue your spiritual journey through Sikkim's sacred monasteries.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Card className="bg-white/70 backdrop-blur border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Trip Plans</CardTitle>
              <Compass className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">{tripPlans?.length || 0}</div>
              <p className="text-xs text-green-600">Planned journeys</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Monasteries Visited</CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">12</div>
              <p className="text-xs text-green-600">Sacred places explored</p>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-800">3</div>
              <p className="text-xs text-green-600">Festivals to attend</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-white/70 backdrop-blur border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <User className="h-5 w-5" />
                Your Profile
              </CardTitle>
              <CardDescription className="text-green-600">Your travel preferences and information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Age Group:</span>
                <Badge className="bg-green-100 text-green-800">{traveller?.age_group || "Not set"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Travel Style:</span>
                <Badge className="bg-green-100 text-green-800">{traveller?.travel_style || "Not set"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-700">Accessibility Needs:</span>
                <Badge className="bg-green-100 text-green-800">{traveller?.accessibility_needs ? "Yes" : "No"}</Badge>
              </div>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/profile">
                  <Settings className="h-4 w-4 mr-2" />
                  Update Profile
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Compass className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-green-600">Start planning your next spiritual journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-green-600 hover:bg-green-700" asChild>
                <Link href="/plan">
                  <Compass className="h-4 w-4 mr-2" />
                  Plan New Trip
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/monasteries">
                  <MapPin className="h-4 w-4 mr-2" />
                  Explore Monasteries
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/events">
                  <Calendar className="h-4 w-4 mr-2" />
                  Browse Events
                </Link>
              </Button>
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/tours">
                  <Heart className="h-4 w-4 mr-2" />
                  Virtual Tours
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {tripPlans && tripPlans.length > 0 && (
          <Card className="mt-6 bg-white/70 backdrop-blur border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Your Trip Plans</CardTitle>
              <CardDescription className="text-green-600">Your planned monastery visits and journeys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tripPlans.slice(0, 3).map((plan) => (
                  <div key={plan.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-green-800">{plan.title}</h3>
                      <p className="text-sm text-green-600">
                        {new Date(plan.start_date).toLocaleDateString()} -{" "}
                        {new Date(plan.end_date).toLocaleDateString()} • {plan.total_days} days
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/plan/${plan.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
              {tripPlans.length > 3 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href="/plan">View All Plans</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
