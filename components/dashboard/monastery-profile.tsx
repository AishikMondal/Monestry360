"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Mountain } from "lucide-react"

interface MonasteryProfileProps {
  monastery: any
  profile: any
}

export function MonasteryProfile({ monastery, profile }: MonasteryProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    monastery_name: monastery?.monastery_name || "",
    district: monastery?.district || "East Sikkim",
    address: monastery?.address || "",
    description: monastery?.description || "",
    history: monastery?.history || "",
    founded_year: monastery?.founded_year || "",
    monastery_type: monastery?.monastery_type || "Nyingma",
    architecture_style: monastery?.architecture_style || "",
    visiting_hours: monastery?.visiting_hours || "",
    entry_fee: monastery?.entry_fee || 0,
    accessibility_level: monastery?.accessibility_level || "Moderate",
    contact_phone: monastery?.contact_phone || "",
    website_url: monastery?.website_url || "",
    latitude: monastery?.latitude || "",
    longitude: monastery?.longitude || "",
  })

  const router = useRouter()
  const supabase = createClient()

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.from("monasteries").upsert({
        id: profile.id,
        ...formData,
        founded_year: formData.founded_year ? Number.parseInt(formData.founded_year) : null,
        entry_fee: Number.parseFloat(formData.entry_fee.toString()),
        latitude: formData.latitude ? Number.parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? Number.parseFloat(formData.longitude) : null,
      })

      if (error) throw error

      setIsEditing(false)
      router.refresh()
    } catch (error) {
      console.error("Error updating monastery:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur border-green-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-green-800 flex items-center gap-2">
                <Mountain className="h-5 w-5" />
                Monastery Profile
              </CardTitle>
              <CardDescription className="text-green-600">
                Manage your monastery's information and visibility
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={monastery?.is_verified ? "default" : "secondary"} className="bg-green-100 text-green-800">
                {monastery?.is_verified ? "Verified" : "Pending Verification"}
              </Badge>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}
                className="bg-green-600 hover:bg-green-700"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="monastery_name" className="text-green-700">
                Monastery Name
              </Label>
              <Input
                id="monastery_name"
                value={formData.monastery_name}
                onChange={(e) => setFormData({ ...formData, monastery_name: e.target.value })}
                disabled={!isEditing}
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="district" className="text-green-700">
                District
              </Label>
              <Select
                value={formData.district}
                onValueChange={(value) => setFormData({ ...formData, district: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="North Sikkim">North Sikkim</SelectItem>
                  <SelectItem value="South Sikkim">South Sikkim</SelectItem>
                  <SelectItem value="East Sikkim">East Sikkim</SelectItem>
                  <SelectItem value="West Sikkim">West Sikkim</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-green-700">
              Address
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={!isEditing}
              className="border-green-200 focus:border-green-500"
              rows={3}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="founded_year" className="text-green-700">
                Founded Year
              </Label>
              <Input
                id="founded_year"
                type="number"
                value={formData.founded_year}
                onChange={(e) => setFormData({ ...formData, founded_year: e.target.value })}
                disabled={!isEditing}
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monastery_type" className="text-green-700">
                Monastery Type
              </Label>
              <Select
                value={formData.monastery_type}
                onValueChange={(value) => setFormData({ ...formData, monastery_type: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nyingma">Nyingma</SelectItem>
                  <SelectItem value="Kagyu">Kagyu</SelectItem>
                  <SelectItem value="Gelug">Gelug</SelectItem>
                  <SelectItem value="Sakya">Sakya</SelectItem>
                  <SelectItem value="Bon">Bon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="accessibility_level" className="text-green-700">
                Accessibility Level
              </Label>
              <Select
                value={formData.accessibility_level}
                onValueChange={(value) => setFormData({ ...formData, accessibility_level: value })}
                disabled={!isEditing}
              >
                <SelectTrigger className="border-green-200 focus:border-green-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Difficult">Difficult</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-green-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={!isEditing}
              className="border-green-200 focus:border-green-500"
              rows={4}
              placeholder="Describe your monastery, its significance, and what visitors can expect..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="history" className="text-green-700">
              History
            </Label>
            <Textarea
              id="history"
              value={formData.history}
              onChange={(e) => setFormData({ ...formData, history: e.target.value })}
              disabled={!isEditing}
              className="border-green-200 focus:border-green-500"
              rows={4}
              placeholder="Share the historical background and important events..."
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="visiting_hours" className="text-green-700">
                Visiting Hours
              </Label>
              <Input
                id="visiting_hours"
                value={formData.visiting_hours}
                onChange={(e) => setFormData({ ...formData, visiting_hours: e.target.value })}
                disabled={!isEditing}
                className="border-green-200 focus:border-green-500"
                placeholder="e.g., 6:00 AM - 6:00 PM"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry_fee" className="text-green-700">
                Entry Fee (₹)
              </Label>
              <Input
                id="entry_fee"
                type="number"
                step="0.01"
                value={formData.entry_fee}
                onChange={(e) => setFormData({ ...formData, entry_fee: e.target.value })}
                disabled={!isEditing}
                className="border-green-200 focus:border-green-500"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contact_phone" className="text-green-700">
                Contact Phone
              </Label>
              <Input
                id="contact_phone"
                value={formData.contact_phone}
                onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                disabled={!isEditing}
                className="border-green-200 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website_url" className="text-green-700">
                Website URL
              </Label>
              <Input
                id="website_url"
                value={formData.website_url}
                onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                disabled={!isEditing}
                className="border-green-200 focus:border-green-500"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="latitude" className="text-green-700">
                Latitude
              </Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                disabled={!isEditing}
                className="border-green-200 focus:border-green-500"
                placeholder="27.3389"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude" className="text-green-700">
                Longitude
              </Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                disabled={!isEditing}
                className="border-green-200 focus:border-green-500"
                placeholder="88.6065"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end space-x-2 pt-4 border-t border-green-200">
              <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading} className="bg-green-600 hover:bg-green-700">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
