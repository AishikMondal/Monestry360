import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users } from "lucide-react"
import Link from "next/link"

const featuredMonasteries = [
  {
    id: 1,
    name: "Rumtek Monastery",
    location: "East Sikkim",
    description: "The largest monastery in Sikkim, known as the Dharma Chakra Centre.",
    image: "/rumtek-monastery-golden-roof-with-mountains.jpg",
    established: "1966",
    visitors: "50,000+ annually",
    highlights: ["Golden Stupa", "Tibetan Art", "Prayer Wheels"],
  },
  {
    id: 2,
    name: "Pemayangtse Monastery",
    location: "West Sikkim",
    description: "One of the oldest monasteries in Sikkim with stunning mountain views.",
    image: "/pemayangtse-monastery-white-walls-mountain-backdro.jpg",
    established: "1705",
    visitors: "30,000+ annually",
    highlights: ["Ancient Murals", "Wooden Sculptures", "Kanchenjunga Views"],
  },
  {
    id: 3,
    name: "Enchey Monastery",
    location: "East Sikkim",
    description: "A 200-year-old monastery famous for its annual Cham dance.",
    image: "/enchey-monastery-colorful-prayer-flags-traditional.jpg",
    established: "1840",
    visitors: "25,000+ annually",
    highlights: ["Cham Dance", "Prayer Flags", "City Views"],
  },
]

export function FeaturedMonasteries() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Featured Sacred Sites</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Begin your spiritual journey with these magnificent monasteries, each offering unique insights into Sikkim's
            rich Buddhist heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredMonasteries.map((monastery) => (
            <Card key={monastery.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={monastery.image || "/placeholder.svg"}
                  alt={monastery.name}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured</Badge>
              </div>

              <CardHeader>
                <CardTitle className="text-xl">{monastery.name}</CardTitle>
                <CardDescription className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {monastery.location}
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
                    <Badge key={highlight} variant="secondary" className="text-xs">
                      {highlight}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full">
                  <Link href={`/monasteries/${monastery.id}`}>Explore Virtual Tour</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/monasteries">View All 200+ Monasteries</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
