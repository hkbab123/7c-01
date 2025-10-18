# Coolify Production Deployment Guide

## 📋 Prerequisites

- Coolify instance running on your VPS
- PostgreSQL 17 service created in Coolify
- Your Next.js app connected to Coolify

## 🗄️ Step 1: Get Your PostgreSQL Connection Details

In Coolify dashboard:

1. Go to your **PostgreSQL service**
2. Find the connection details:
   ```
   Host: postgres-servicename (internal) or your-vps-ip (external)
   Port: 5432
   Database: your_database_name
   Username: postgres (or your username)
   Password: [shown in Coolify]
   ```

3. Construct your DATABASE_URL:
   ```bash
   # Internal (recommended - faster, more secure)
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@postgres-servicename:5432/your_database"
   
   # External (if services are on different servers)
   DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@your-vps-ip:5432/your_database"
   ```

## 🔧 Step 2: Configure Environment Variables in Coolify

1. Go to your **Next.js application** in Coolify
2. Navigate to **Environment Variables**
3. Add the following variables:

```bash
# Database
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@postgres-host:5432/your_database

# NextAuth (if not already set)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-secure-secret-here

# Any other existing variables
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-15
```

4. Save and redeploy

## 🚀 Step 3: Run Database Migration (3 Methods)

### Method 1: Admin Web UI (Easiest)

1. Deploy your application
2. Visit: `https://yourdomain.com/auth/login`
3. Login as admin
4. Go to: `https://yourdomain.com/dashboard/admin/db`
5. Click **"Update Database Schema"**
6. Wait for success message ✅

**Pros:**
- No SSH access needed
- Visual feedback
- Safe to run multiple times
- Works from anywhere

**Cons:**
- Requires admin login
- Needs app to be deployed first

### Method 2: Coolify Terminal

1. In Coolify dashboard, go to your app
2. Click **"Terminal"** or **"Execute Command"**
3. Run:
   ```bash
   npm run db:push
   ```

**Pros:**
- Direct access
- Fast

**Cons:**
- Requires Coolify UI access
- Command line only

### Method 3: SSH into VPS

1. SSH into your server:
   ```bash
   ssh user@your-vps-ip
   ```

2. Find your app container:
   ```bash
   docker ps | grep your-app-name
   ```

3. Execute migration:
   ```bash
   docker exec -it CONTAINER_ID npm run db:push
   ```

**Pros:**
- Full control
- Can troubleshoot easily

**Cons:**
- Requires SSH access
- More complex

## 🔄 Step 4: Verify Migration

After running migration, verify it worked:

### Option A: Check via Admin UI
Visit `https://yourdomain.com/dashboard/admin/db` and you should see:
- ✅ "Database schema is already up to date"

### Option B: Check via PostgreSQL
```bash
# Connect to PostgreSQL
docker exec -it postgres-container psql -U postgres -d your_database

# Check if columns exist
\d blog_posts

# Should show:
# - category | character varying(100) | default 'general'
# - featured_image | text |
```

## 📊 Database Schema Migration Details

The migration adds these columns to `blog_posts` table:

```sql
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'general';

ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS featured_image TEXT;
```

**Safe to run multiple times** - Uses `IF NOT EXISTS` to prevent errors.

## 🔒 Security Best Practices

### 1. Secure Your Admin Routes

The admin database page is protected by:
```typescript
if (!session || (session.user as any)?.role !== "admin") {
  return unauthorized
}
```

Make sure your admin user has `role: "admin"` in the database.

### 2. Use Internal Networking

In Coolify, use internal service names for DATABASE_URL:
```bash
# ✅ Good - Internal network
DATABASE_URL="postgresql://postgres:pwd@postgres-service:5432/db"

# ⚠️ Less secure - External IP
DATABASE_URL="postgresql://postgres:pwd@1.2.3.4:5432/db"
```

### 3. Strong Passwords

Generate a strong password for production PostgreSQL:
```bash
openssl rand -base64 32
```

### 4. Backup Before Migration

```bash
# In Coolify or via SSH
docker exec postgres-container pg_dump -U postgres your_database > backup.sql
```

## 🐛 Troubleshooting

### "Connection refused" or "Could not connect to database"

**Check 1:** Verify DATABASE_URL is set correctly
```bash
# In Coolify terminal
echo $DATABASE_URL
```

**Check 2:** Verify PostgreSQL is running
```bash
docker ps | grep postgres
```

**Check 3:** Test connection manually
```bash
docker exec -it postgres-container psql -U postgres -d your_database
```

### "Permission denied" or "Unauthorized"

**Solution:** Make sure you're logged in as admin:
1. Check your user in database has `role = 'admin'`
2. Update if needed:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```

### "Column already exists"

**This is fine!** The migration checks for existing columns. If you see this, it means the migration already ran successfully.

### Migration runs but blog posts still fail

**Check:**
1. Restart your application in Coolify
2. Clear application cache
3. Verify columns exist:
   ```sql
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'blog_posts' 
   AND column_name IN ('category', 'featured_image');
   ```

## 🔄 Development to Production Workflow

### Recommended Workflow:

1. **Local Development:**
   ```bash
   # Test migration locally first
   ./setup-db.sh
   npm run dev
   # Visit localhost:3000/dashboard/admin/db
   # Run migration
   # Test blog post creation
   ```

2. **Commit and Push:**
   ```bash
   git add .
   git commit -m "Add blog system with category and featured image"
   git push origin main
   ```

3. **Coolify Auto-Deploy:**
   - Coolify detects push and rebuilds
   - App deploys with new code

4. **Run Production Migration:**
   - Visit yourdomain.com/dashboard/admin/db
   - Run migration
   - Test blog post creation

## 📝 Environment Variables Checklist

Before deploying, ensure these are set in Coolify:

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXTAUTH_URL` - Your domain (e.g., https://yourdomain.com)
- [ ] `NEXTAUTH_SECRET` - Random secure string
- [ ] Any Sanity CMS variables (if used)

## 🎯 Quick Start Commands

```bash
# Local development setup
./setup-db.sh
npm run dev

# Check if PostgreSQL is running (Coolify)
docker ps | grep postgres

# View PostgreSQL logs (Coolify)
docker logs postgres-container-name

# Backup database
docker exec postgres-container pg_dump -U postgres dbname > backup.sql

# Restore database
docker exec -i postgres-container psql -U postgres dbname < backup.sql
```

## 🔗 Useful Links

- **Admin Database Page:** `https://yourdomain.com/dashboard/admin/db`
- **Dashboard:** `https://yourdomain.com/dashboard`
- **Blog:** `https://yourdomain.com/blog`
- **Create Post:** `https://yourdomain.com/dashboard/posts/new`

## 💡 Pro Tips

1. **Always test locally first** before running migrations in production
2. **Backup your database** before any schema changes
3. **Use the web UI** for migrations - it's safer and provides better feedback
4. **Monitor your logs** during deployment to catch issues early
5. **Keep your local and production schemas in sync** by running the same migrations

## 🆘 Need Help?

If you encounter issues:

1. Check Coolify logs: Application → Logs
2. Check PostgreSQL logs: `docker logs postgres-container`
3. Verify environment variables are set correctly
4. Try the migration again (it's safe to retry)
5. SSH in and manually check the database schema

---

**Remember:** The beauty of this system is that it works identically in both local and production environments thanks to environment variables! 🎉
