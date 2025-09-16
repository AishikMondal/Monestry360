import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { FeaturedMonasteries } from "@/components/featured-monasteries"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturedMonasteries />
      </main>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="space-y-8">
            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold text-green-800 leading-tight">
                Monastery<span className="text-emerald-600">360</span>
              </h1>
              <p className="text-xl md:text-2xl text-green-700 max-w-3xl mx-auto">
                Discover the Sacred Heritage of Sikkim's Ancient Monasteries
              </p>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Embark on a spiritual journey through centuries-old Buddhist monasteries nestled in the Himalayas
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/monasteries" 
                className="btn-hover-effect glow-animation bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2"
              >
                🏛️ Start Virtual Tour
              </Link>
              <Link 
                href="/plan" 
                className="btn-hover-effect bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2"
              >
                🗺️ Plan Your Visit
              </Link>
              <Link 
                href="/maps" 
                className="btn-hover-effect bg-white hover:bg-gray-50 text-green-600 border-2 border-green-600 hover:border-green-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg flex items-center gap-2"
              >
                🌍 Interactive Map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Why Choose Monastery360?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the spiritual beauty of Sikkim like never before
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Virtual Tours */}
            <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <CardTitle className="text-2xl text-green-800">Virtual Tours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Take immersive virtual tours of 8+ sacred monasteries from the comfort of your home
                </p>
              </CardContent>
            </Card>

            {/* AI Trip Planner */}
            <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <CardTitle className="text-2xl text-blue-800">AI Trip Planner</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Get personalized itineraries with accommodation, transport, and optimized routes
                </p>
              </CardContent>
            </Card>

            {/* Interactive Maps */}
            <Card className="text-center border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🗺️</span>
                </div>
                <CardTitle className="text-2xl text-purple-800">Interactive Maps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Explore monastery locations across all 4 districts with real-time information
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">8+</div>
              <div className="text-green-100">Sacred Monasteries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="text-green-100">Districts Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">300+</div>
              <div className="text-green-100">Years of History</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-green-100">Free Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Monasteries Preview */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">
              Featured Monasteries
            </h2>
            <p className="text-lg text-gray-600">
              Get a glimpse of Sikkim's most sacred places
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Rumtek Monastery */}
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
              <div className="h-48 bg-gradient-to-br from-green-400 to-emerald-500 relative">
                <img 
                  src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=500&h=300&fit=crop" 
                  alt="Rumtek Monastery"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Rumtek Monastery</h3>
                  <p className="text-sm">East Sikkim • Founded 1966</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  The seat of the Karmapa, housing precious Buddhist artifacts and ancient scriptures.
                </p>
                <Link 
                  href="/monasteries"
                  className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Explore Now
                </Link>
              </CardContent>
            </Card>

            {/* Pemayangtse Monastery */}
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-cyan-500 relative">
                <img 
                  src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&h=300&fit=crop" 
                  alt="Pemayangtse Monastery"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Pemayangtse</h3>
                  <p className="text-sm">West Sikkim • Founded 1705</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  One of Sikkim's oldest monasteries and the head monastery of the Nyingma order.
                </p>
                <Link 
                  href="/monasteries"
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explore Now
                </Link>
              </CardContent>
            </Card>

            {/* Enchey Monastery */}
            <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-0">
              <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-500 relative">
                <img 
                  src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=500&h=300&fit=crop" 
                  alt="Enchey Monastery"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">Enchey Monastery</h3>
                  <p className="text-sm">East Sikkim • Founded 1840</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  A 200-year-old monastery in Gangtok belonging to the Nyingma order of Buddhism.
                </p>
                <Link 
                  href="/monasteries"
                  className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Explore Now
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Link 
              href="/monasteries"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All 8+ Monasteries
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Begin Your Spiritual Journey?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of visitors exploring Sikkim's sacred monasteries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/monasteries"
              className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300"
            >
              🏛️ Start Exploring Now
            </Link>
            <Link 
              href="/auth/signup"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
