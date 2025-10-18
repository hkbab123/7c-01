import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { blogPosts, users } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"

export async function GET() {
  try {
    const session = await auth()
    
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const db = getDb()
    const allPosts = await db
      .select({
        id: blogPosts.id,
        title: blogPosts.title,
        excerpt: blogPosts.excerpt,
        slug: blogPosts.slug,
        isPublished: blogPosts.isPublished,
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
      .orderBy(desc(blogPosts.createdAt))

    return NextResponse.json(allPosts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    )
  }
}