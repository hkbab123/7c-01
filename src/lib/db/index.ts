import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Create a function to get the database connection
function createDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required')
  }
  
  // Create postgres client
  const client = postgres(process.env.DATABASE_URL, { prepare: false })
  
  // Create drizzle database instance
  return drizzle(client, { schema })
}

// Export database getter
export const getDb = () => createDatabase()

// Export schema for use in other files
export { schema }
