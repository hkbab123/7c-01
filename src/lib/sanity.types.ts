import { PortableTextBlock } from '@portabletext/types'

export interface SanityImageAsset {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  asset: SanityImageAsset
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

export interface Author {
  _id: string
  _type: 'author'
  name: string
  slug: {
    current: string
  }
  image?: SanityImage
  bio?: PortableTextBlock[]
}

export interface Category {
  _id: string
  _type: 'category'
  title: string
  slug: {
    current: string
  }
  description?: string
}

export interface Post {
  _id: string
  _type: 'post'
  _createdAt: string
  _updatedAt: string
  title: string
  slug: {
    current: string
  }
  author: Author
  mainImage?: SanityImage
  categories?: Category[]
  excerpt?: string
  publishedAt: string
  body: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
}