import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Eye, MapPin, CheckCircle, Clock } from "lucide-react"

interface MonasteryStatsProps {
  monastery: any
  events: any[]
}

export function MonasteryStats({ monastery, events }: MonasteryStatsProps) {
  const upcomingEvents = events.filter((event) => new Date(event.start_date) > new Date()).length
  const pastEvents = events.filter((event) => new Date(event.end_date) < new Date()).length
  const activeEvents = events.filter(
    (event) => new Date(event.start_date) <= new Date() && new Date(event.end_date) >= new Date(),
  ).length

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-white/70 backdrop-blur border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Verification Status</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant={monastery?.is_verified ? "default" : "secondary"} className="bg-green-100 text-green-800">
              {monastery?.is_verified ? "Verified" : "Pending"}
            </Badge>
          </div>
          <p className="text-xs text-green-600 mt-2">
            {monastery?.is_verified ? "Your monastery is verified" : "Verification in progress"}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Total Events</CardTitle>
          <Calendar className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">{events.length}</div>
          <p className="text-xs text-green-600">
            {upcomingEvents} upcoming, {activeEvents} active
          </p>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Profile Views</CardTitle>
          <Eye className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">1,234</div>
          <p className="text-xs text-green-600">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-white/70 backdrop-blur border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-700">Accessibility</CardTitle>
          <MapPin className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-800">{monastery?.accessibility_level || "Not Set"}</div>
          <p className="text-xs text-green-600">Current accessibility rating</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-4 bg-white/70 backdrop-blur border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">Recent Activity</CardTitle>
          <CardDescription className="text-green-600">Your monastery's recent updates and events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.slice(0, 3).map((event) => (
              <div key={event.id} className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-green-800 truncate">{event.title}</p>
                  <p className="text-sm text-green-600">
                    {new Date(event.start_date).toLocaleDateString()} - {event.event_type}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <Badge
                    variant={new Date(event.start_date) > new Date() ? "default" : "secondary"}
                    className="bg-green-100 text-green-800"
                  >
                    {new Date(event.start_date) > new Date() ? "Upcoming" : "Past"}
                  </Badge>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <p className="text-green-600">No events yet. Create your first event to get started!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
