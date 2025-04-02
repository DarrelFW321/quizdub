import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { signIn } from "@/configurations/auth";
import Link from "next/link";

export function LoginFormError() {

  return (
    <div className="w-full max-w-md mx-auto">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md shadow-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3 flex-1">
              <h3 className="text-sm font-medium text-red-800">Login Unsuccessful</h3>
              <div className="mt-1 text-sm text-red-700">
                <p>Authentication failed. Please try again.</p>
              </div>
              </div>
            </div>
          </div>
          <Card className="border-none login-card shadow-xl p-2">
        <CardHeader className="space-y-1 pt-6 px-6">
        <div className="flex items-center justify-start">
            <img src="/logo.png" alt="LeType Logo" className="w-8 h-8" />
            <div className="ml-2 text-lg font-semibold">LeType</div>
            </div>
          <h2 className="text-2xl font-semibold text-center mt-6">Welcome back, Login.</h2>
        </CardHeader>
        <CardContent className="px-6">
        <form action={async () => {
        "use server"
        await signIn("google")
      }} className="space-y-5">
            <Button
              type = "submit"
              className="w-full h-12 rounded-md border border-gray-300 bg-white text-gray-800 font-medium flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Sign in with Google</span>
            </Button>
          </form>

          <form action={async () => {
        "use server"
        await signIn("github")
      }} className="space-y-5">
            <Button
              type = "submit"
              className="w-full h-12 rounded-md bg-[#24292e] text-white font-medium flex items-center justify-center space-x-2 hover:bg-[#1c2024] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
              </svg>
              <span>Sign in with GitHub</span>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
