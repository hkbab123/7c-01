import { getDb } from './index'
import { sql } from 'drizzle-orm'

export async function runMigrations() {
  try {
    const db = getDb()
    
    // Create posts table if it doesn't exist
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)
    
    console.log('✅ Database migrations completed successfully')
    return { success: true }
  } catch (error) {
    console.error('❌ Migration failed:', error)
    return { success: false, error }
  }
}