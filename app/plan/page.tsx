"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Clock, Users, Route, Hotel, Car, Plane, Train, Mountain, Star, Download, Share2 } from "lucide-react"

// Mock data for travel planning
const monasteries = [
  { id: 1, name: "Rumtek Monastery", location: "East Sikkim", duration: "3-4 hours", difficulty: "Easy" },
  { id: 2, name: "Pemayangtse Monastery", location: "West Sikkim", duration: "2-3 hours", difficulty: "Moderate" },
  { id: 3, name: "Enchey Monastery", location: "East Sikkim", duration: "1-2 hours", difficulty: "Easy" },
  { id: 4, name: "Tashiding Monastery", location: "West Sikkim", duration: "2-3 hours", difficulty: "Moderate" },
]

const accommodations = [
  { id: 1, name: "Hotel Tibet", location: "Gangtok", price: "₹3,500/night", rating: 4.2, type: "Hotel" },
  { id: 2, name: "Monastery Guest House", location: "Rumtek", price: "₹1,200/night", rating: 4.0, type: "Guest House" },
  { id: 3, name: "Mountain View Resort", location: "Pelling", price: "₹4,200/night", rating: 4.5, type: "Resort" },
  { id: 4, name: "Budget Inn", location: "Gangtok", price: "₹800/night", rating: 3.8, type: "Budget" },
]

const transportOptions = [
  { id: 1, type: "Flight", from: "Delhi", to: "Bagdogra", duration: "2h 30m", price: "₹8,500" },
  { id: 2, type: "Train", from: "Delhi", to: "New Jalpaiguri", duration: "18h", price: "₹2,200" },
  { id: 3, type: "Car Rental", location: "Gangtok", duration: "Per day", price: "₹2,500" },
  { id: 4, type: "Taxi", from: "Bagdogra", to: "Gangtok", duration: "4h", price: "₹3,000" },
]

export default function TravelPlannerPage() {
  const [selectedMonasteries, setSelectedMonasteries] = useState<number[]>([])
  const [tripDuration, setTripDuration] = useState("3")
  const [travelers, setTravelers] = useState("2")
  const [budget, setBudget] = useState("medium")
  const [interests, setInterests] = useState<string[]>([])
  const [startDate, setStartDate] = useState("")
  const [accommodation, setAccommodation] = useState("")
  const [transport, setTransport] = useState("")

  const handleMonasteryToggle = (monasteryId: number) => {
    setSelectedMonasteries((prev) =>
      prev.includes(monasteryId) ? prev.filter((id) => id !== monasteryId) : [...prev, monasteryId],
    )
  }

  const handleInterestToggle = (interest: string) => {
    setInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const generateItinerary = () => {
    // Mock itinerary generation logic
    console.log("Generating itinerary with:", {
      monasteries: selectedMonasteries,
      duration: tripDuration,
      travelers,
      budget,
      interests,
      startDate,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Plan Your Spiritual Journey</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Create a personalized itinerary for your monastery visits in Sikkim. Get recommendations for accommodations,
            transportation, and the perfect spiritual experience.
          </p>
        </div>

        <Tabs defaultValue="planner" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="planner">Trip Planner</TabsTrigger>
            <TabsTrigger value="itinerary">My Itinerary</TabsTrigger>
            <TabsTrigger value="accommodations">Stay</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
          </TabsList>

          {/* Trip Planner Tab */}
          <TabsContent value="planner" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Planning Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Trip Details</CardTitle>
                    <CardDescription>Tell us about your planned visit</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                          id="start-date"
                          type="date"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration (days)</Label>
                        <Select value={tripDuration} onValueChange={setTripDuration}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Day</SelectItem>
                            <SelectItem value="2">2 Days</SelectItem>
                            <SelectItem value="3">3 Days</SelectItem>
                            <SelectItem value="4">4 Days</SelectItem>
                            <SelectItem value="5">5 Days</SelectItem>
                            <SelectItem value="7">1 Week</SelectItem>
                            <SelectItem value="14">2 Weeks</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="travelers">Number of Travelers</Label>
                        <Select value={travelers} onValueChange={setTravelers}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select travelers" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Person</SelectItem>
                            <SelectItem value="2">2 People</SelectItem>
                            <SelectItem value="3">3 People</SelectItem>
                            <SelectItem value="4">4 People</SelectItem>
                            <SelectItem value="5+">5+ People</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select value={budget} onValueChange={setBudget}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Budget (₹1,000-3,000/day)</SelectItem>
                            <SelectItem value="medium">Moderate (₹3,000-7,000/day)</SelectItem>
                            <SelectItem value="high">Luxury (₹7,000+/day)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Monastery Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Monasteries to Visit</CardTitle>
                    <CardDescription>Choose the monasteries you'd like to include in your journey</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {monasteries.map((monastery) => (
                        <div
                          key={monastery.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50"
                        >
                          <Checkbox
                            id={`monastery-${monastery.id}`}
                            checked={selectedMonasteries.includes(monastery.id)}
                            onCheckedChange={() => handleMonasteryToggle(monastery.id)}
                          />
                          <div className="flex-1">
                            <Label htmlFor={`monastery-${monastery.id}`} className="font-medium cursor-pointer">
                              {monastery.name}
                            </Label>
                            <div className="text-sm text-muted-foreground">
                              {monastery.location} • {monastery.duration} • {monastery.difficulty}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Interests */}
                <Card>
                  <CardHeader>
                    <CardTitle>Your Interests</CardTitle>
                    <CardDescription>What aspects of monastery visits interest you most?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        "Meditation",
                        "Architecture",
                        "History",
                        "Photography",
                        "Cultural Events",
                        "Spiritual Learning",
                        "Art & Murals",
                        "Traditional Music",
                        "Local Cuisine",
                      ].map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={`interest-${interest}`}
                            checked={interests.includes(interest)}
                            onCheckedChange={() => handleInterestToggle(interest)}
                          />
                          <Label htmlFor={`interest-${interest}`} className="text-sm cursor-pointer">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Generate Button */}
                <Button onClick={generateItinerary} size="lg" className="w-full">
                  <Route className="h-5 w-5 mr-2" />
                  Generate My Itinerary
                </Button>
              </div>

              {/* Planning Summary */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Trip Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-medium">{tripDuration} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Travelers</span>
                      <span className="font-medium">{travelers} people</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Monasteries</span>
                      <span className="font-medium">{selectedMonasteries.length} selected</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Budget</span>
                      <Badge variant="outline">
                        {budget === "low" ? "Budget" : budget === "medium" ? "Moderate" : "Luxury"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Tips</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Mountain className="h-4 w-4 text-primary mt-1" />
                      <p className="text-sm">Best time to visit: March-June, September-December</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Clock className="h-4 w-4 text-primary mt-1" />
                      <p className="text-sm">Most monasteries open from 6 AM to 6 PM</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Users className="h-4 w-4 text-primary mt-1" />
                      <p className="text-sm">Dress modestly and remove shoes before entering halls</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Your Spiritual Journey Itinerary</CardTitle>
                    <CardDescription>3-day monastery tour in Sikkim</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Day 1 */}
                  <div className="border-l-4 border-primary pl-6">
                    <h3 className="text-lg font-semibold mb-3">Day 1 - East Sikkim Exploration</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium min-w-[80px] text-center">
                          9:00 AM
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Rumtek Monastery Visit</h4>
                          <p className="text-muted-foreground text-sm">
                            Explore the largest monastery in Sikkim, witness morning prayers
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              3-4 hours
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Easy access
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-medium min-w-[80px] text-center">
                          2:00 PM
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Lunch at Local Restaurant</h4>
                          <p className="text-muted-foreground text-sm">Traditional Sikkimese cuisine near Rumtek</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium min-w-[80px] text-center">
                          4:00 PM
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Enchey Monastery</h4>
                          <p className="text-muted-foreground text-sm">
                            Visit the 200-year-old monastery with city views
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              1-2 hours
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Easy access
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Day 2 */}
                  <div className="border-l-4 border-secondary pl-6">
                    <h3 className="text-lg font-semibold mb-3">Day 2 - West Sikkim Journey</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium min-w-[80px] text-center">
                          8:00 AM
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Travel to Pelling</h4>
                          <p className="text-muted-foreground text-sm">
                            Scenic drive through mountain roads (3-4 hours)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium min-w-[80px] text-center">
                          1:00 PM
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Pemayangtse Monastery</h4>
                          <p className="text-muted-foreground text-sm">
                            Explore one of Sikkim's oldest monasteries with Kanchenjunga views
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              2-3 hours
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Moderate access
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Day 3 */}
                  <div className="border-l-4 border-accent pl-6">
                    <h3 className="text-lg font-semibold mb-3">Day 3 - Sacred Sites & Departure</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium min-w-[80px] text-center">
                          9:00 AM
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Tashiding Monastery</h4>
                          <p className="text-muted-foreground text-sm">
                            Visit the sacred hilltop monastery with valley views
                          </p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              2-3 hours
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Moderate access
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4">
                        <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded text-sm font-medium min-w-[80px] text-center">
                          2:00 PM
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">Return Journey</h4>
                          <p className="text-muted-foreground text-sm">Travel back to Gangtok or departure point</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accommodations Tab */}
          <TabsContent value="accommodations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodations.map((hotel) => (
                <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{hotel.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {hotel.location}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{hotel.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{hotel.rating}</span>
                      </div>
                      <span className="font-semibold text-primary">{hotel.price}</span>
                    </div>
                    <Button className="w-full">
                      <Hotel className="h-4 w-4 mr-2" />
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transport Tab */}
          <TabsContent value="transport" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {transportOptions.map((option) => (
                <Card key={option.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      {option.type === "Flight" && <Plane className="h-5 w-5 text-primary" />}
                      {option.type === "Train" && <Train className="h-5 w-5 text-primary" />}
                      {option.type === "Car Rental" && <Car className="h-5 w-5 text-primary" />}
                      {option.type === "Taxi" && <Car className="h-5 w-5 text-primary" />}
                      <CardTitle className="text-lg">{option.type}</CardTitle>
                    </div>
                    <CardDescription>
                      {option.from && option.to ? `${option.from} to ${option.to}` : option.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{option.duration}</span>
                      </div>
                      <span className="font-semibold text-primary">{option.price}</span>
                    </div>
                    <Button className="w-full">Book {option.type}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
