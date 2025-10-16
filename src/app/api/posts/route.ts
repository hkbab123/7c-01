import { NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { posts } from '@/lib/db/schema'
import { desc } from 'drizzle-orm'

// GET /api/posts - Fetch all posts
export async function GET() {
  try {
    const db = getDb()
    const allPosts = await db
      .select()
      .from(posts)
      .orderBy(desc(posts.createdAt))

    return NextResponse.json(allPosts)
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST /api/posts - Create a new post
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, content } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    const db = getDb()
    const newPost = await db
      .insert(posts)
      .values({
        title,
        content,
        updatedAt: new Date(),
      })
      .returning()

    return NextResponse.json(newPost[0], { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}