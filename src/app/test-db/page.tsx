"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Post {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function TestDatabasePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [migrating, setMigrating] = useState(false)
  const [migrationMessage, setMigrationMessage] = useState<string | null>(null)

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts")
      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }
      const data = await response.json()
      setPosts(data)
      setError(null)
    } catch (error) {
      console.error("Error fetching posts:", error)
      setError("Failed to load posts. Please check your database connection.")
    } finally {
      setLoading(false)
    }
  }

  // Create a new post
  const createPost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Please fill in both title and content")
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create post")
      }

      const newPost = await response.json()
      setPosts([newPost, ...posts])
      setFormData({ title: "", content: "" })
      setError(null)
    } catch (error) {
      console.error("Error creating post:", error)
      setError("Failed to create post. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // Run database migrations
  const runMigration = async () => {
    setMigrating(true)
    setMigrationMessage(null)
    try {
      const response = await fetch("/api/migrate", {
        method: "POST"
      })
      const result = await response.json()
      
      if (result.success) {
        setMigrationMessage("✅ Migration completed successfully!")
        // Refresh posts after migration
        await fetchPosts()
      } else {
        setMigrationMessage(`❌ Migration failed: ${result.error}`)
      }
    } catch (error) {
      console.error("Migration error:", error)
      setMigrationMessage("❌ Migration failed. Check console for details.")
    } finally {
      setMigrating(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="min-h-screen bg-background py-8 pt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-display mb-2">
            Database Test Page
          </h1>
          <p className="text-muted-foreground">
            Test PostgreSQL connection and CRUD operations
          </p>
        </div>

        {/* Database Setup */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Database Setup</CardTitle>
            <CardDescription>
              Run migrations to create the required database tables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button 
                onClick={runMigration} 
                disabled={migrating}
                variant="outline"
                className="w-full"
              >
                {migrating ? "Running Migration..." : "Run Database Migration"}
              </Button>
              {migrationMessage && (
                <div className={`text-sm p-3 rounded-md ${
                  migrationMessage.includes("✅") 
                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                    : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                }`}>
                  {migrationMessage}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Create Post Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>
              Add a new post to test database write operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={createPost} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  placeholder="Enter post title"
                />
              </div>
              <div>
                <label htmlFor="content" className="block text-sm font-medium mb-2">
                  Content
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background h-32 resize-none"
                  placeholder="Enter post content"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Creating..." : "Create Post"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Posts Display */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Posts</h2>
            <Button variant="outline" onClick={fetchPosts} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>

          {loading ? (
            <Card>
              <CardContent className="py-8 text-center">
                <div className="text-muted-foreground">Loading posts...</div>
              </CardContent>
            </Card>
          ) : error && posts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <div className="text-red-500 mb-2">{error}</div>
                <Button variant="outline" onClick={fetchPosts}>
                  Retry
                </Button>
              </CardContent>
            </Card>
          ) : posts.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <div className="text-muted-foreground">
                  No posts yet. Create your first post above!
                </div>
              </CardContent>
            </Card>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>
                    Created: {new Date(post.createdAt).toLocaleString()}
                    {post.updatedAt !== post.createdAt && (
                      <>
                        {" "}• Updated: {new Date(post.updatedAt).toLocaleString()}
                      </>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="whitespace-pre-wrap">{post.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Database Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Database Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div><strong>Database:</strong> PostgreSQL 17</div>
              <div><strong>ORM:</strong> Drizzle ORM</div>
              <div><strong>Total Posts:</strong> {posts.length}</div>
              <div><strong>Connection Status:</strong> {error ? "❌ Error" : "✅ Connected"}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}