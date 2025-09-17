"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  User,
  Mail,
  Phone,
  Shield,
  Bell,
  Globe,
  ArrowLeft,
  Save,
  Edit
} from "lucide-react"

interface UserProfile {
  id: string
  email: string
  full_name: string
  user_type: "traveller" | "monastery"
  phone?: string
  emergency_contact?: string
}

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    emergency_contact: ''
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        router.push("/auth/login")
        return
      }

      setUser(session.user)
      
      // Get user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single()
      
      if (profileData) {
        setProfile(profileData)
        setFormData({
          full_name: profileData.full_name || '',
          phone: profileData.phone || '',
          emergency_contact: profileData.emergency_contact || ''
        })
      }
      
      setIsLoading(false)
    }

    getProfile()
  }, [supabase, router])

  const handleSave = async () => {
    if (!user || !profile) return
    
    setIsSaving(true)
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          emergency_contact: formData.emergency_contact
        })
        .eq("id", user.id)

      if (error) {
        alert("Error updating profile: " + error.message)
      } else {
        alert("Profile updated successfully!")
        // Update local state
        setProfile(prev => prev ? {
          ...prev,
          full_name: formData.full_name,
          phone: formData.phone,
          emergency_contact: formData.emergency_contact
        } : null)
      }
    } catch (error) {
      alert("Error updating profile")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
          <p className="text-muted-foreground mb-4">You need to be signed in to access settings.</p>
          <Button onClick={() => router.push("/auth/login")}>Sign In</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences and personal information</p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Personal Information */}
          <Card className="shadow-xl dark:shadow-2xl dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/80 dark:to-gray-700/80">
              <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    className="mt-2 bg-white dark:bg-gray-700/80 border-gray-300 dark:border-gray-600 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-gray-100 transition-all duration-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={user.email}
                    disabled
                    className="mt-2 bg-gray-50 dark:bg-gray-800"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-2"
                  />
                </div>
                
                <div>
                  <Label htmlFor="emergency_contact">Emergency Contact</Label>
                  <Input
                    id="emergency_contact"
                    type="tel"
                    value={formData.emergency_contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, emergency_contact: e.target.value }))}
                    placeholder="+91 XXXXX XXXXX"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500 hover:from-green-700 hover:to-blue-700 dark:hover:from-green-400 dark:hover:to-blue-400 text-white shadow-lg dark:shadow-green-500/20 hover:shadow-xl transition-all duration-200 hover:scale-105"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      full_name: profile.full_name || '',
                      phone: profile.phone || '',
                      emergency_contact: profile.emergency_contact || ''
                    })
                  }}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Travel Preferences */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Travel Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label>Preferred Budget Range</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md mt-2 bg-white dark:bg-gray-700">
                    <option>Budget (₹3K-4K per day)</option>
                    <option>Comfortable (₹6K-10K per day)</option>
                    <option>Luxury (₹10K+ per day)</option>
                  </select>
                </div>
                
                <div>
                  <Label>Preferred Group Size</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md mt-2 bg-white dark:bg-gray-700">
                    <option>Solo Travel</option>
                    <option>Small Group (2-4)</option>
                    <option>Large Group (5+)</option>
                  </select>
                </div>
                
                <div>
                  <Label>Fitness Level</Label>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md mt-2 bg-white dark:bg-gray-700">
                    <option>Relaxed</option>
                    <option>Moderate</option>
                    <option>Active</option>
                  </select>
                </div>
                
                <div>
                  <Label>Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Photography', 'Meditation', 'Culture', 'Nature', 'Architecture'].map((interest) => (
                      <Button key={interest} variant="outline" size="sm" className="text-xs">
                        {interest}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Trip Reminders</h4>
                  <p className="text-sm text-muted-foreground">Get notified before your planned trips</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">New Monastery Updates</h4>
                  <p className="text-sm text-muted-foreground">Receive updates when new monasteries are added</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Festival Notifications</h4>
                  <p className="text-sm text-muted-foreground">Get notified about upcoming monastery festivals</p>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Profile Visibility</h4>
                  <p className="text-sm text-muted-foreground">Make your profile visible to other travelers</p>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Share Travel History</h4>
                  <p className="text-sm text-muted-foreground">Allow others to see your visited monasteries</p>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
              
              <div className="pt-4 border-t">
                <Button variant="destructive" className="w-full md:w-auto">
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}