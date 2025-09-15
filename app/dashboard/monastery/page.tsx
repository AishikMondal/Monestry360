import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MonasteryProfile } from "@/components/dashboard/monastery-profile"
import { EventsManager } from "@/components/dashboard/events-manager"
import { MonasteryStats } from "@/components/dashboard/monastery-stats"
import { Mountain, Calendar, BarChart3, Settings } from "lucide-react"

export default async function MonasteryDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile and monastery data
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || profile.user_type !== "monastery") {
    redirect("/dashboard/traveller")
  }

  const { data: monastery } = await supabase.from("monasteries").select("*").eq("id", user.id).single()

  const { data: events } = await supabase
    .from("monastery_events")
    .select("*")
    .eq("monastery_id", user.id)
    .order("start_date", { ascending: true })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Monastery Dashboard</h1>
          <p className="text-green-600">
            Welcome back, {monastery?.monastery_name || profile.full_name}! Manage your monastery's presence on
            Monastery360.
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Mountain className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <MonasteryStats monastery={monastery} events={events || []} />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <MonasteryProfile monastery={monastery} profile={profile} />
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <EventsManager monasteryId={user.id} events={events || []} />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
