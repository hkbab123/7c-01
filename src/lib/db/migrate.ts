import { getDb } from './index'
import { sql } from 'drizzle-orm'
import bcrypt from 'bcryptjs'

export async function runMigrations() {
  try {
    const db = getDb()
    
    // Create users table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user' NOT NULL,
        is_active BOOLEAN DEFAULT true NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)
    
    // Create blog_posts table
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        slug VARCHAR(255) UNIQUE NOT NULL,
        author_id INTEGER NOT NULL,
        is_published BOOLEAN DEFAULT false NOT NULL,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `)
    
    // Create posts table (keeping for backwards compatibility)
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)
    
    // Create default admin user if not exists
    const adminExists = await db.execute(sql`
      SELECT id FROM users WHERE email = 'admin@portfolio.com' LIMIT 1
    `)
    
    if (adminExists.length === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10)
      await db.execute(sql`
        INSERT INTO users (email, password, name, role) 
        VALUES ('admin@portfolio.com', ${hashedPassword}, 'Admin User', 'admin')
      `)
      console.log('📝 Created default admin user: admin@portfolio.com / admin123')
    }
    
    console.log('✅ Database migrations completed successfully')
    return { success: true }
  } catch (error) {
    console.error('❌ Migration failed:', error)
    return { success: false, error }
  }
}
