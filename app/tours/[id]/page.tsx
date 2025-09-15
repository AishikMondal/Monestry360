"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Volume2,
  VolumeX,
  ArrowLeft,
  Info,
  Map,
  Share2,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Eye,
  Compass,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock tour data
const tourData = {
  1: {
    id: 1,
    name: "Rumtek Monastery Complete Tour",
    monastery: "Rumtek Monastery",
    location: "East Sikkim",
    description: "Experience the grandeur of Sikkim's largest monastery through our comprehensive virtual tour.",
    duration: "25 minutes",
    scenes: [
      {
        id: 1,
        name: "Monastery Entrance",
        description: "Welcome to the grand entrance of Rumtek Monastery",
        image: "/rumtek-monastery-golden-roof-with-mountains.jpg",
        hotspots: [
          { x: 30, y: 40, title: "Prayer Wheels", description: "Traditional Tibetan prayer wheels" },
          { x: 70, y: 60, title: "Main Gate", description: "Ornate entrance gate" },
        ],
      },
      {
        id: 2,
        name: "Main Prayer Hall",
        description: "The heart of spiritual practice at Rumtek",
        image: "/placeholder.svg?key=prayer-hall",
        hotspots: [
          { x: 50, y: 30, title: "Buddha Statue", description: "Magnificent golden Buddha statue" },
          { x: 20, y: 70, title: "Thangka Paintings", description: "Sacred Tibetan art" },
        ],
      },
      {
        id: 3,
        name: "Golden Stupa",
        description: "Sacred reliquary containing precious artifacts",
        image: "/placeholder.svg?key=golden-stupa",
        hotspots: [{ x: 50, y: 50, title: "Golden Stupa", description: "Contains relics of the 16th Karmapa" }],
      },
    ],
    audioGuide: true,
    narrator: "Lama Tenzin",
    languages: ["English", "Hindi", "Nepali", "Tibetan"],
    rating: 4.8,
    views: "15,420",
  },
}

interface PageProps {
  params: {
    id: string
  }
}

export default function VirtualTourPage({ params }: PageProps) {
  const tour = tourData[Number.parseInt(params.id) as keyof typeof tourData]
  const [currentScene, setCurrentScene] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showHotspots, setShowHotspots] = useState(true)
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null)

  if (!tour) {
    notFound()
  }

  // Simulate progress
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const currentSceneData = tour.scenes[currentScene]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/tours" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Tours</span>
            </Link>
          </Button>
        </div>

        {/* Tour Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{tour.name}</h1>
          <p className="text-muted-foreground">
            {tour.monastery} • {tour.location}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Tour Viewer */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-black">
                {/* 360° Viewer Simulation */}
                <div className="relative w-full h-full">
                  <img
                    src={currentSceneData.image || "/placeholder.svg"}
                    alt={currentSceneData.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Hotspots */}
                  {showHotspots &&
                    currentSceneData.hotspots.map((hotspot, index) => (
                      <div
                        key={index}
                        className="absolute w-6 h-6 bg-accent rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform animate-pulse"
                        style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                        onClick={() => setSelectedHotspot(hotspot)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Info className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    ))}

                  {/* Scene Navigation */}
                  {currentScene > 0 && (
                    <Button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2"
                      size="sm"
                      onClick={() => setCurrentScene(currentScene - 1)}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                  )}

                  {currentScene < tour.scenes.length - 1 && (
                    <Button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                      size="sm"
                      onClick={() => setCurrentScene(currentScene + 1)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}

                  {/* 360° Indicator */}
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded text-sm flex items-center space-x-2">
                    <Compass className="h-4 w-4" />
                    <span>360° View</span>
                  </div>

                  {/* Scene Info */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white p-3 rounded max-w-sm">
                    <h3 className="font-semibold mb-1">{currentSceneData.name}</h3>
                    <p className="text-sm opacity-90">{currentSceneData.description}</p>
                  </div>
                </div>

                {/* Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:bg-white/20"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setProgress(0)}
                        className="text-white hover:bg-white/20"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-white hover:bg-white/20"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setShowHotspots(!showHotspots)}
                        className="text-white hover:bg-white/20"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setIsFullscreen(!isFullscreen)}
                        className="text-white hover:bg-white/20"
                      >
                        <Maximize className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <Progress value={progress} className="h-1" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Scene Navigation */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>
                  Tour Scenes ({currentScene + 1} of {tour.scenes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {tour.scenes.map((scene, index) => (
                    <div
                      key={scene.id}
                      className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentScene ? "border-primary" : "border-transparent hover:border-muted-foreground"
                      }`}
                      onClick={() => setCurrentScene(index)}
                    >
                      <img
                        src={scene.image || "/placeholder.svg"}
                        alt={scene.name}
                        className="w-full h-20 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white text-sm font-medium text-center px-2">{scene.name}</span>
                      </div>
                      {index === currentScene && (
                        <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tour Info */}
            <Card>
              <CardHeader>
                <CardTitle>Tour Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Scenes</span>
                  <span className="font-medium">{tour.scenes.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium">{tour.rating}/5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">{tour.views}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Audio Guide</span>
                  <Badge variant="secondary">Available</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Narrator</span>
                  <span className="font-medium">{tour.narrator}</span>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle>Available Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tour.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-transparent" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Tour
                </Button>
                <Button className="w-full bg-transparent" variant="outline">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save for Later
                </Button>
                <Button asChild className="w-full bg-transparent" variant="outline">
                  <Link href={`/monasteries/${tour.id}`}>
                    <Map className="h-4 w-4 mr-2" />
                    View Monastery Details
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Hotspot Info */}
            {selectedHotspot && (
              <Card>
                <CardHeader>
                  <CardTitle>{selectedHotspot.title}</CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedHotspot(null)}
                    className="absolute top-2 right-2"
                  >
                    ×
                  </Button>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{selectedHotspot.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
