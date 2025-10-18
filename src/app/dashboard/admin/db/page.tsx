"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Database, RefreshCw, CheckCircle, XCircle, AlertCircle, ArrowLeft } from "lucide-react"

export default function DatabaseAdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [migrating, setMigrating] = useState(false)
  const [result, setResult] = useState<{
    type: "success" | "error" | "info"
    message: string
    changes?: string[]
  } | null>(null)

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session || (session.user as any)?.role !== "admin") {
    router.push("/dashboard")
    return null
  }

  const runMigration = async () => {
    setMigrating(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/db-migrate", {
        method: "POST",
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          type: data.changes && data.changes.length > 0 ? "success" : "info",
          message: data.message,
          changes: data.changes,
        })
      } else {
        setResult({
          type: "error",
          message: data.error || "Failed to migrate database",
        })
      }
    } catch (error: any) {
      setResult({
        type: "error",
        message: error.message || "Failed to connect to database",
      })
    } finally {
      setMigrating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard")}
            className="mb-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Database className="h-8 w-8" />
            Database Management
          </h1>
          <p className="text-muted-foreground">Manage database schema and migrations</p>
        </div>

        {/* Database Setup Instructions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Database Setup Required
            </CardTitle>
            <CardDescription>
              Make sure your DATABASE_URL is configured before running migrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium mb-2">Step 1: Add DATABASE_URL to .env.local</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                DATABASE_URL="postgresql://username:password@host:port/database_name"
              </div>
            </div>

            <div>
              <p className="font-medium mb-2">Step 2: For Local Development (Docker)</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto space-y-2">
                <div># Start PostgreSQL with Docker</div>
                <div>docker run --name postgres-dev \</div>
                <div className="pl-4">-e POSTGRES_PASSWORD=password \</div>
                <div className="pl-4">-e POSTGRES_DB=portfolio \</div>
                <div className="pl-4">-p 5432:5432 -d postgres:17</div>
                <div className="mt-2"># Then add to .env.local:</div>
                <div>DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"</div>
              </div>
            </div>

            <div>
              <p className="font-medium mb-2">Step 3: Restart Development Server</p>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                npm run dev
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Migration Tool */}
        <Card>
          <CardHeader>
            <CardTitle>Run Database Migration</CardTitle>
            <CardDescription>
              This will add the required 'category' and 'featured_image' columns to the blog_posts table
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={runMigration}
              disabled={migrating}
              size="lg"
              className="w-full"
            >
              {migrating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Running Migration...
                </>
              ) : (
                <>
                  <Database className="h-4 w-4 mr-2" />
                  Update Database Schema
                </>
              )}
            </Button>

            {/* Result Display */}
            {result && (
              <div
                className={`p-4 rounded-lg border-2 ${
                  result.type === "success"
                    ? "bg-green-500/10 border-green-500"
                    : result.type === "error"
                    ? "bg-red-500/10 border-red-500"
                    : "bg-blue-500/10 border-blue-500"
                }`}
              >
                <div className="flex items-start gap-3">
                  {result.type === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  ) : result.type === "error" ? (
                    <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{result.message}</p>
                    {result.changes && result.changes.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {result.changes.map((change, index) => (
                          <li key={index} className="text-sm flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {change}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Database Schema Info</CardTitle>
            <CardDescription>Required columns for blog system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <div className="font-mono bg-muted px-2 py-1 rounded">category</div>
                <div className="text-muted-foreground">
                  VARCHAR(100) - Organizes posts by topic (e.g., Technology, AI, Web Dev)
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="font-mono bg-muted px-2 py-1 rounded">featured_image</div>
                <div className="text-muted-foreground">
                  TEXT - URL for the post's featured image shown in listings and headers
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Troubleshooting */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <p className="font-medium">Connection Error?</p>
              <p className="text-muted-foreground">
                Make sure your DATABASE_URL is correct and the database server is running
              </p>
            </div>
            <div>
              <p className="font-medium">Permission Error?</p>
              <p className="text-muted-foreground">
                Ensure the database user has ALTER TABLE permissions
              </p>
            </div>
            <div>
              <p className="font-medium">Already Migrated?</p>
              <p className="text-muted-foreground">
                Running the migration again is safe - it will check if columns already exist
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
