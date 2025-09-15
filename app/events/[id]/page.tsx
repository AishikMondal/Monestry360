"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Calendar, MapPin, ArrowLeft, Share2, Bookmark, Ticket, Info, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock event details
const eventDetails = {
  1: {
    id: 1,
    name: "Losar - Tibetan New Year",
    monastery: "Rumtek Monastery",
    monasteryId: 1,
    location: "East Sikkim",
    date: "2024-02-10",
    endDate: "2024-02-12",
    time: "6:00 AM - 8:00 PM",
    description:
      "Celebrate the Tibetan New Year with traditional ceremonies, masked dances, and cultural performances.",
    longDescription:
      "Losar is the most important festival in the Tibetan calendar, marking the beginning of the new year. The celebration at Rumtek Monastery features elaborate ceremonies, traditional Cham dances, butter sculptures, and community feasts. Visitors can witness ancient rituals, participate in prayer ceremonies, and experience the vibrant Tibetan culture. The three-day celebration includes morning prayers, afternoon cultural performances, and evening community gatherings.",
    image: "/placeholder.svg?key=losar-detail",
    gallery: [
      "/placeholder.svg?key=losar1",
      "/placeholder.svg?key=losar2",
      "/placeholder.svg?key=losar3",
      "/placeholder.svg?key=losar4",
    ],
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
    schedule: [
      {
        day: "Day 1 - February 10",
        events: [
          { time: "6:00 AM", activity: "Morning Prayers & Rituals" },
          { time: "10:00 AM", activity: "Traditional Cham Dance Performance" },
          { time: "2:00 PM", activity: "Butter Sculpture Exhibition" },
          { time: "6:00 PM", activity: "Community Feast" },
        ],
      },
      {
        day: "Day 2 - February 11",
        events: [
          { time: "6:00 AM", activity: "Sunrise Meditation" },
          { time: "9:00 AM", activity: "Cultural Performances" },
          { time: "1:00 PM", activity: "Traditional Games & Activities" },
          { time: "7:00 PM", activity: "Evening Prayers" },
        ],
      },
      {
        day: "Day 3 - February 12",
        events: [
          { time: "6:00 AM", activity: "Final Blessing Ceremony" },
          { time: "11:00 AM", activity: "Closing Rituals" },
          { time: "3:00 PM", activity: "Community Celebration" },
        ],
      },
    ],
    facilities: ["Parking Available", "Food Stalls", "Rest Areas", "First Aid", "Photography Zones"],
    contact: {
      phone: "+91-3592-252102",
      email: "events@rumtek.org",
      website: "www.rumtek.org",
    },
  },
}

interface PageProps {
  params: {
    id: string
  }
}

export default function EventDetailPage({ params }: PageProps) {
  const event = eventDetails[Number.parseInt(params.id) as keyof typeof eventDetails]
  const [isRegistered, setIsRegistered] = useState(false)

  if (!event) {
    notFound()
  }

  const registrationProgress = (event.registered / event.capacity) * 100
  const isEventFull = event.registered >= event.capacity
  const eventDate = new Date(event.date)
  const isUpcoming = eventDate > new Date()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="mb-4">
            <Link href="/events" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Events</span>
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <img src={event.image || "/placeholder.svg"} alt={event.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-6 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className="bg-accent text-accent-foreground">{event.category}</Badge>
                {event.featured && <Badge className="bg-primary text-primary-foreground">Featured Event</Badge>}
              </div>
              <h1 className="text-4xl font-bold mb-2">{event.name}</h1>
              <div className="flex items-center space-x-4 text-lg">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-1" />
                  {event.monastery}, {event.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-1" />
                  {eventDate.toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Registration Status */}
            {isUpcoming && (
              <Card className={`border-2 ${isEventFull ? "border-destructive" : "border-primary"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {isEventFull ? (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                      <span className="font-semibold">{isEventFull ? "Event Full" : "Registration Open"}</span>
                    </div>
                    <Badge variant={event.price === "Free" ? "secondary" : "default"}>{event.price}</Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>
                        Registered: {event.registered}/{event.capacity}
                      </span>
                      <span>{Math.round(registrationProgress)}% Full</span>
                    </div>
                    <Progress value={registrationProgress} />
                  </div>

                  <div className="flex space-x-3">
                    <Button
                      className="flex-1"
                      disabled={isEventFull || isRegistered}
                      onClick={() => setIsRegistered(true)}
                    >
                      <Ticket className="h-4 w-4 mr-2" />
                      {isRegistered ? "Registered" : isEventFull ? "Event Full" : "Register Now"}
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* About */}
            <Card>
              <CardHeader>
                <CardTitle>About This Event</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-pretty mb-4">{event.longDescription}</p>
                <div className="flex flex-wrap gap-2">
                  {event.highlights.map((highlight) => (
                    <Badge key={highlight} variant="secondary">
                      {highlight}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Schedule */}
            <Card>
              <CardHeader>
                <CardTitle>Event Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {event.schedule.map((day, dayIndex) => (
                    <div key={dayIndex}>
                      <h4 className="font-semibold text-lg mb-3">{day.day}</h4>
                      <div className="space-y-3">
                        {day.events.map((eventItem, eventIndex) => (
                          <div key={eventIndex} className="flex items-start space-x-4">
                            <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium min-w-[80px] text-center">
                              {eventItem.time}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{eventItem.activity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {dayIndex < event.schedule.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>Important Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Requirements & Guidelines</h4>
                    <ul className="text-muted-foreground text-sm space-y-1">
                      {event.requirements.map((requirement, index) => (
                        <li key={index}>• {requirement}</li>
                      ))}
                    </ul>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">Available Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.facilities.map((facility) => (
                        <Badge key={facility} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{eventDate.toLocaleDateString()}</span>
                </div>
                {event.endDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">End Date</span>
                    <span className="font-medium">{new Date(event.endDate).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{event.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">{event.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <Badge variant="outline">{event.type}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Organizer</span>
                  <span className="font-medium text-sm">{event.organizer}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-muted-foreground text-sm">Phone</span>
                  <p className="font-medium">{event.contact.phone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Email</span>
                  <p className="font-medium">{event.contact.email}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-sm">Website</span>
                  <p className="font-medium text-primary">{event.contact.website}</p>
                </div>
              </CardContent>
            </Card>

            {/* Related */}
            <Card>
              <CardHeader>
                <CardTitle>Related</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href={`/monasteries/${event.monasteryId}`}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Visit {event.monastery}
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/map">
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                  <Link href="/events">
                    <Calendar className="h-4 w-4 mr-2" />
                    More Events
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
