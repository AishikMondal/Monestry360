"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Clock, Users, Search, Filter } from "lucide-react"
import Link from "next/link"

// Mock data for monasteries
const monasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    location: "East Sikkim",
    district: "east",
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
    description: "Beautiful monastery known for its architectural splendor.",
    image: "/placeholder.svg?key=ralang",
    established: "1768",
    visitors: "18,000+ annually",
    highlights: ["Architecture", "Festivals", "Art Collection"],
    altitude: "1,200m",
    accessibility: "Easy",
  },
]

export default function MonasteriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedAccessibility, setSelectedAccessibility] = useState("all")

  const filteredMonasteries = monasteries.filter((monastery) => {
    const matchesSearch =
      monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monastery.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDistrict = selectedDistrict === "all" || monastery.district === selectedDistrict
    const matchesAccessibility =
      selectedAccessibility === "all" || monastery.accessibility.toLowerCase() === selectedAccessibility.toLowerCase()

    return matchesSearch && matchesDistrict && matchesAccessibility
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Sacred Monasteries of Sikkim</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Discover over 200 monasteries across four districts of Sikkim. Each monastery tells a unique story of
            spiritual devotion, architectural beauty, and cultural heritage.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search monasteries by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4 items-center">
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

              <Select value={selectedAccessibility} onValueChange={setSelectedAccessibility}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Accessibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="difficult">Difficult</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredMonasteries.length} of {monasteries.length} monasteries
          </p>
        </div>

        {/* Monastery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMonasteries.map((monastery) => (
            <Card
              key={monastery.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={monastery.image || "/placeholder.svg"}
                  alt={monastery.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {monastery.district.charAt(0).toUpperCase() + monastery.district.slice(1)} Sikkim
                </Badge>
                <Badge
                  className="absolute top-4 right-4"
                  variant={
                    monastery.accessibility === "Easy"
                      ? "secondary"
                      : monastery.accessibility === "Moderate"
                        ? "default"
                        : "destructive"
                  }
                >
                  {monastery.accessibility}
                </Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{monastery.name}</CardTitle>
                <CardDescription className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {monastery.location} • {monastery.altitude}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-pretty">{monastery.description}</p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Est. {monastery.established}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {monastery.visitors}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {monastery.highlights.map((highlight) => (
                    <Badge key={highlight} variant="outline" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link href={`/monasteries/${monastery.id}`}>Explore Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredMonasteries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No monasteries found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
