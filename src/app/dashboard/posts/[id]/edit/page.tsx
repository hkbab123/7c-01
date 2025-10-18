"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TiptapEditor } from "@/components/editor/tiptap-editor"
import { ArrowLeft, Save, Eye, Trash2 } from "lucide-react"

const CATEGORIES = [
  "Technology",
  "AI & Machine Learning",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "DevOps",
  "Data Science",
  "Cybersecurity",
  "Blockchain",
  "General"
]

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [category, setCategory] = useState("General")
  const [featuredImage, setFeaturedImage] = useState("")
  const [content, setContent] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
      return
    }

    if (status === "authenticated" && params.id) {
      fetchPost()
    }
  }, [status, params.id])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/user/blog-posts/${params.id}`)
      if (response.ok) {
        const post = await response.json()
        setTitle(post.title)
        setSlug(post.slug)
        setExcerpt(post.excerpt || "")
        setCategory(post.category || "General")
        setFeaturedImage(post.featuredImage || "")
        setContent(post.content)
        setIsPublished(post.isPublished)
      } else {
        setError("Failed to load post")
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      setError("Failed to load post")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (publish: boolean) => {
    if (!title.trim() || !content.trim() || !slug.trim()) {
      setError("Title, slug, and content are required")
      return
    }

    setSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/user/blog-posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          slug,
          excerpt,
          category,
          featuredImage,
          content,
          isPublished: publish,
        }),
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to update post")
      }
    } catch (error) {
      console.error("Error updating post:", error)
      setError("Failed to update post")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return
    }

    setDeleting(true)
    setError(null)

    try {
      const response = await fetch(`/api/user/blog-posts/${params.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        router.push("/dashboard")
      } else {
        const data = await response.json()
        setError(data.error || "Failed to delete post")
      }
    } catch (error) {
      console.error("Error deleting post:", error)
      setError("Failed to delete post")
    } finally {
      setDeleting(false)
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
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/dashboard")}
              className="mb-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold">Edit Post</h1>
            <p className="text-muted-foreground">Update your blog post</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg text-red-500">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Post Details</CardTitle>
              <CardDescription>Basic information about your blog post</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title..."
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  URL: /blog/{slug || "your-post-slug"}
                </p>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief description of your post..."
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium mb-2">Featured Image URL</label>
                <input
                  type="url"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {featuredImage && (
                  <div className="mt-2">
                    <img
                      src={featuredImage}
                      alt="Featured preview"
                      className="max-w-xs rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader>
              <CardTitle>Content *</CardTitle>
              <CardDescription>Write your blog post content</CardDescription>
            </CardHeader>
            <CardContent>
              <TiptapEditor content={content} onChange={setContent} />
            </CardContent>
          </Card>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={saving}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save as Draft"}
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={saving}
          >
            <Eye className="h-4 w-4 mr-2" />
            {saving ? "Updating..." : isPublished ? "Update Published" : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  )
}
