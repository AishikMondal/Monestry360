import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-rose-100 p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-red-800">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {params?.error ? (
              <p className="text-sm text-red-700 mb-4">Error: {params.error}</p>
            ) : (
              <p className="text-sm text-red-700 mb-4">An authentication error occurred.</p>
            )}
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-xs text-red-600">Please try again or contact support if the problem persists.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
