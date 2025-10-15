import { sanityClient } from './sanity'
import { Post } from './sanity.types'

// GROQ queries
const postFields = `
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  publishedAt,
  seoTitle,
  seoDescription,
  "author": author->{
    _id,
    name,
    slug,
    image,
    bio
  },
  mainImage{
    asset->{
      _id,
      url
    },
    alt,
    hotspot
  },
  "categories": categories[]->{
    _id,
    title,
    slug,
    description
  },
  body
`

const postQuery = `*[_type == "post" && slug.current == $slug][0]{ ${postFields} }`

const postsQuery = `*[_type == "post" && defined(publishedAt)] | order(publishedAt desc){ ${postFields} }`

const publishedPostsQuery = `*[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc){ ${postFields} }`

// Data fetching functions with ISR
export async function getAllPosts(): Promise<Post[]> {
  const posts = await sanityClient.fetch(
    publishedPostsQuery,
    {},
    {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    }
  )
  return posts
}

export async function getPost(slug: string): Promise<Post | null> {
  const post = await sanityClient.fetch(
    postQuery,
    { slug },
    {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    }
  )
  return post
}

export async function getPostSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`,
    {},
    {
      next: { revalidate: 60 }
    }
  )
  return slugs
}

export async function getRecentPosts(limit = 5): Promise<Post[]> {
  const posts = await sanityClient.fetch(
    `*[_type == "post" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc)[0...${limit}]{ ${postFields} }`,
    {},
    {
      next: { revalidate: 60 }
    }
  )
  return posts
}