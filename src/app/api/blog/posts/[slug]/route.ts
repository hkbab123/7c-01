import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { blogPosts, users } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const db = getDb()
    const post = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        content: blogPosts.content,
        excerpt: blogPosts.excerpt,
        slug: blogPosts.slug,
        category: blogPosts.category,
        featuredImage: blogPosts.featuredImage,
        publishedAt: blogPosts.publishedAt,
        createdAt: blogPosts.createdAt,
        updatedAt: blogPosts.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          email: users.email,
        },
      })
      .from(blogPosts)
      .leftJoin(users, eq(blogPosts.authorId, users.id))
      .where(
        and(
          eq(blogPosts.slug, params.slug),
          eq(blogPosts.isPublished, true),
          eq(users.isActive, true)
        )
      )
      .limit(1)

    if (!post || post.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post[0])
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog post" },
      { status: 500 }
    )
  }
}
