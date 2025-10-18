import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { blogPosts } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = getDb()
    const postId = parseInt(params.id)

    const post = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.id, postId),
          eq(blogPosts.authorId, parseInt((session.user as any).id))
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

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const postId = parseInt(params.id)

    // Check if post belongs to user
    const existingPost = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.id, postId),
          eq(blogPosts.authorId, parseInt((session.user as any).id))
        )
      )
      .limit(1)

    if (!existingPost || existingPost.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    const updatedPost = await db
      .update(blogPosts)
      .set({
        title,
        content,
        excerpt: excerpt || null,
        slug,
        category: category || 'general',
        featuredImage: featuredImage || null,
        isPublished: isPublished || false,
        publishedAt: isPublished && !existingPost[0].isPublished ? new Date() : existingPost[0].publishedAt,
        updatedAt: new Date(),
      })
      .where(eq(blogPosts.id, postId))
      .returning()

    return NextResponse.json(updatedPost[0])
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json(
      { error: "Failed to update blog post" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = getDb()
    const postId = parseInt(params.id)

    // Check if post belongs to user
    const existingPost = await db
      .select()
      .from(blogPosts)
      .where(
        and(
          eq(blogPosts.id, postId),
          eq(blogPosts.authorId, parseInt((session.user as any).id))
        )
      )
      .limit(1)

    if (!existingPost || existingPost.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    await db
      .delete(blogPosts)
      .where(eq(blogPosts.id, postId))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    )
  }
}
