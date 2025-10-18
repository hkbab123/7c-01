# Database Quick Start Guide

## 🚨 Current Status

Your blog post creation is failing because the database schema needs to be updated with new columns for:
- `category` (VARCHAR) - Organize posts by topic
- `featured_image` (TEXT) - URL for featured images

## ✅ Quick Fix (2 Options)

### Option 1: Automated Setup (Recommended)

1. **Start Docker Desktop** (if not running)

2. **Run the setup script:**
   ```bash
   ./setup-db.sh
   ```

3. **Restart your dev server:**
   ```bash
   npm run dev
   ```

4. **Run the migration:**
   - Login at http://localhost:3000/auth/login
   - Go to http://localhost:3000/dashboard
   - Click "Database Management" button
   - Click "Update Database Schema"

### Option 2: Manual Setup

#### Step 1: Start PostgreSQL

Using Docker:
```bash
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=portfolio \
  -p 5432:5432 \
  -d postgres:17
```

Or if you already have it running:
```bash
docker start postgres-dev
```

#### Step 2: Verify .env.local

The DATABASE_URL has been added to your `.env.local`:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/portfolio"
```

#### Step 3: Restart Dev Server
```bash
# Stop your current server (Ctrl+C)
npm run dev
```

#### Step 4: Run Migration

1. Login as admin at http://localhost:3000/auth/login
2. Go to http://localhost:3000/dashboard
3. Click **"Database Management"** button (admin only)
4. Click **"Update Database Schema"**
5. Wait for success message

#### Step 5: Create Your Post

Go back to http://localhost:3000/dashboard/posts/new and create your post!

## 🔧 Troubleshooting

### "Docker is not running"
- Open Docker Desktop application
- Wait for it to fully start (Docker icon in menu bar should be steady)
- Run `docker info` to verify it's working

### "Connection refused"
- Make sure PostgreSQL container is running: `docker ps`
- If not listed, start it: `docker start postgres-dev`
- Check port 5432 is not in use by another process

### "Permission denied" on setup-db.sh
```bash
chmod +x setup-db.sh
```

### "Failed to migrate database"
- Check if database exists: `docker exec -it postgres-dev psql -U postgres -l`
- Verify DATABASE_URL in .env.local matches your database
- Check server logs for detailed error messages

### Still having issues?
1. Stop the container: `docker stop postgres-dev`
2. Remove it: `docker rm postgres-dev`
3. Run setup script again: `./setup-db.sh`

## 📊 Database Schema Changes

The migration adds these columns to `blog_posts` table:

```sql
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'general';

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS featured_image TEXT;
```

## 🎯 What's Next?

After migration is complete:
1. ✅ Create blog posts with categories
2. ✅ Add featured images to posts
3. ✅ Use the rich text editor
4. ✅ Publish to the magazine-style blog page

## 📝 Database Commands Reference

```bash
# View running containers
docker ps

# Start PostgreSQL
docker start postgres-dev

# Stop PostgreSQL  
docker stop postgres-dev

# View logs
docker logs postgres-dev

# Access PostgreSQL CLI
docker exec -it postgres-dev psql -U postgres -d portfolio

# Remove container (data will be lost)
docker rm -f postgres-dev
```

## 🔐 Database Credentials

**Host:** localhost  
**Port:** 5432  
**Database:** portfolio  
**Username:** postgres  
**Password:** password  

⚠️ **Note:** These are development credentials. Use secure credentials in production!

## 💡 Pro Tips

1. The migration is **safe to run multiple times** - it checks if columns exist first
2. Your existing blog posts won't be affected - new columns are added gracefully
3. The "Database Management" page is **admin-only** for security
4. You can always view your database using: `npm run db:studio`

## 🚀 Ready to Go!

Once migration is complete, head to:
- **Dashboard:** http://localhost:3000/dashboard
- **Create Post:** http://localhost:3000/dashboard/posts/new
- **View Blog:** http://localhost:3000/blog

Happy blogging! 🎉
