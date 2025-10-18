#!/bin/bash

echo "🚀 Setting up PostgreSQL for local development..."
echo ""

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker Desktop first."
  exit 1
fi

# Check if postgres-dev container already exists
if [ "$(docker ps -aq -f name=postgres-dev)" ]; then
  echo "📦 Found existing postgres-dev container"
  
  # Check if it's running
  if [ "$(docker ps -q -f name=postgres-dev)" ]; then
    echo "✅ PostgreSQL is already running!"
  else
    echo "🔄 Starting existing PostgreSQL container..."
    docker start postgres-dev
    echo "✅ PostgreSQL started successfully!"
  fi
else
  echo "📦 Creating new PostgreSQL container..."
  docker run --name postgres-dev \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_DB=portfolio \
    -p 5432:5432 \
    -d postgres:17
  
  echo "⏳ Waiting for PostgreSQL to be ready..."
  sleep 3
  echo "✅ PostgreSQL created and started successfully!"
fi

echo ""
echo "📝 Database Connection Details:"
echo "   Host: localhost"
echo "   Port: 5432"
echo "   Database: portfolio"
echo "   Username: postgres"
echo "   Password: password"
echo ""

# Check if .env.local exists and has DATABASE_URL
if [ -f .env.local ]; then
  if grep -q "DATABASE_URL" .env.local; then
    echo "✅ DATABASE_URL already exists in .env.local"
  else
    echo "📝 Adding DATABASE_URL to .env.local..."
    echo "" >> .env.local
    echo "# Database Connection" >> .env.local
    echo "DATABASE_URL=\"postgresql://postgres:password@localhost:5432/portfolio\"" >> .env.local
    echo "✅ DATABASE_URL added to .env.local"
  fi
else
  echo "📝 Creating .env.local with DATABASE_URL..."
  echo "DATABASE_URL=\"postgresql://postgres:password@localhost:5432/portfolio\"" > .env.local
  echo "✅ .env.local created with DATABASE_URL"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Restart your dev server: npm run dev"
echo "2. Login as admin at: http://localhost:3000/auth/login"
echo "3. Go to: http://localhost:3000/dashboard/admin/db"
echo "4. Click 'Update Database Schema' to run the migration"
echo ""
echo "To stop PostgreSQL: docker stop postgres-dev"
echo "To start PostgreSQL: docker start postgres-dev"
echo "To remove PostgreSQL: docker rm -f postgres-dev"
