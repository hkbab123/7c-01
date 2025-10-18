"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Edit, Eye, Plus, Database } from "lucide-react"

interface BlogPost {
  id: number
  title: string
  excerpt: string | null
  slug: string
  isPublished: boolean
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export default function UserDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0
  })

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/login")
      return
    }

    fetchUserPosts()
  }, [session, status, router])

  const fetchUserPosts = async () => {
    try {
      const response = await fetch("/api/user/blog-posts")
      if (response.ok) {
        const posts = await response.json()
        setBlogPosts(posts)
        setStats({
          totalPosts: posts.length,
          publishedPosts: posts.filter((p: BlogPost) => p.isPublished).length,
          draftPosts: posts.filter((p: BlogPost) => !p.isPublished).length
        })
      }
    } catch (error) {
      console.error("Error fetching user posts:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session.user?.name}. Manage your blog posts here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                All your blog posts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.publishedPosts}</div>
              <p className="text-xs text-muted-foreground">
                Live blog posts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.draftPosts}</div>
              <p className="text-xs text-muted-foreground">
                Unpublished posts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Button 
            onClick={() => router.push("/dashboard/posts/new")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
          
          {(session.user as any)?.role === "admin" && (
            <Button 
              variant="outline"
              onClick={() => router.push("/dashboard/admin/db")}
            >
              <Database className="h-4 w-4 mr-2" />
              Database Management
            </Button>
          )}
        </div>

        {/* Blog Posts */}
        <Card>
          <CardHeader>
            <CardTitle>My Blog Posts</CardTitle>
            <CardDescription>
              Manage your blog posts, edit drafts, and publish content
            </CardDescription>
          </CardHeader>
          <CardContent>
            {blogPosts.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No posts yet</h3>
                <p className="text-muted-foreground mb-4">
                  Get started by creating your first blog post
                </p>
                <Button onClick={() => router.push("/dashboard/posts/new")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Post
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-medium">{post.title}</h3>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            post.isPublished
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                          }`}
                        >
                          {post.isPublished ? "Published" : "Draft"}
                        </span>
                      </div>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                        {post.isPublished && post.publishedAt && (
                          <span>Published: {new Date(post.publishedAt).toLocaleDateString()}</span>
                        )}
                        <span>Updated: {new Date(post.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {post.isPublished && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => router.push(`/blog/${post.slug}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/dashboard/posts/${post.id}/edit`)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}