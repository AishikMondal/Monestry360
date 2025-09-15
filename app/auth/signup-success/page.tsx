import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SignupSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Welcome to Monastery360!</CardTitle>
            <CardDescription className="text-green-600">
              Please check your email to confirm your account
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-green-700 leading-relaxed">
              We've sent you a confirmation email. Please click the link in the email to activate your account and start
              exploring Sikkim's spiritual heritage.
            </p>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-600">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
