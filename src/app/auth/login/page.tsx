"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isRegistering, setIsRegistering] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isRegistering) {
        // Handle registration
        if (!name.trim()) {
          setError("Name is required")
          setLoading(false)
          return
        }

        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        })

        if (response.ok) {
          // Registration successful, now sign in
          const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
          })

          if (!result?.error) {
            router.push("/dashboard")
          } else {
            setError("Registration successful, but login failed. Please try logging in.")
          }
        } else {
          const errorData = await response.json()
          setError(errorData.error || "Registration failed")
        }
      } else {
        // Handle login
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        })

        if (result?.error) {
          setError("Invalid email or password")
        } else {
          // Get the session to check user role
          const session = await getSession()
          if (session?.user) {
            const userRole = (session.user as any).role
            if (userRole === "admin") {
              router.push("/dashboard/admin")
            } else {
              router.push("/dashboard")
            }
          }
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8 pt-24">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {isRegistering ? "Create Account" : "Sign in"}
          </CardTitle>
          <CardDescription className="text-center">
            {isRegistering 
              ? "Create a new account to access the dashboard"
              : "Enter your email and password to access the dashboard"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={isRegistering}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your full name"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={isRegistering ? "Enter your email" : "admin@portfolio.com"}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              {loading 
                ? (isRegistering ? "Creating Account..." : "Signing in...") 
                : (isRegistering ? "Create Account" : "Sign in")
              }
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setIsRegistering(!isRegistering)
                setError("")
                setName("")
                setEmail("")
                setPassword("")
              }}
              className="text-sm"
            >
              {isRegistering 
                ? "Already have an account? Sign in" 
                : "Need an account? Create one"
              }
            </Button>
          </div>
          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground">
              <p>Default Admin Account:</p>
              <p className="font-mono">admin@portfolio.com / admin123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}