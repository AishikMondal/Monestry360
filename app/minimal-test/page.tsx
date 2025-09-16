export default function MinimalTest() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Minimal Test Page</h1>
      <p className="mb-4">If you can see this, Next.js routing is working.</p>
      
      <div className="bg-blue-100 p-4 rounded mb-4">
        <h2 className="font-semibold">Test 1: Basic React</h2>
        <p>✅ This text shows React is working</p>
      </div>

      <div className="bg-green-100 p-4 rounded mb-4">
        <h2 className="font-semibold">Test 2: Tailwind CSS</h2>
        <p>✅ If this has styling, Tailwind is working</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded">
        <h2 className="font-semibold">Next Steps:</h2>
        <p>If this page works, we can add the map step by step.</p>
      </div>
    </div>
  )
}