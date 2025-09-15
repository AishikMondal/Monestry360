import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Mountain, Calendar, ArrowLeft, Play, Map, Share2 } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data for detailed monastery information
const monasteryDetails = {
  1: {
    id: 1,
    name: "Rumtek Monastery",
    location: "East Sikkim",
    district: "east",
    description: "The largest monastery in Sikkim, known as the Dharma Chakra Centre.",
    longDescription:
      "Rumtek Monastery, also known as the Dharma Chakra Centre, is one of the most significant monasteries in Sikkim and serves as the seat of the Karmapa. Built in the 1960s, it is a replica of the original Tsurphu Monastery in Tibet. The monastery houses some of the most sacred Buddhist relics and artifacts, including the Golden Stupa containing the relics of the 16th Karmapa.",
    image: "/rumtek-monastery-golden-roof-with-mountains.jpg",
    gallery: [
      "/rumtek-monastery-golden-roof-with-mountains.jpg",
      "/placeholder.svg?key=rumtek2",
      "/placeholder.svg?key=rumtek3",
      "/placeholder.svg?key=rumtek4",
    ],
    established: "1966",
    visitors: "50,000+ annually",
    highlights: ["Golden Stupa", "Tibetan Art", "Prayer Wheels"],
    altitude: "1,550m",
    accessibility: "Easy",
    bestTimeToVisit: "March to June, September to December",
    openingHours: "6:00 AM - 6:00 PM",
    entryFee: "Free",
    nearbyAttractions: ["Lingdum Monastery", "Gangtok City", "Tsomgo Lake"],
    festivals: [
      { name: "Kagyu Monlam", date: "February/March", description: "Annual prayer festival" },
      { name: "Losar", date: "February/March", description: "Tibetan New Year celebration" },
    ],
    history:
      "Rumtek was built by the 16th Karmapa, Rangjung Rigpe Dorje, after he fled Tibet in 1959. The monastery was constructed as a replica of the original Tsurphu Monastery in Tibet and was completed in 1966. It serves as the main seat of the Karma Kagyu lineage outside of Tibet.",
    architecture:
      "The monastery features traditional Tibetan architecture with intricate woodwork, colorful murals, and golden roofs. The main shrine hall houses a large statue of Buddha and beautiful thangka paintings.",
    spiritualSignificance:
      "Rumtek is considered one of the most important centers of Tibetan Buddhism outside Tibet. It houses sacred relics, ancient manuscripts, and serves as a center for Buddhist learning and meditation.",
    practicalInfo: {
      parking: "Available on-site",
      facilities: ["Restrooms", "Gift Shop", "Meditation Hall"],
      photography: "Allowed in courtyard, restricted inside main hall",
      dress: "Modest clothing required, remove shoes before entering halls",
    },
  },
  // Add more monastery details as needed
}

interface PageProps {
  params: {
    id: string
  }
}

export default function MonasteryDetailPage({ params }: PageProps) {
  const monastery = monasteryDetails[Number.parseInt(params.id) as keyof typeof monasteryDetails]

  if (!monastery) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/monasteries" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Monasteries</span>
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img
              src={monastery.image || "/placeholder.svg"}
              alt={monastery.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-6 left-6 text-white">
              <h1 className="text-4xl font-bold mb-2">{monastery.name}</h1>
              <div className="flex items-center space-x-4 text-lg">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  {monastery.location}
                </div>
                <div className="flex items-center">
                  <Mountain className="h-5 w-5 mr-1" />
                  {monastery.altitude}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button size="lg" className="flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Start Virtual Tour</span>
          </Button>
          <Button variant="outline" size="lg" className="flex items-center space-x-2 bg-transparent">
            <Map className="h-5 w-5" />
            <span>View on Map</span>
          </Button>
          <Button variant="outline" size="lg" className="flex items-center space-x-2 bg-transparent">
            <Share2 className="h-5 w-5" />
            <span>Share</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>About {monastery.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty mb-4">{monastery.longDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {monastery.highlights.map((highlight) => (
                    <Badge key={highlight} variant="secondary">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* History */}
            <Card>
              <CardHeader>
                <CardTitle>History & Heritage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">{monastery.history}</p>
              </CardContent>
            </Card>

            {/* Architecture */}
            <Card>
              <CardHeader>
                <CardTitle>Architecture & Art</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">{monastery.architecture}</p>
              </CardContent>
            </Card>

            {/* Spiritual Significance */}
            <Card>
              <CardHeader>
                <CardTitle>Spiritual Significance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty">{monastery.spiritualSignificance}</p>
              </CardContent>
            </Card>

            {/* Festivals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Festivals & Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monastery.festivals.map((festival, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{festival.name}</h4>
                        <Badge variant="outline">{festival.date}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">{festival.description}</p>
                      {index < monastery.festivals.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Established</span>
                  <span className="font-medium">{monastery.established}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Altitude</span>
                  <span className="font-medium">{monastery.altitude}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Accessibility</span>
                  <Badge variant={monastery.accessibility === "Easy" ? "secondary" : "default"}>
                    {monastery.accessibility}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Annual Visitors</span>
                  <span className="font-medium">{monastery.visitors}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Opening Hours</span>
                  <span className="font-medium">{monastery.openingHours}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Entry Fee</span>
                  <span className="font-medium">{monastery.entryFee}</span>
                </div>
              </CardContent>
            </Card>

            {/* Visit Planning */}
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Visit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Best Time to Visit</h4>
                  <p className="text-muted-foreground text-sm">{monastery.bestTimeToVisit}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {monastery.practicalInfo.facilities.map((facility) => (
                      <Badge key={facility} variant="outline" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium mb-2">Visitor Guidelines</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• {monastery.practicalInfo.dress}</li>
                    <li>• {monastery.practicalInfo.photography}</li>
                    <li>• {monastery.practicalInfo.parking}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Nearby Attractions */}
            <Card>
              <CardHeader>
                <CardTitle>Nearby Attractions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {monastery.nearbyAttractions.map((attraction) => (
                    <div key={attraction} className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{attraction}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
