"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Clock, Users, Search, Filter, Star } from "lucide-react"
import Link from "next/link"

// Mock events data
const events = [
  {
    id: 1,
    name: "Losar - Tibetan New Year",
    monastery: "Rumtek Monastery",
    monasteryId: 1,
    location: "East Sikkim",
    district: "east",
    date: "2024-02-10",
    endDate: "2024-02-12",
    time: "6:00 AM - 8:00 PM",
    description:
      "Celebrate the Tibetan New Year with traditional ceremonies, masked dances, and cultural performances.",
    longDescription:
      "Losar is the most important festival in the Tibetan calendar, marking the beginning of the new year. The celebration at Rumtek Monastery features elaborate ceremonies, traditional Cham dances, butter sculptures, and community feasts. Visitors can witness ancient rituals, participate in prayer ceremonies, and experience the vibrant Tibetan culture.",
    image: "/placeholder.svg?key=losar",
    category: "Festival",
    type: "Cultural",
    duration: "3 days",
    capacity: 500,
    registered: 234,
    price: "Free",
    featured: true,
    highlights: ["Cham Dance", "Butter Sculptures", "Traditional Music", "Community Feast"],
    requirements: ["Respectful attire", "Photography restrictions apply"],
    organizer: "Rumtek Monastery Committee",
  },
  {
    id: 2,
    name: "Kagyu Monlam Prayer Festival",
    monastery: "Rumtek Monastery",
    monasteryId: 1,
    location: "East Sikkim",
    district: "east",
    date: "2024-03-15",
    endDate: "2024-03-17",
    time: "5:00 AM - 7:00 PM",
    description: "Annual prayer festival with meditation sessions, teachings, and collective prayers for world peace.",
    longDescription:
      "The Kagyu Monlam is a significant prayer festival where monks and devotees gather for intensive meditation and prayer sessions. The event includes teachings by senior lamas, group meditation, and prayers for the welfare of all sentient beings.",
    image: "/placeholder.svg?key=monlam",
    category: "Religious",
    type: "Spiritual",
    duration: "3 days",
    capacity: 300,
    registered: 156,
    price: "Free",
    featured: true,
    highlights: ["Group Meditation", "Dharma Teachings", "Prayer Ceremonies", "Spiritual Discussions"],
    requirements: ["Silent participation", "Meditation experience helpful"],
    organizer: "Kagyu Lineage Committee",
  },
  {
    id: 3,
    name: "Pang Lhabsol Festival",
    monastery: "Pemayangtse Monastery",
    monasteryId: 2,
    location: "West Sikkim",
    district: "west",
    date: "2024-08-28",
    endDate: "2024-08-28",
    time: "9:00 AM - 5:00 PM",
    description: "Sacred festival honoring Mount Kanchenjunga with traditional dances and rituals.",
    longDescription:
      "Pang Lhabsol is a unique festival dedicated to Mount Kanchenjunga, the guardian deity of Sikkim. The celebration features warrior dances, traditional costumes, and rituals that showcase Sikkim's indigenous culture and Buddhist traditions.",
    image: "/placeholder.svg?key=panglhabsol",
    category: "Festival",
    type: "Cultural",
    duration: "1 day",
    capacity: 400,
    registered: 89,
    price: "₹200",
    featured: false,
    highlights: ["Warrior Dances", "Traditional Costumes", "Mountain Worship", "Local Cuisine"],
    requirements: ["Advance booking required", "Cultural sensitivity expected"],
    organizer: "West Sikkim Cultural Society",
  },
  {
    id: 4,
    name: "Buddha Purnima Celebration",
    monastery: "Enchey Monastery",
    monasteryId: 3,
    location: "East Sikkim",
    district: "east",
    date: "2024-05-23",
    endDate: "2024-05-23",
    time: "4:00 AM - 10:00 PM",
    description: "Commemorate Buddha's birth, enlightenment, and parinirvana with special prayers and ceremonies.",
    longDescription:
      "Buddha Purnima is one of the most sacred days in Buddhism, celebrating the birth, enlightenment, and death of Buddha. The monastery organizes special prayer sessions, meditation retreats, and cultural programs throughout the day.",
    image: "/placeholder.svg?key=buddhapurnima",
    category: "Religious",
    type: "Spiritual",
    duration: "1 day",
    capacity: 250,
    registered: 178,
    price: "Free",
    featured: false,
    highlights: ["Special Prayers", "Meditation Sessions", "Dharma Talks", "Candlelight Procession"],
    requirements: ["Early arrival recommended", "Vegetarian meals only"],
    organizer: "Enchey Monastery",
  },
  {
    id: 5,
    name: "Hemis Festival",
    monastery: "Tashiding Monastery",
    monasteryId: 4,
    location: "West Sikkim",
    district: "west",
    date: "2024-07-12",
    endDate: "2024-07-13",
    time: "8:00 AM - 6:00 PM",
    description: "Colorful festival featuring masked dances, traditional music, and spiritual ceremonies.",
    longDescription:
      "The Hemis Festival is a vibrant celebration featuring elaborate masked dances performed by monks, traditional Ladakhi music, and spiritual ceremonies. The festival attracts visitors from around the world to witness this spectacular display of Buddhist culture.",
    image: "/placeholder.svg?key=hemis",
    category: "Festival",
    type: "Cultural",
    duration: "2 days",
    capacity: 350,
    registered: 267,
    price: "₹150",
    featured: true,
    highlights: ["Masked Dances", "Traditional Music", "Colorful Costumes", "Sacred Rituals"],
    requirements: ["Photography fee separate", "Comfortable footwear recommended"],
    organizer: "Tashiding Cultural Committee",
  },
]

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedMonth, setSelectedMonth] = useState("all")
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list")

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.monastery.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDistrict = selectedDistrict === "all" || event.district === selectedDistrict
    const matchesCategory =
      selectedCategory === "all" || event.category.toLowerCase() === selectedCategory.toLowerCase()
    const matchesMonth = selectedMonth === "all" || new Date(event.date).getMonth() === Number.parseInt(selectedMonth)

    return matchesSearch && matchesDistrict && matchesCategory && matchesMonth
  })

  const upcomingEvents = filteredEvents.filter((event) => new Date(event.date) >= new Date()).slice(0, 3)
  const featuredEvents = filteredEvents.filter((event) => event.featured)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Monastery Events & Festivals</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Experience the rich cultural heritage of Sikkim through sacred festivals, spiritual ceremonies, and
            traditional celebrations at monasteries across the region.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{events.length}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">{featuredEvents.length}</div>
              <div className="text-sm text-muted-foreground">Featured Events</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold">4</div>
              <div className="text-sm text-muted-foreground">Districts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">1,200+</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events and festivals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>

              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Districts</SelectItem>
                  <SelectItem value="east">East Sikkim</SelectItem>
                  <SelectItem value="west">West Sikkim</SelectItem>
                  <SelectItem value="north">North Sikkim</SelectItem>
                  <SelectItem value="south">South Sikkim</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="festival">Festival</SelectItem>
                  <SelectItem value="religious">Religious</SelectItem>
                  <SelectItem value="cultural">Cultural</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="0">January</SelectItem>
                  <SelectItem value="1">February</SelectItem>
                  <SelectItem value="2">March</SelectItem>
                  <SelectItem value="3">April</SelectItem>
                  <SelectItem value="4">May</SelectItem>
                  <SelectItem value="5">June</SelectItem>
                  <SelectItem value="6">July</SelectItem>
                  <SelectItem value="7">August</SelectItem>
                  <SelectItem value="8">September</SelectItem>
                  <SelectItem value="9">October</SelectItem>
                  <SelectItem value="10">November</SelectItem>
                  <SelectItem value="11">December</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "list" | "calendar")} className="mb-8">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="mt-6">
            {/* Featured Events */}
            {featuredEvents.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="relative">
                        <img
                          src={event.image || "/placeholder.svg"}
                          alt={event.name}
                          className="w-full h-48 object-cover"
                        />
                        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                          {event.category}
                        </Badge>
                      </div>

                      <CardHeader>
                        <CardTitle className="text-xl">{event.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {event.monastery} • {event.location}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <p className="text-muted-foreground text-pretty text-sm">{event.description}</p>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            {event.duration}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm">
                              {event.registered}/{event.capacity}
                            </span>
                          </div>
                          <Badge variant={event.price === "Free" ? "secondary" : "default"}>{event.price}</Badge>
                        </div>

                        <Button asChild className="w-full">
                          <Link href={`/events/${event.id}`}>View Details & Register</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* All Events */}
            <div>
              <h2 className="text-2xl font-bold mb-6">All Events ({filteredEvents.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative">
                      <img
                        src={event.image || "/placeholder.svg"}
                        alt={event.name}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                        {event.category}
                      </Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-xl">{event.name}</CardTitle>
                      <CardDescription className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {event.monastery} • {event.location}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground text-pretty text-sm">{event.description}</p>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {event.duration}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {event.registered}/{event.capacity}
                          </span>
                        </div>
                        <Badge variant={event.price === "Free" ? "secondary" : "default"}>{event.price}</Badge>
                      </div>

                      <Button asChild className="w-full">
                        <Link href={`/events/${event.id}`}>View Details & Register</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Calendar</CardTitle>
                <CardDescription>View all monastery events and festivals in calendar format</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Simplified calendar view */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="p-2 text-center font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayEvents = filteredEvents.filter((event) => new Date(event.date).getDate() === (i % 31) + 1)
                    return (
                      <div key={i} className="min-h-[80px] p-2 border rounded hover:bg-muted/50">
                        <div className="text-sm font-medium mb-1">{(i % 31) + 1}</div>
                        {dayEvents.slice(0, 2).map((event) => (
                          <div key={event.id} className="text-xs bg-primary/10 text-primary p-1 rounded mb-1 truncate">
                            {event.name}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground">+{dayEvents.length - 2} more</div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* No results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No events found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
