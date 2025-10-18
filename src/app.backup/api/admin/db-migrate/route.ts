import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { getDb } from "@/lib/db"
import { sql } from "drizzle-orm"

export async function POST() {
  try {
    const session = await auth()
    
    if (!session || (session.user as any)?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = getDb()

    // Check if category and featuredImage columns exist
    const checkColumns = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'blog_posts' 
      AND column_name IN ('category', 'featured_image')
    `)

    const existingColumns = checkColumns.rows.map((row: any) => row.column_name)

    const changes = []

    // Add category column if it doesn't exist
    if (!existingColumns.includes('category')) {
      await db.execute(sql`
        ALTER TABLE blog_posts 
        ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'general'
      `)
      changes.push('Added category column')
    }

    // Add featured_image column if it doesn't exist
    if (!existingColumns.includes('featured_image')) {
      await db.execute(sql`
        ALTER TABLE blog_posts 
        ADD COLUMN IF NOT EXISTS featured_image TEXT
      `)
      changes.push('Added featured_image column')
    }

    if (changes.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: "Database schema is already up to date",
        changes: []
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Database schema updated successfully",
      changes
    })
  } catch (error: any) {
    console.error("Database migration error:", error)
    return NextResponse.json(
      { 
        error: "Failed to migrate database", 
        details: error.message 
      },
      { status: 500 }
    )
  }
}
