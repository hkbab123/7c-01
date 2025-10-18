import { NextResponse } from 'next/server'
import { runMigrations } from '@/lib/db/migrate'

export async function POST() {
  try {
    const result = await runMigrations()
    
    if (result.success) {
      return NextResponse.json({ 
        message: 'Database migrations completed successfully',
        success: true 
      })
    } else {
      return NextResponse.json(
        { 
          message: 'Migration failed',
          error: result.error,
          success: false 
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Migration API error:', error)
    return NextResponse.json(
      { 
        message: 'Failed to run migrations',
        error: String(error),
        success: false 
      },
      { status: 500 }
    )
  }
}