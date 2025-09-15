import { Button } from "@/components/ui/button"
import { Play, Map, Calendar } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/majestic-sikkim-monastery-on-mountain-with-prayer-.jpg"
          alt="Majestic Sikkim Monastery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
          Journey into the Heart of <span className="text-accent">Sikkim's Spiritual Heritage</span>
        </h1>

        <p className="text-xl sm:text-2xl mb-8 text-pretty opacity-90 max-w-3xl mx-auto">
          Discover over 200 sacred monasteries through immersive virtual tours, explore centuries-old cultural
          treasures, and plan your spiritual journey through the mystical landscapes of Sikkim.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/monasteries" className="flex items-center space-x-2">
              <Play className="h-5 w-5" />
              <span>Start Virtual Tour</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Link href="/map" className="flex items-center space-x-2">
              <Map className="h-5 w-5" />
              <span>Explore Map</span>
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Link href="/events" className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>View Events</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
