# Database Setup - PostgreSQL 17

This project is configured to use PostgreSQL 17 with Drizzle ORM for database operations.

## Environment Variables

You need to set the following environment variable in your deployment environment:

```bash
DATABASE_URL="postgresql://username:password@host:port/database_name"
```

For Coolify deployment, add this environment variable in your service settings.

## Database Schema

The application uses a simple `posts` table with the following structure:

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## Setup Instructions

### 1. In Coolify Environment

1. Ensure your PostgreSQL 17 service is running
2. Set the `DATABASE_URL` environment variable in your application settings
3. Deploy the application
4. Visit `/test-db` page after deployment
5. Click "Run Database Migration" to create the required tables

### 2. Local Development

1. Install PostgreSQL 17 locally or use Docker:
   ```bash
   docker run --name postgres-dev -e POSTGRES_PASSWORD=password -e POSTGRES_DB=portfolio -p 5432:5432 -d postgres:17
   ```

2. Create `.env.local` file:
   ```bash
   DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000/test-db` and run the migration

## Available Database Commands

```bash
# Generate migration files (when schema changes)
npm run db:generate

# Run migrations
npm run db:migrate

# Push schema changes directly to database
npm run db:push

# Open Drizzle Studio (database browser)
npm run db:studio
```

## Test Page

Visit `/test-db` to:
- Run database migrations
- Test database connectivity 
- Create and view posts
- Verify CRUD operations

## API Endpoints

- `POST /api/migrate` - Run database migrations
- `GET /api/posts` - Fetch all posts
- `POST /api/posts` - Create a new post

## TypeScript Types

All database operations are fully typed using Drizzle ORM:

```typescript
export type Post = {
  id: number
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}
```

The application is configured to build successfully even without database connectivity during the build process.