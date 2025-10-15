import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
}

// Set up the client for fetching data in the getProps page functions
export const sanityClient = createClient(config)

// Set up a helper function for generating Image URLs with only the asset reference data in your documents.
const builder = imageUrlBuilder(sanityClient)

export const urlFor = (source: any) => {
  return builder.image(source)
}

// Helper to get image URL
export function getImageUrl(source: any) {
  if (!source?.asset?._ref) {
    return undefined
  }
  return urlFor(source).url()
}