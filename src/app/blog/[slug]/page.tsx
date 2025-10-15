import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { format } from 'date-fns'

import { getPost, getPostSlugs } from '@/lib/sanity.queries'
import { getImageUrl } from '@/lib/sanity'
import { Post } from '@/lib/sanity.types'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await getPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt || `Read "${post.title}" by ${post.author.name}`,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.mainImage ? [getImageUrl(post.mainImage)!] : [],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      type: 'article',
    },
  }
}

// Portable Text components for rich content
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = getImageUrl(value)
      if (!imageUrl) return null
      
      return (
        <div className="relative w-full h-96 my-8 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={value.alt || 'Blog post image'}
            fill
            className="object-cover"
          />
          {value.alt && (
            <p className="text-sm text-muted-foreground text-center mt-2 italic">
              {value.alt}
            </p>
          )}
        </div>
      )
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-display font-bold mb-6 mt-8">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-display font-bold mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-display font-semibold mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-display font-semibold mb-3 mt-6">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-primary pl-6 my-6 text-lg italic text-muted-foreground">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-primary hover:text-primary/80 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
  },
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Back Navigation */}
        <Link 
          href="/blog"
          className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          ← Back to Blog
        </Link>

        <article>
          {/* Header */}
          <header className="mb-12">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Meta */}
            <div className="flex items-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={getImageUrl(post.author.image)!}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <span className="font-medium">{post.author.name}</span>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
              </time>
            </div>

            {/* Featured Image */}
            {post.mainImage && (
              <div className="relative w-full h-96 rounded-xl overflow-hidden mb-12">
                <Image
                  src={getImageUrl(post.mainImage)!}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <PortableText 
              value={post.body} 
              components={portableTextComponents}
            />
          </div>

          {/* Author Bio */}
          {post.author.bio && (
            <div className="mt-16 p-8 bg-secondary/20 rounded-xl">
              <h3 className="text-xl font-display font-semibold mb-4">About the Author</h3>
              <div className="flex items-start gap-4">
                {post.author.image && (
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={getImageUrl(post.author.image)!}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold mb-2">{post.author.name}</h4>
                  <div className="text-muted-foreground">
                    <PortableText value={post.author.bio} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}

export const revalidate = 60 // Revalidate every 60 seconds