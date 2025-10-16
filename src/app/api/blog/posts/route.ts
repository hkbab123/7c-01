import { NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { blogPosts, users } from "@/lib/db/schema"
import { desc, eq, and } from "drizzle-orm"

export async function GET() {
  try {
    const db = getDb()
    const publishedPosts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        slug: blogPosts.slug,
        publishedAt: blogPosts.publishedAt,
        author: {
          id: users.id,
          name: users.name,
        },
      })
      .from(blogPosts)
      .leftJoin(users, eq(blogPosts.authorId, users.id))
      .where(and(eq(blogPosts.isPublished, true), eq(users.isActive, true)))
      .orderBy(desc(blogPosts.publishedAt))

    return NextResponse.json(publishedPosts)
  } catch (error) {
    console.error("Error fetching published posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}