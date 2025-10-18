"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Calendar, User, ArrowLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string | null
  category: string | null
  featuredImage: string | null
  slug: string
  publishedAt: string
  createdAt: string
  updatedAt: string
  author: {
    id: number
    name: string
    email: string
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.slug) {
      fetchPost()
    }
  }, [params.slug])

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${params.slug}`)
      if (response.ok) {
        const data = await response.json()
        setPost(data)
      } else {
        setError("Post not found")
      }
    } catch (error) {
      console.error("Error fetching post:", error)
      setError("Failed to load post")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg">Loading post...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background py-12 pt-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "The blog post you're looking for doesn't exist."}
            </p>
            <Button onClick={() => router.push("/blog")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 pt-24">
      <article className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/blog")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Button>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "500px" }}
            />
          </div>
        )}

        {/* Category Badge */}
        {post.category && (
          <div className="mb-4">
            <Badge variant="secondary" className="text-sm">
              <Tag className="h-3 w-3 mr-1" />
              {post.category}
            </Badge>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8 pb-8 border-b">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="text-muted-foreground">
            {Math.ceil(post.content.split(" ").length / 200)} min read
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="text-xl text-muted-foreground mb-8 italic leading-relaxed">
            {post.excerpt}
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-display prose-headings:font-bold
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-base prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-lg prose-img:shadow-lg
            prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-muted prose-pre:border
            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-1
            prose-table:border prose-th:bg-muted prose-td:border prose-th:border
            prose-ul:list-disc prose-ol:list-decimal"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Footer */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Written by</p>
              <p className="font-medium">{post.author.name}</p>
            </div>
            <Button onClick={() => router.push("/blog")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </div>
      </article>
    </div>
  )
}
