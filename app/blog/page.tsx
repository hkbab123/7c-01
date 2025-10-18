"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BlogPost {
  id: number
  title: string
  excerpt: string | null
  slug: string
  category: string | null
  featuredImage: string | null
  publishedAt: string
  author: {
    name: string
  }
}

const CATEGORIES = [
  "All",
  "Technology",
  "AI & Machine Learning",
  "Web Development",
  "Mobile Development",
  "Cloud Computing",
  "DevOps",
  "Data Science",
  "Cybersecurity",
  "Blockchain",
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPublishedPosts()
  }, [])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter((post) => post.category === selectedCategory))
    }
  }, [selectedCategory, posts])

  const fetchPublishedPosts = async () => {
    try {
      const response = await fetch("/api/blog/posts")
      if (response.ok) {
        const data = await response.json()
        setPosts(data)
        setFilteredPosts(data)
      } else {
        setError("Failed to load blog posts")
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
      setError("Failed to load blog posts")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-lg">Loading blog posts...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 pt-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold font-display mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, thoughts, and experiences in technology, AI, and digital transformation.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category === "All" && <Tag className="h-3 w-3 mr-1" />}
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        {error ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <Button variant="outline" onClick={fetchPublishedPosts}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        ) : filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <h3 className="text-xl font-semibold mb-2">
                {selectedCategory === "All" ? "No posts yet" : `No posts in ${selectedCategory}`}
              </h3>
              <p className="text-muted-foreground">
                {selectedCategory === "All" 
                  ? "Check back soon for new content!"
                  : "Try selecting a different category."}
              </p>
              {selectedCategory !== "All" && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setSelectedCategory("All")}
                >
                  View All Posts
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <Card 
                key={post.id} 
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border-2 hover:border-primary/50 ${
                  index === 0 ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative overflow-hidden">
                    <Link href={`/blog/${post.slug}`}>
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                          index === 0 ? "h-64 md:h-80" : "h-48"
                        }`}
                      />
                    </Link>
                    {post.category && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-primary/90 backdrop-blur-sm">
                          {post.category}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}

                <CardHeader className={index === 0 ? "md:p-8" : ""}>
                  {/* Category Badge (if no featured image) */}
                  {!post.featuredImage && post.category && (
                    <Badge variant="secondary" className="w-fit mb-2">
                      <Tag className="h-3 w-3 mr-1" />
                      {post.category}
                    </Badge>
                  )}

                  {/* Meta Info */}
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{post.author.name}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <CardTitle className={`group-hover:text-primary transition-colors leading-tight ${
                    index === 0 ? "text-2xl md:text-3xl" : "text-xl"
                  }`}>
                    <Link href={`/blog/${post.slug}`} className="line-clamp-2">
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className={index === 0 ? "md:px-8 md:pb-8" : ""}>
                  {post.excerpt && (
                    <CardDescription className={`leading-relaxed mb-4 ${
                      index === 0 ? "text-base line-clamp-3" : "text-sm line-clamp-2"
                    }`}>
                      {post.excerpt}
                    </CardDescription>
                  )}
                  <Link href={`/blog/${post.slug}`}>
                    <Button variant="ghost" className="p-0 h-auto group-hover:text-primary">
                      Read more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
