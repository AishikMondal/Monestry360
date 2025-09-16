"use client"

import React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [userType, setUserType] = useState<"traveller" | "monastery">("traveller")

  // Traveller fields
  const [ageGroup, setAgeGroup] = useState("adult")
  const [travelStyle, setTravelStyle] = useState("solo")

  // Monastery fields
  const [monasteryName, setMonasteryName] = useState("")
  const [district, setDistrict] = useState("East Sikkim")
  const [address, setAddress] = useState("")

  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (userType === "monastery" && (!monasteryName || !address)) {
      setError("Please fill in all monastery details")
      setIsLoading(false)
      return
    }

    try {
      const metadata: any = {
        full_name: fullName,
        user_type: userType,
      }

      if (userType === "traveller") {
        metadata.age_group = ageGroup
        metadata.travel_style = travelStyle
      } else {
        metadata.monastery_name = monasteryName
        metadata.district = district
        metadata.address = address
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard/${userType}`,
          data: metadata,
        },
      })

      if (error) {
        console.error("Supabase signup error:", error)
        throw error
      }
      router.push("/auth/signup-success")
    } catch (error: any) {
      console.error("Signup error:", error)
      if (error?.message?.includes("User already registered")) {
        setError("An account with this email already exists. Please sign in instead.")
      } else if (error?.message?.includes("Password should be")) {
        setError("Password should be at least 6 characters long.")
      } else {
        setError(error?.message || "An error occurred during signup. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="w-full max-w-lg">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-green-800">Join Monastery360</CardTitle>
            <CardDescription className="text-green-600">
              Create your account to explore Sikkim's spiritual heritage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-green-700">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userType" className="text-green-700">
                    I am a
                  </Label>
                  <Select value={userType} onValueChange={(value: "traveller" | "monastery") => setUserType(value)}>
                    <SelectTrigger className="border-green-200 focus:border-green-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="traveller">Traveller</SelectItem>
                      <SelectItem value="monastery">Monastery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-green-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-green-200 focus:border-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-green-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-green-700">
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-green-200 focus:border-green-500"
                  />
                </div>
              </div>

              {userType === "traveller" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ageGroup" className="text-green-700">
                      Age Group
                    </Label>
                    <Select value={ageGroup} onValueChange={setAgeGroup}>
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="adult">Adult</SelectItem>
                        <SelectItem value="senior">Senior</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="travelStyle" className="text-green-700">
                      Travel Style
                    </Label>
                    <Select value={travelStyle} onValueChange={setTravelStyle}>
                      <SelectTrigger className="border-green-200 focus:border-green-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solo">Solo</SelectItem>
                        <SelectItem value="family">Family</SelectItem>
                        <SelectItem value="group">Group</SelectItem>
                        <SelectItem value="couple">Couple</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {userType === "monastery" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="monasteryName" className="text-green-700">
                      Monastery Name
                    </Label>
                    <Input
                      id="monasteryName"
                      type="text"
                      required
                      value={monasteryName}
                      onChange={(e) => setMonasteryName(e.target.value)}
                      className="border-green-200 focus:border-green-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district" className="text-green-700">
                      District
                    </Label>
                    <Select value={district} onValueChange={setDistrict}>
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
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-green-700">
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="border-green-200 focus:border-green-500"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
              )}

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-green-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="font-medium text-green-700 hover:text-green-800 underline">
                Sign in
              </Link>
            </div>

            <div className="mt-4 text-center">
              <Link 
                href="/simple-working-map" 
                className="text-sm font-medium text-blue-600 hover:text-blue-800 underline"
              >
                🗺️ View Test Map
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
