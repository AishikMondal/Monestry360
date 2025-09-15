"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Calendar, Plus, Edit, Trash2, Users, MapPin } from "lucide-react"

interface EventsManagerProps {
  monasteryId: string
  events: any[]
}

export function EventsManager({ monasteryId, events }: EventsManagerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_type: "Festival",
    start_date: "",
    end_date: "",
    location: "",
    max_participants: "",
    registration_required: false,
    entry_fee: 0,
    contact_info: "",
  })

  const router = useRouter()
  const supabase = createClient()

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      event_type: "Festival",
      start_date: "",
      end_date: "",
      location: "",
      max_participants: "",
      registration_required: false,
      entry_fee: 0,
      contact_info: "",
    })
    setEditingEvent(null)
  }

  const handleEdit = (event: any) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description || "",
      event_type: event.event_type,
      start_date: new Date(event.start_date).toISOString().slice(0, 16),
      end_date: new Date(event.end_date).toISOString().slice(0, 16),
      location: event.location || "",
      max_participants: event.max_participants?.toString() || "",
      registration_required: event.registration_required,
      entry_fee: event.entry_fee || 0,
      contact_info: event.contact_info || "",
    })
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const eventData = {
        monastery_id: monasteryId,
        ...formData,
        start_date: new Date(formData.start_date).toISOString(),
        end_date: new Date(formData.end_date).toISOString(),
        max_participants: formData.max_participants ? Number.parseInt(formData.max_participants) : null,
        entry_fee: Number.parseFloat(formData.entry_fee.toString()),
      }

      if (editingEvent) {
        const { error } = await supabase.from("monastery_events").update(eventData).eq("id", editingEvent.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from("monastery_events").insert(eventData)
        if (error) throw error
      }

      setIsDialogOpen(false)
      resetForm()
      router.refresh()
    } catch (error) {
      console.error("Error saving event:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const { error } = await supabase.from("monastery_events").delete().eq("id", eventId)
      if (error) throw error
      router.refresh()
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  const getEventStatus = (event: any) => {
    const now = new Date()
    const startDate = new Date(event.start_date)
    const endDate = new Date(event.end_date)

    if (now < startDate) return { status: "upcoming", color: "bg-blue-100 text-blue-800" }
    if (now >= startDate && now <= endDate) return { status: "active", color: "bg-green-100 text-green-800" }
    return { status: "past", color: "bg-gray-100 text-gray-800" }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Events & Festivals
              </CardTitle>
              <CardDescription className="text-green-600">
                Manage your monastery's events, festivals, and ceremonies
              </CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    resetForm()
                    setIsDialogOpen(true)
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingEvent ? "Edit Event" : "Create New Event"}</DialogTitle>
                  <DialogDescription>
                    {editingEvent ? "Update your event details" : "Add a new event or festival to your calendar"}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Losar Festival"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="event_type">Event Type</Label>
                      <Select
                        value={formData.event_type}
                        onValueChange={(value) => setFormData({ ...formData, event_type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Festival">Festival</SelectItem>
                          <SelectItem value="Ceremony">Ceremony</SelectItem>
                          <SelectItem value="Teaching">Teaching</SelectItem>
                          <SelectItem value="Meditation">Meditation</SelectItem>
                          <SelectItem value="Cultural">Cultural</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      placeholder="Describe the event, its significance, and what visitors can expect..."
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="start_date">Start Date & Time</Label>
                      <Input
                        id="start_date"
                        type="datetime-local"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end_date">End Date & Time</Label>
                      <Input
                        id="end_date"
                        type="datetime-local"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Main hall, courtyard, etc."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max_participants">Max Participants</Label>
                      <Input
                        id="max_participants"
                        type="number"
                        value={formData.max_participants}
                        onChange={(e) => setFormData({ ...formData, max_participants: e.target.value })}
                        placeholder="Leave empty for unlimited"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="entry_fee">Entry Fee (₹)</Label>
                      <Input
                        id="entry_fee"
                        type="number"
                        step="0.01"
                        value={formData.entry_fee}
                        onChange={(e) => setFormData({ ...formData, entry_fee: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact_info">Contact Information</Label>
                      <Input
                        id="contact_info"
                        value={formData.contact_info}
                        onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                        placeholder="Phone or email for inquiries"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                      {isLoading ? "Saving..." : editingEvent ? "Update Event" : "Create Event"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-green-800 mb-2">No events yet</h3>
                <p className="text-green-600 mb-4">Create your first event to start engaging with visitors</p>
                <Button
                  onClick={() => {
                    resetForm()
                    setIsDialogOpen(true)
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Event
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {events.map((event) => {
                  const eventStatus = getEventStatus(event)
                  return (
                    <Card key={event.id} className="bg-green-50/50 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-green-800">{event.title}</h3>
                              <Badge className={eventStatus.color}>{eventStatus.status}</Badge>
                              <Badge variant="outline" className="text-green-700 border-green-300">
                                {event.event_type}
                              </Badge>
                            </div>
                            <p className="text-sm text-green-600 mb-2">{event.description}</p>
                            <div className="flex items-center gap-4 text-xs text-green-600">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(event.start_date).toLocaleDateString()} -{" "}
                                {new Date(event.end_date).toLocaleDateString()}
                              </span>
                              {event.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {event.location}
                                </span>
                              )}
                              {event.max_participants && (
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  Max {event.max_participants}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(event.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
