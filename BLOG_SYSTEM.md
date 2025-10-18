# Blog System Documentation

## Overview

A complete blog management system has been implemented with the following features:

- **Rich Text Editor**: Full-featured WYSIWYG editor with Tiptap
- **Category Management**: Organize posts by categories
- **Magazine-Style Layout**: Modern, responsive grid layout with featured images
- **User Dashboard**: Manage all your blog posts in one place
- **SEO-Friendly**: Slugs, excerpts, and proper meta information

## Features Implemented

### 1. Rich Text Editor (Tiptap)
Located at: `src/components/editor/tiptap-editor.tsx`

**Formatting Options:**
- **Text Formatting**: Bold, Italic, Underline, Strikethrough, Code
- **Headings**: H1, H2, H3
- **Lists**: Bullet lists, Ordered lists, Blockquotes
- **Alignment**: Left, Center, Right
- **Media**: Images (via URL), Links
- **Tables**: Insertable tables with headers
- **Undo/Redo**: Full history support

### 2. Blog Post Creation/Editing

**Create New Post**: `/dashboard/posts/new`
- Auto-generated slugs from titles
- Category selection (10 categories available)
- Featured image support
- Rich text content editor
- Save as draft or publish immediately
- SEO excerpt field

**Edit Existing Post**: `/dashboard/posts/[id]/edit`
- Load and edit existing posts
- Update publication status
- Delete posts
- All creation features available

### 3. Blog Pages

**Blog Listing**: `/blog`
- Magazine-style grid layout
- Category filtering
- Featured post (first post spans 2 columns)
- Hover effects and animations
- Featured images with category badges
- Responsive design

**Individual Post View**: `/blog/[slug]`
- Clean, readable typography
- Featured image display
- Category badge
- Author information
- Publication date
- Reading time estimate
- Fully formatted content with prose styles

### 4. User Dashboard

**Dashboard**: `/dashboard`
- Statistics: Total posts, Published posts, Draft posts
- Quick create button
- List of all user's posts with status
- Edit and view actions for each post

## Database Schema

Added fields to `blogPosts` table:
```typescript
{
  category: varchar('category', { length: 100 }).default('general'),
  featuredImage: text('featured_image'),
}
```

## API Routes

### User Blog Posts
- `POST /api/user/blog-posts` - Create new post
- `GET /api/user/blog-posts` - Get user's posts
- `GET /api/user/blog-posts/[id]` - Get specific post
- `PUT /api/user/blog-posts/[id]` - Update post
- `DELETE /api/user/blog-posts/[id]` - Delete post

### Public Blog Posts
- `GET /api/blog/posts` - Get all published posts
- `GET /api/blog/posts/[slug]` - Get post by slug

## Categories Available

1. Technology
2. AI & Machine Learning
3. Web Development
4. Mobile Development
5. Cloud Computing
6. DevOps
7. Data Science
8. Cybersecurity
9. Blockchain
10. General

## Getting Started

### 1. Database Migration

Run the following command to apply database schema changes:
```bash
npm run db:push
```

### 2. Create Your First Post

1. Navigate to `/dashboard`
2. Click "Create New Post"
3. Fill in the title (slug auto-generates)
4. Add an excerpt for SEO
5. Select a category
6. (Optional) Add featured image URL
7. Write your content using the rich text editor
8. Click "Publish" or "Save Draft"

### 3. Managing Posts

From the dashboard:
- **View**: Click eye icon to see published post
- **Edit**: Click edit icon to modify post
- **Delete**: Available in edit page

### 4. Blog Features

The blog listing page (`/blog`) includes:
- Category filter buttons at the top
- Grid layout (3 columns on desktop)
- First post featured (spans 2 columns)
- Hover effects with smooth transitions
- Featured images with overlay category badges

## Styling

Custom styles have been added to `src/app/globals.css`:
- Tiptap editor styles (.ProseMirror)
- Typography for headings, lists, blockquotes
- Code blocks and inline code
- Tables
- Images with rounded corners
- Links with primary color

## Technical Details

### Dependencies Installed
- `@tiptap/react` - React wrapper for Tiptap
- `@tiptap/starter-kit` - Basic Tiptap extensions
- `@tiptap/extension-link` - Link support
- `@tiptap/extension-image` - Image support
- `@tiptap/extension-table*` - Table support
- `@tiptap/extension-text-align` - Text alignment
- `@tiptap/extension-underline` - Underline formatting
- `@tailwindcss/typography` - Typography utilities

### File Structure
```
src/
├── app/
│   ├── api/
│   │   ├── blog/posts/
│   │   │   ├── route.ts
│   │   │   └── [slug]/route.ts
│   │   └── user/blog-posts/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── blog/
│   │   ├── page.tsx (listing)
│   │   └── [slug]/page.tsx (individual post)
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── posts/
│   │       ├── new/page.tsx
│   │       └── [id]/edit/page.tsx
│   └── globals.css
├── components/
│   └── editor/
│       └── tiptap-editor.tsx
└── lib/
    └── db/
        └── schema.ts
```

## Best Practices

### Creating Content
1. **Title**: Keep concise and descriptive (60 chars max for SEO)
2. **Slug**: Auto-generated, but editable (use lowercase, hyphens)
3. **Excerpt**: Write compelling 150-160 char summary
4. **Category**: Choose most relevant category
5. **Featured Image**: Use high-quality images (recommended: 1200x630px)
6. **Content**: Use headings for structure, break into paragraphs

### Images in Content
- Use the image button in the editor toolbar
- Paste image URL when prompted
- Images will be responsive and styled automatically

### Links
- Use the link button in the editor toolbar
- Paste full URL including https://
- Links will be styled with primary color

## Troubleshooting

### Database Error
If you get database connection errors:
```bash
# Make sure DATABASE_URL is set in .env.local
npm run db:push
```

### Editor Not Loading
Clear browser cache and reload:
```bash
# Or restart dev server
npm run dev
```

### Styles Not Applied
Make sure globals.css is imported in layout.tsx and rebuild:
```bash
npm run build
npm run dev
```

## Future Enhancements

Potential improvements:
- Image upload functionality (vs. URL only)
- Draft auto-save
- Post scheduling
- Tags in addition to categories
- Comments system
- Social sharing
- Search functionality
- Related posts
- Author profiles
- Analytics

## Support

For issues or questions, refer to:
- Tiptap docs: https://tiptap.dev
- Next.js docs: https://nextjs.org/docs
- Drizzle ORM docs: https://orm.drizzle.team
