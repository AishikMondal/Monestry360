"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, NavigationIcon, Filter, Layers } from "lucide-react"
import Link from "next/link"

// Mock monastery data with coordinates
const monasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    location: "East Sikkim",
    district: "east",
    coordinates: { lat: 27.3389, lng: 88.5583 },
    description: "The largest monastery in Sikkim, known as the Dharma Chakra Centre.",
    image: "/rumtek-monastery-golden-roof-with-mountains.jpg",
    established: "1966",
    visitors: "50,000+ annually",
    highlights: ["Golden Stupa", "Tibetan Art", "Prayer Wheels"],
    altitude: "1,550m",
    accessibility: "Easy",
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    location: "West Sikkim",
    district: "west",
    coordinates: { lat: 27.2167, lng: 88.2167 },
    description: "One of the oldest monasteries in Sikkim with stunning mountain views.",
    image: "/pemayangtse-monastery-white-walls-mountain-backdro.jpg",
    established: "1705",
    visitors: "30,000+ annually",
    highlights: ["Ancient Murals", "Wooden Sculptures", "Kanchenjunga Views"],
    altitude: "2,085m",
    accessibility: "Moderate",
  },
  {
    id: 3,
    name: "Enchey Monastery",
    location: "East Sikkim",
    district: "east",
    coordinates: { lat: 27.3314, lng: 88.6138 },
    description: "A 200-year-old monastery famous for its annual Cham dance.",
    image: "/enchey-monastery-colorful-prayer-flags-traditional.jpg",
    established: "1840",
    visitors: "25,000+ annually",
    highlights: ["Cham Dance", "Prayer Flags", "City Views"],
    altitude: "1,875m",
    accessibility: "Easy",
  },
  {
    id: 4,
    name: "Tashiding Monastery",
    location: "West Sikkim",
    district: "west",
    coordinates: { lat: 27.3333, lng: 88.2667 },
    description: "Sacred monastery on a hilltop with panoramic valley views.",
    image: "/placeholder.svg?key=tashiding",
    established: "1717",
    visitors: "20,000+ annually",
    highlights: ["Sacred Chorten", "Valley Views", "Holy Water"],
    altitude: "1,465m",
    accessibility: "Moderate",
  },
  {
    id: 5,
    name: "Phensang Monastery",
    location: "North Sikkim",
    district: "north",
    coordinates: { lat: 27.7333, lng: 88.5833 },
    description: "Remote monastery offering tranquil meditation experiences.",
    image: "/placeholder.svg?key=phensang",
    established: "1721",
    visitors: "15,000+ annually",
    highlights: ["Meditation Halls", "Mountain Views", "Ancient Texts"],
    altitude: "2,500m",
    accessibility: "Difficult",
  },
  {
    id: 6,
    name: "Ralang Monastery",
    location: "South Sikkim",
    district: "south",
    coordinates: { lat: 27.1667, lng: 88.4167 },
    description: "Beautiful monastery known for its architectural splendor.",
    image: "/placeholder.svg?key=ralang",
    established: "1768",
    visitors: "18,000+ annually",
    highlights: ["Architecture", "Festivals", "Art Collection"],
    altitude: "1,200m",
    accessibility: "Easy",
  },
]

export default function MapPage() {
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedAccessibility, setSelectedAccessibility] = useState("all")
  const [selectedMonastery, setSelectedMonastery] = useState<(typeof monasteries)[0] | null>(null)
  const [mapView, setMapView] = useState<"satellite" | "terrain" | "roadmap">("terrain")

  const filteredMonasteries = monasteries.filter((monastery) => {
    const matchesDistrict = selectedDistrict === "all" || monastery.district === selectedDistrict
    const matchesAccessibility =
      selectedAccessibility === "all" || monastery.accessibility.toLowerCase() === selectedAccessibility.toLowerCase()

    return matchesDistrict && matchesAccessibility
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Interactive Monastery Map</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore the geographical distribution of Sikkim's monasteries. Click on markers to learn more about each
            sacred site and plan your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Controls Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">District</label>
                  <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Districts</SelectItem>
                      <SelectItem value="east">East Sikkim</SelectItem>
                      <SelectItem value="west">West Sikkim</SelectItem>
                      <SelectItem value="north">North Sikkim</SelectItem>
                      <SelectItem value="south">South Sikkim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Accessibility</label>
                  <Select value={selectedAccessibility} onValueChange={setSelectedAccessibility}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="difficult">Difficult</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Map View Controls */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Layers className="h-5 w-5" />
                  <span>Map View</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={mapView === "terrain" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setMapView("terrain")}
                >
                  Terrain View
                </Button>
                <Button
                  variant={mapView === "satellite" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setMapView("satellite")}
                >
                  Satellite View
                </Button>
                <Button
                  variant={mapView === "roadmap" ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setMapView("roadmap")}
                >
                  Road Map
                </Button>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Easy Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Moderate Access</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-sm">Difficult Access</span>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Monasteries</span>
                  <span className="font-medium">{monasteries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Showing</span>
                  <span className="font-medium">{filteredMonasteries.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Districts Covered</span>
                  <span className="font-medium">4</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                {/* Simulated Map Interface */}
                <div className="relative w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg overflow-hidden">
                  {/* Map Background */}
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 400 300" className="w-full h-full">
                      {/* Sikkim outline simulation */}
                      <path
                        d="M50 50 L350 50 L350 250 L50 250 Z"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                    </svg>
                  </div>

                  {/* Monastery Markers */}
                  {filteredMonasteries.map((monastery, index) => {
                    const x = 50 + (index % 3) * 100 + Math.random() * 50
                    const y = 80 + Math.floor(index / 3) * 80 + Math.random() * 40
                    const color =
                      monastery.accessibility === "Easy"
                        ? "bg-green-500"
                        : monastery.accessibility === "Moderate"
                          ? "bg-yellow-500"
                          : "bg-red-500"

                    return (
                      <div
                        key={monastery.id}
                        className={`absolute w-6 h-6 ${color} rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform`}
                        style={{ left: `${x}px`, top: `${y}px` }}
                        onClick={() => setSelectedMonastery(monastery)}
                      >
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
                      </div>
                    )
                  })}

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                      +
                    </Button>
                    <Button size="sm" variant="secondary" className="w-10 h-10 p-0">
                      -
                    </Button>
                  </div>

                  {/* Compass */}
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <NavigationIcon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  {/* Scale */}
                  <div className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded shadow text-sm">0 ——— 50km</div>

                  {/* Current View Info */}
                  <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded shadow text-sm">
                    {mapView.charAt(0).toUpperCase() + mapView.slice(1)} View
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Monastery Info */}
            {selectedMonastery && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{selectedMonastery.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {selectedMonastery.location} • {selectedMonastery.altitude}
                      </CardDescription>
                    </div>
                    <Badge
                      variant={
                        selectedMonastery.accessibility === "Easy"
                          ? "secondary"
                          : selectedMonastery.accessibility === "Moderate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {selectedMonastery.accessibility}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={selectedMonastery.image || "/placeholder.svg"}
                        alt={selectedMonastery.name}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                      <p className="text-muted-foreground text-sm text-pretty">{selectedMonastery.description}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Established</span>
                        <span className="font-medium">{selectedMonastery.established}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Annual Visitors</span>
                        <span className="font-medium">{selectedMonastery.visitors}</span>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground mb-2 block">Highlights</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedMonastery.highlights.map((highlight) => (
                            <Badge key={highlight} variant="outline" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button asChild size="sm">
                          <Link href={`/monasteries/${selectedMonastery.id}`}>View Details</Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          Get Directions
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
