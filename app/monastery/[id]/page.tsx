"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Navigation } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Clock,
  Phone,
  Globe,
  Calendar,
  Star,
  Route,
  Camera,
  Heart,
  ArrowLeft,
  Mountain,
  Users,
  DollarSign
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import VirtualTourModal to avoid SSR issues
const VirtualTourModal = dynamic(() => import('@/components/VirtualTourModal'), {
  ssr: false
})

interface Monastery {
  id: string
  monastery_name: string
  district: string
  address: string
  latitude: number
  longitude: number
  description?: string
  founded_year?: number
  monastery_type?: string
  visiting_hours?: string
  entry_fee?: number
  contact_phone?: string
  website?: string
  image_url?: string
  history?: string
  architecture?: string
  festivals?: string
  significance?: string
}

export default function MonasteryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [monastery, setMonastery] = useState<Monastery | null>(null)
  const [loading, setLoading] = useState(true)
  const [showVirtualTour, setShowVirtualTour] = useState(false)
  const [imageError, setImageError] = useState(false)
  const monasteryId = params.id as string

  useEffect(() => {
    fetchMonasteryDetails()
  }, [monasteryId])

  const fetchMonasteryDetails = async () => {
    // Define sample data at the top level so it's accessible everywhere
    const sampleData: Record<string, Monastery> = {
          '1': {
            id: '1',
            monastery_name: 'Rumtek Monastery',
            district: 'East Sikkim',
            address: 'Rumtek, East Sikkim 737135',
            latitude: 27.3153,
            longitude: 88.5502,
            description: 'Rumtek Monastery is one of the most significant monasteries in Sikkim and serves as the seat of the Karmapa, head of the Karma Kagyu lineage. Built in the 1960s, this magnificent monastery houses many precious Buddhist artifacts, ancient scriptures, and religious treasures.',
            founded_year: 1966,
            monastery_type: 'Karma Kagyu',
            visiting_hours: '6:00 AM - 6:00 PM',
            entry_fee: 0,
            contact_phone: '+91-3592-252523',
            image_url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
            history: 'Rumtek Monastery was built in 1740 by Changchub Dorje, 12th Karmapa Lama. The monastery was later rebuilt in the 1960s by the 16th Karmapa after he fled Tibet. It serves as the main seat of the Kagyu lineage of Tibetan Buddhism.',
            architecture: 'The monastery features traditional Tibetan architecture with intricate woodwork, colorful murals, and golden roofs. The main shrine hall houses a large golden Buddha statue and numerous thangka paintings.',
            festivals: 'Cham Dance Festival (annual masked dance), Losar (Tibetan New Year), Buddha Jayanti. The monastery comes alive during these festivals with colorful ceremonies and traditional music.',
            significance: 'As the seat of the Karmapa, Rumtek is one of the most important Kagyu monasteries outside Tibet. It houses the sacred Black Crown of the Karmapa and numerous precious relics.'
          },
          '2': {
            id: '2',
            monastery_name: 'Enchey Monastery',
            district: 'East Sikkim',
            address: 'Gangtok, Sikkim 737101',
            latitude: 27.3389,
            longitude: 88.6065,
            description: 'Enchey Monastery is a 200-year-old Buddhist monastery located in Gangtok. Belonging to the Nyingma order of Vajrayana Buddhism, it stands as a testament to Sikkim\'s rich spiritual heritage.',
            founded_year: 1840,
            monastery_type: 'Nyingma',
            visiting_hours: '5:00 AM - 7:00 PM',
            entry_fee: 0,
            contact_phone: '+91-3592-202596',
            image_url: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800&h=600&fit=crop',
            history: 'Founded in 1840 by Lama Druptob Karpo, Enchey Monastery was built on the site blessed by Lama Druptob Karpo, who was believed to have flying powers. The name "Enchey" means "solitary temple".',
            architecture: 'Built in traditional Buddhist architectural style, the monastery features a main prayer hall with beautiful murals depicting Buddhist deities and scenes from Buddha\'s life.',
            festivals: 'Cham Dance is performed annually on the 18th and 19th days of the 12th month of the Tibetan calendar. Losar celebrations are also held with great fervor.',
            significance: 'The monastery is famous for its annual Cham dance and is considered one of the most important Nyingma monasteries in Sikkim.'
          },
          '8': {
            id: '8',
            monastery_name: 'Do Drul Chorten',
            district: 'East Sikkim',
            address: 'Gangtok, East Sikkim',
            latitude: 27.3270,
            longitude: 88.6051,
            description: 'Do Drul Chorten is one of the most important stupas in Sikkim. Built in 1945, it contains complete Dorjee Phurba, Kangyur relics and other sacred objects.',
            founded_year: 1945,
            monastery_type: 'Nyingma',
            visiting_hours: '5:00 AM - 8:00 PM',
            entry_fee: 0,
            image_url: 'https://i.postimg.cc/qRF13LZM/Gemini-Generated-Image-gb4tqegb4tqegb4t-1.png?w=800&h=600&fit=crop',
            history: 'Built in 1945 by Trulshik Rinpoche, Do Drul Chorten is surrounded by 108 Mani Lhakors (prayer wheels). The stupa was built to ward off evil spirits and bring peace to the region.',
            architecture: 'The stupa follows traditional Tibetan Buddhist architecture with a square base, circular middle section, and spire topped with a golden pinnacle. It is surrounded by colorful prayer flags.',
            festivals: 'Buddha Purnima, Losar (Tibetan New Year), and various prayer ceremonies are held throughout the year.',
            significance: 'This stupa is considered highly sacred and is believed to contain powerful relics. Devotees circumambulate the stupa while spinning prayer wheels.'
          },
          '3': {
            id: '3',
            monastery_name: 'Pemayangtse Monastery',
            district: 'West Sikkim',
            address: 'Pelling, West Sikkim 737113',
            latitude: 27.2151,
            longitude: 88.2468,
            description: 'Pemayangtse Monastery is one of the oldest and premier monasteries of Sikkim. Built in 1705, it is the head monastery of the Nyingma order.',
            founded_year: 1705,
            monastery_type: 'Nyingma',
            visiting_hours: '7:00 AM - 5:00 PM',
            entry_fee: 10,
            contact_phone: '+91-3595-250658',
            image_url: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop',
            history: 'Founded by Lama Lhatsun Chempo in 1705, Pemayangtse was built as the head monastery of the Nyingma sect. It played a crucial role in crowning the Chogyals (kings) of Sikkim.',
            architecture: 'This three-story monastery showcases exquisite Tibetan architecture with intricate wood carvings, paintings, and sculptures. The top floor houses a wooden sculpture of Guru Rinpoche\'s heavenly palace.',
            festivals: 'Cham Dance during the 28th and 29th days of the 12th Tibetan month, Losar celebrations, and various Buddhist festivals.',
            significance: 'Only monks of pure Tibetan lineage can become monks here. It houses many ancient Buddhist scriptures, statues, and paintings.'
          },
          '4': {
            id: '4',
            monastery_name: 'Tashiding Monastery',
            district: 'West Sikkim',
            address: 'Tashiding, West Sikkim',
            latitude: 27.3404,
            longitude: 88.2717,
            description: 'Tashiding Monastery is regarded as the holiest of all monasteries in Sikkim. Located on a hilltop, it offers breathtaking views of the surrounding mountains.',
            founded_year: 1641,
            monastery_type: 'Nyingma',
            visiting_hours: '6:00 AM - 6:00 PM',
            entry_fee: 0,
            image_url: 'https://i.postimg.cc/v89rhb4v/Gemini-Generated-Image-qoqvp0qoqvp0qoqv.png?w=800&h=600&fit=crop',
            history: 'Built in 1641 by Ngadak Sempa Chenpo, Tashiding means "The Devoted Central Glory". The monastery is built on the site where Guru Rinpoche meditated.',
            architecture: 'Perched on a hilltop with panoramic views, the monastery features traditional Tibetan architecture with prayer flags fluttering in the mountain breeze.',
            festivals: 'Bhumchu Festival (holy water ceremony), Losar, and various religious ceremonies. The Bhumchu Festival is particularly famous.',
            significance: 'Considered the most sacred monastery in Sikkim, it is believed that a mere sight of this monastery cleanses one of all sins.'
          },
          '5': {
            id: '5',
            monastery_name: 'Phodong Monastery',
            district: 'North Sikkim',
            address: 'Phodong, North Sikkim',
            latitude: 27.4711,
            longitude: 88.5747,
            description: 'Phodong Monastery is one of the six most important monasteries of Sikkim. It was reconstructed in 1977 and houses many ancient Buddhist scriptures.',
            founded_year: 1740,
            monastery_type: 'Kagyu',
            visiting_hours: '6:00 AM - 5:00 PM',
            entry_fee: 0,
            image_url: 'https://i.postimg.cc/kGxWgF0H/Gemini-Generated-Image-qoqvp0qoqvp0qoqv-1.png?w=800&h=600&fit=crop',
            history: 'Originally built in 1740 by Chogyal Gyurmed Namgyal, it was reconstructed in 1977 after being damaged. It belongs to the Kagyu sect of Tibetan Buddhism.',
            architecture: 'The monastery showcases beautiful Tibetan architecture with colorful murals, prayer wheels, and traditional Buddhist symbols.',
            festivals: 'Annual Cham Dance, Losar celebrations, and various Buddhist festivals are celebrated with great enthusiasm.',
            significance: 'Known for its annual Cham dance and beautiful location amidst rhododendron forests.'
          },
          '6': {
            id: '6',
            monastery_name: 'Labrang Monastery',
            district: 'North Sikkim',
            address: 'Lachen, North Sikkim',
            latitude: 27.5000,
            longitude: 88.5500,
            description: 'Labrang Monastery is located in the beautiful valley of Lachen. It is known for its peaceful environment and traditional Buddhist architecture.',
            founded_year: 1806,
            monastery_type: 'Nyingma',
            visiting_hours: '7:00 AM - 4:00 PM',
            entry_fee: 0,
            image_url: 'https://i.postimg.cc/HkPzK3d0/Gemini-Generated-Image-vg8577vg8577vg85.png?w=800&h=600&fit=crop',
            history: 'Built in 1806, Labrang Monastery serves the Buddhist community in the remote northern region of Sikkim. It provides spiritual guidance to the local population.',
            architecture: 'Simple yet elegant Tibetan architecture adapted to the harsh mountain climate, featuring thick walls and sloped roofs.',
            festivals: 'Losar (Tibetan New Year), local harvest festivals, and Buddhist prayer ceremonies.',
            significance: 'Serves as an important spiritual center for the remote communities of North Sikkim.'
          },
          '7': {
            id: '7',
            monastery_name: 'Ralang Monastery',
            district: 'South Sikkim',
            address: 'Ralang, South Sikkim',
            latitude: 27.1500,
            longitude: 88.5000,
            description: 'Ralang Monastery is known for its annual Kagyed dance festival. The monastery houses beautiful murals and ancient Buddhist texts.',
            founded_year: 1768,
            monastery_type: 'Kagyu',
            visiting_hours: '6:00 AM - 6:00 PM',
            entry_fee: 5,
            image_url: 'https://i.postimg.cc/9X6h3tFh/Gemini-Generated-Image-gb4tqegb4tqegb4t.png?w=800&h=600&fit=crop',
            history: 'Founded in 1768 by the fourth Chogyal Tenzin Namgyal, Ralang Monastery belongs to the Kagyu sect and is famous for its Kagyed dance.',
            architecture: 'Traditional Tibetan monastic architecture with beautiful wall paintings, statues, and a peaceful courtyard for meditation.',
            festivals: 'Famous for the Kagyed dance performed during the 28th and 29th days of the 10th Tibetan month, along with other Buddhist festivals.',
            significance: 'Known as one of the most important Kagyu monasteries in South Sikkim and famous for its sacred dances.'
          }
        }

    try {
      console.log('Fetching monastery with ID:', monasteryId)
      
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('monasteries')
        .select('*')
        .eq('id', monasteryId)
        .single()

      if (error) {
        console.log('Database error, using fallback data:', error)
        throw error
      }

      if (data) {
        console.log('Found monastery in database:', data)
        setMonastery(data)
      } else {
        console.log('Available monastery IDs:', Object.keys(sampleData))
        console.log('Looking for monastery ID:', monasteryId)
        
        const monasteryData = sampleData[monasteryId]
        
        if (monasteryData) {
          console.log('Found monastery in sample data:', monasteryData.monastery_name)
          setMonastery(monasteryData)
        } else {
          console.log('Monastery ID not found in sample data')
          setMonastery(null)
        }
      }
    } catch (error) {
      console.error('Error fetching monastery details:', error)
      
      // Use sample data as fallback
      console.log('Available monastery IDs:', Object.keys(sampleData))
      console.log('Looking for monastery ID:', monasteryId)
      
      const monasteryData = sampleData[monasteryId]
      
      if (monasteryData) {
        console.log('Found monastery in sample data (fallback):', monasteryData.monastery_name)
        setMonastery(monasteryData)
      } else {
        console.log('Monastery ID not found in sample data')
        setMonastery(null)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading monastery details...</p>
          </div>
        </div>
      </>
    )
  }

  if (!monastery) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-300 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Monastery Not Found</h2>
            <Button onClick={() => router.push("/monasteries")} className="bg-green-600 hover:bg-green-700">
              Back to Monasteries
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Back Button */}
          <Button 
            onClick={() => router.back()}
            variant="outline" 
            className="mb-6 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {/* Hero Section */}
          <Card className="mb-8 overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
            <div className="relative h-80 bg-gray-200">
              <img
                src={monastery.image_url}
                alt={monastery.monastery_name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              {imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <Mountain className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">{monastery.monastery_name}</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <Badge className="mb-2 bg-green-600 text-white">
                  {monastery.district}
                </Badge>
                <h1 className="text-4xl font-bold mb-2">{monastery.monastery_name}</h1>
                <p className="text-green-100 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {monastery.address}
                </p>
              </div>
            </div>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">About This Monastery</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {monastery.description}
                  </p>
                </CardContent>
              </Card>

              {/* History */}
              {monastery.history && (
                <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">🏛️ History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {monastery.history}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Architecture */}
              {monastery.architecture && (
                <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">🏗️ Architecture</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {monastery.architecture}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Festivals */}
              {monastery.festivals && (
                <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">🎭 Festivals & Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {monastery.festivals}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Significance */}
              {monastery.significance && (
                <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">⭐ Religious Significance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {monastery.significance}
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">Quick Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Founded</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{monastery.founded_year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{monastery.monastery_type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Visiting Hours</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">{monastery.visiting_hours}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Entry Fee</p>
                      <p className="font-medium text-gray-800 dark:text-gray-200">
                        {monastery.entry_fee === 0 ? 'Free' : `₹${monastery.entry_fee}`}
                      </p>
                    </div>
                  </div>

                  {monastery.contact_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Contact</p>
                        <p className="font-medium text-gray-800 dark:text-gray-200">{monastery.contact_phone}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowVirtualTour(true)}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-300"
                >
                  🎥 Start Virtual Tour
                </button>
                
                <Link 
                  href={`/maps?monastery=${monastery.id}`}
                  className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  🗺️ View on Map
                </Link>

                <Link 
                  href="/monasteries"
                  className="block w-full bg-gray-600 hover:bg-gray-700 text-white text-center py-3 px-4 rounded-lg font-semibold transition-colors"
                >
                  🏛️ View All Monasteries
                </Link>
              </div>

              {/* Map Preview */}
              <Card className="shadow-lg dark:shadow-lg dark:shadow-green-500/10 border-0 dark:border dark:border-gray-700/50 bg-white/95 dark:bg-gray-800/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800 dark:text-gray-200">Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-6 text-center">
                    <MapPin className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Coordinates: {monastery.latitude.toFixed(4)}, {monastery.longitude.toFixed(4)}
                    </p>
                    <Button 
                      onClick={() => router.push(`/maps?monastery=${monastery.id}`)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      View on Interactive Map
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <VirtualTourModal
          monastery={monastery}
          isOpen={showVirtualTour}
          onClose={() => setShowVirtualTour(false)}
        />
      )}
    </>
  )
}