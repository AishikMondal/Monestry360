"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Search, Filter, Clock, Star, Eye } from "lucide-react"
import Link from "next/link"

// Mock data for virtual tours
const virtualTours = [
  {
    id: 1,
    monasteryId: 1,
    name: "Rumtek Monastery Complete Tour",
    monastery: "Rumtek Monastery",
    location: "East Sikkim",
    district: "east",
    description: "Experience the grandeur of Sikkim's largest monastery through our comprehensive virtual tour.",
    thumbnail: "/rumtek-monastery-golden-roof-with-mountains.jpg",
    duration: "25 minutes",
    scenes: 12,
    highlights: ["Main Prayer Hall", "Golden Stupa", "Monastery Courtyard", "Monks' Quarters"],
    difficulty: "Beginner",
    rating: 4.8,
    views: "15,420",
    featured: true,
    type: "360° Panoramic",
  },
  {
    id: 2,
    monasteryId: 2,
    name: "Pemayangtse Heritage Walk",
    monastery: "Pemayangtse Monastery",
    location: "West Sikkim",
    district: "west",
    description: "Journey through centuries of history in this ancient monastery with stunning mountain views.",
    thumbnail: "/pemayangtse-monastery-white-walls-mountain-backdro.jpg",
    duration: "18 minutes",
    scenes: 8,
    highlights: ["Ancient Murals", "Wooden Sculptures", "Mountain Viewpoint", "Sacred Texts"],
    difficulty: "Intermediate",
    rating: 4.7,
    views: "12,890",
    featured: true,
    type: "360° Panoramic",
  },
  {
    id: 3,
    monasteryId: 3,
    name: "Enchey Monastery Cultural Experience",
    monastery: "Enchey Monastery",
    location: "East Sikkim",
    district: "east",
    description: "Discover the cultural richness and traditional practices of this historic monastery.",
    thumbnail: "/enchey-monastery-colorful-prayer-flags-traditional.jpg",
    duration: "15 minutes",
    scenes: 6,
    highlights: ["Prayer Flags", "Cham Dance Area", "City Views", "Traditional Architecture"],
    difficulty: "Beginner",
    rating: 4.6,
    views: "9,750",
    featured: false,
    type: "360° Panoramic",
  },
  {
    id: 4,
    monasteryId: 4,
    name: "Tashiding Sacred Journey",
    monastery: "Tashiding Monastery",
    location: "West Sikkim",
    district: "west",
    description: "Explore the sacred hilltop monastery with breathtaking valley panoramas.",
    thumbnail: "/placeholder.svg?key=tashiding-tour",
    duration: "20 minutes",
    scenes: 10,
    highlights: ["Sacred Chorten", "Valley Views", "Holy Water Spring", "Meditation Halls"],
    difficulty: "Intermediate",
    rating: 4.9,
    views: "8,320",
    featured: false,
    type: "360° Panoramic",
  },
]

export default function VirtualToursPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredTours = virtualTours.filter((tour) => {
    const matchesSearch =
      tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tour.monastery.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDistrict = selectedDistrict === "all" || tour.district === selectedDistrict
    const matchesDifficulty =
      selectedDifficulty === "all" || tour.difficulty.toLowerCase() === selectedDifficulty.toLowerCase()
    const matchesFeatured = !showFeaturedOnly || tour.featured

    return matchesSearch && matchesDistrict && matchesDifficulty && matchesFeatured
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Virtual Tours Collection</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Immerse yourself in 360° panoramic experiences of Sikkim's most sacred monasteries. Explore ancient halls,
            discover hidden treasures, and feel the spiritual atmosphere from anywhere in the world.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search virtual tours..."
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

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className="flex items-center space-x-2"
              >
                <Star className="h-4 w-4" />
                <span>Featured</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredTours.length} of {virtualTours.length} virtual tours
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <Card
              key={tour.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative">
                <img src={tour.thumbnail || "/placeholder.svg"} alt={tour.name} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Play className="h-12 w-12 text-white" />
                </div>
                {tour.featured && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">{tour.type}</Badge>
                <div className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
                  {tour.scenes} scenes
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{tour.name}</CardTitle>
                <CardDescription>
                  {tour.monastery} • {tour.location}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-pretty text-sm">{tour.description}</p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {tour.views} views
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{tour.rating}</span>
                  </div>
                  <Badge
                    variant={
                      tour.difficulty === "Beginner"
                        ? "secondary"
                        : tour.difficulty === "Intermediate"
                          ? "default"
                          : "destructive"
                    }
                    className="text-xs"
                  >
                    {tour.difficulty}
                  </Badge>
                </div>

                <div>
                  <span className="text-sm font-medium mb-2 block">Tour Highlights</span>
                  <div className="flex flex-wrap gap-1">
                    {tour.highlights.slice(0, 3).map((highlight) => (
                      <Badge key={highlight} variant="outline" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                    {tour.highlights.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tour.highlights.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Button asChild className="w-full">
                  <Link href={`/tours/${tour.id}`}>Start Virtual Tour</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No results */}
        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No virtual tours found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
