import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllPosts } from '@/lib/sanity.queries'
import { getImageUrl } from '@/lib/sanity'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Blog - Harish Kumar Babry',
  description: 'Insights on technology, AI, blockchain, and digital transformation from Harish Kumar Babry',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Exploring the intersection of technology, AI, and human-centered design
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group block"
              >
                <article className="bg-card border border-border rounded-xl p-6 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 h-full">
                  {/* Featured Image */}
                  {post.mainImage && (
                    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={getImageUrl(post.mainImage) || '/placeholder.jpg'}
                        alt={post.mainImage.alt || post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Categories */}
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.map((category) => (
                        <span
                          key={category._id}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {category.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{post.author.name}</span>
                    <time dateTime={post.publishedAt}>
                      {format(new Date(post.publishedAt), 'MMM d, yyyy')}
                    </time>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-display font-semibold mb-4">No posts yet</h2>
            <p className="text-muted-foreground">
              Check back soon for new content!
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export const revalidate = 60 // Revalidate every 60 seconds