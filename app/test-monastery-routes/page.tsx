import Link from 'next/link'

export default function TestMonasteryRoutes() {
  const monasteryIds = ['1', '2', '3', '4', '5', '6', '7', '8']

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Test Monastery Detail Pages
        </h1>
        
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {monasteryIds.map((id) => (
            <Link
              key={id}
              href={`/monastery/${id}`}
              className="block bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-green-200"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800">
                  Monastery {id} Detail Page
                </span>
                <span className="text-green-600 font-bold">→</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Click to test: /monastery/{id}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/monasteries"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            ← Back to Monasteries List
          </Link>
        </div>
      </div>
    </div>
  )
}