import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { blogPosts } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = getDb()
    const userPosts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        slug: blogPosts.slug,
        category: blogPosts.category,
        featuredImage: blogPosts.featuredImage,
        isPublished: blogPosts.isPublished,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
      })
      .from(blogPosts)
      .where(eq(blogPosts.authorId, parseInt((session.user as any).id)))
      .orderBy(desc(blogPosts.createdAt))

    return NextResponse.json(userPosts)
  } catch (error) {
    console.error("Error fetching user blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, excerpt, slug, category, featuredImage, isPublished } = body

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: "Title, content, and slug are required" },
        { status: 400 }
      )
    }

    const db = getDb()
    
    const newPost = await db
      .insert(blogPosts)
      .values({
        title,
        content,
        excerpt: excerpt || null,
        slug,
        category: category || 'General',
        featuredImage: featuredImage || null,
        authorId: parseInt((session.user as any).id),
        isPublished: isPublished || false,
        publishedAt: isPublished ? new Date() : null,
        updatedAt: new Date(),
      })
      .returning()

    return NextResponse.json(newPost[0], { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    )
  }
}