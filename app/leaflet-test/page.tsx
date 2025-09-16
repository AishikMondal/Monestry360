"use client"

import { useEffect, useState } from 'react'

export default function LeafletTest() {
  const [step, setStep] = useState(0)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setStep(1) // React loaded
  }, [])

  const testLeafletImport = async () => {
    try {
      setStep(2) // Testing import
      const L = await import('leaflet')
      console.log('Leaflet imported:', L)
      setLeafletLoaded(true)
      setStep(3) // Import successful
    } catch (err) {
      console.error('Leaflet import failed:', err)
      setError(`Import failed: ${err}`)
      setStep(-1) // Error
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Leaflet Loading Test</h1>
      
      <div className="space-y-4">
        <div className={`p-4 rounded ${step >= 1 ? 'bg-green-100' : 'bg-gray-100'}`}>
          <p>✅ Step 1: React component loaded</p>
        </div>

        <div className={`p-4 rounded ${step >= 2 ? 'bg-yellow-100' : 'bg-gray-100'}`}>
          <p>{step >= 2 ? '⏳' : '⏸️'} Step 2: Testing Leaflet import...</p>
        </div>

        <div className={`p-4 rounded ${step >= 3 ? 'bg-green-100' : step === -1 ? 'bg-red-100' : 'bg-gray-100'}`}>
          <p>{step >= 3 ? '✅' : step === -1 ? '❌' : '⏸️'} Step 3: Leaflet import result</p>
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        <button 
          onClick={testLeafletImport}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={step === 2}
        >
          {step === 2 ? 'Testing...' : 'Test Leaflet Import'}
        </button>

        {leafletLoaded && (
          <div className="bg-green-50 p-4 rounded border border-green-200">
            <p className="text-green-800 font-semibold">🎉 Leaflet loaded successfully!</p>
            <p className="text-sm text-green-600 mt-1">Ready to create maps</p>
          </div>
        )}
      </div>
    </div>
  )
}