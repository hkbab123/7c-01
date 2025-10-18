# Dashboard Structure

## 📁 Directory Layout

```
app/
├── layout.tsx                    # Root layout with CSS & SessionProvider
├── globals.css                   # Tailwind CSS & custom styles
├── admin/
│   └── dashboard/
│       ├── layout.tsx           # Admin sidebar layout
│       ├── page.tsx             # Admin dashboard home
│       ├── manage-users/
│       │   └── page.tsx
│       ├── database-tools/
│       │   └── page.tsx
│       ├── manage-posts/
│       │   ├── page.tsx
│       │   └── categories/
│       │       └── page.tsx
│       └── sevenc-admin/
│           └── page.tsx
├── dashboard/                   # User dashboard
│   ├── layout.tsx              # User sidebar layout
│   ├── page.tsx                # User dashboard home
│   ├── manage-account/
│   │   ├── page.tsx
│   │   ├── profile-picture/
│   │   │   └── page.tsx
│   │   ├── personal-profile/
│   │   │   └── page.tsx
│   │   └── author-bio/
│   │       └── page.tsx
│   ├── sevenc/
│   │   └── page.tsx
│   └── blog/
│       └── page.tsx
├── auth/
│   └── signin/
│       └── page.tsx            # Sign-in page
└── api/
    └── auth/
        └── [...nextauth]/
            └── route.ts        # NextAuth configuration

src/
├── components/
│   ├── dashboard/
│   │   └── sidebar-layout.tsx # Reusable sidebar component
│   └── providers.tsx           # SessionProvider wrapper
└── lib/
    ├── utils.ts                # cn() utility
    └── dashboard-redirect.ts   # Role-based redirect helper
```

## 🌐 Routes

### Admin Portal
- `/admin/dashboard` - Admin home
- `/admin/dashboard/manage-users` - User management
- `/admin/dashboard/database-tools` - Database tools
- `/admin/dashboard/manage-posts` - Post management
- `/admin/dashboard/manage-posts/categories` - Category management
- `/admin/dashboard/sevenc-admin` - 7C Admin

### User Portal
- `/dashboard` - User home
- `/dashboard/manage-account` - Account settings
- `/dashboard/manage-account/profile-picture` - Avatar upload
- `/dashboard/manage-account/personal-profile` - Username & password
- `/dashboard/manage-account/author-bio` - Author biography
- `/dashboard/sevenc` - 7C Dashboard
- `/dashboard/blog` - Blog management

### Authentication
- `/auth/signin` - Sign-in page

## 🔐 Authentication

### Test Credentials
```
Admin: admin@example.com / admin123
User:  user@example.com / user123
```

### Auto-redirect after login
- Admin users → `/admin/dashboard`
- Regular users → `/dashboard`

## 🎨 Styling

- **Framework**: Tailwind CSS v4
- **Fonts**: Inter (body), Space Grotesk (display)
- **Theme**: Dark mode by default
- **Color System**: CSS custom properties for theming

## 🔧 Configuration Files

- `tailwind.config.ts` - Tailwind configuration
- `postcss.config.mjs` - PostCSS with Tailwind plugin
- `tsconfig.json` - TypeScript paths (`@/*` → `./src/*`)
- `.env.local` - Environment variables (NEXTAUTH_SECRET, DATABASE_URL)

## 🚀 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit:
- Admin: http://localhost:3000/admin/dashboard
- User: http://localhost:3000/dashboard
- Sign-in: http://localhost:3000/auth/signin

## ✨ Features

✅ Role-based dashboards (Admin/User)  
✅ Collapsible sidebar with nested navigation  
✅ Active route highlighting  
✅ NextAuth v5 authentication  
✅ Session-based access control  
✅ Responsive design  
✅ Dark mode support  
✅ TypeScript throughout  
✅ Reusable components  

## 📝 Next Steps

1. **Connect Database**: Replace mock users in NextAuth with real DB queries
2. **Add Middleware Protection**: Uncomment middleware.ts to protect routes
3. **Implement Features**: Add real functionality to each dashboard page
4. **Add Forms**: Create forms for user/post management
5. **Add Tables**: Implement data tables with sorting/filtering
6. **Deploy**: Push to Vercel or your preferred platform
