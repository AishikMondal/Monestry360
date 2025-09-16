export default function DependencyCheck() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dependency Check</h1>
      
      <div className="bg-yellow-50 p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Required packages for maps:</h2>
        <code className="block bg-gray-100 p-2 rounded text-sm">
          npm install leaflet@1.9.4 @types/leaflet@1.9.12
        </code>
      </div>

      <div className="bg-blue-50 p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Check if packages are installed:</h2>
        <code className="block bg-gray-100 p-2 rounded text-sm">
          npm list leaflet
        </code>
      </div>

      <div className="bg-green-50 p-4 rounded">
        <h2 className="font-semibold mb-2">If you see this page with styling:</h2>
        <p>✅ Next.js is working</p>
        <p>✅ Tailwind CSS is working</p>
        <p>✅ TypeScript is working</p>
      </div>
    </div>
  )
}