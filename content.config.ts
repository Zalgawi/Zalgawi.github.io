import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    work: defineCollection({
      type: 'page',
      source: 'work/**.md',
      // Frontmatter is validated, so a typo in a case study fails the build
      // rather than rendering a blank card.
      schema: z.object({
        title: z.string(),
        tag: z.string(),
        summary: z.string(),
        stack: z.array(z.string()),
        year: z.string(),
        // Bare filename of an image in app/assets, e.g. "TTVImage.jpeg".
        // ProjectCard resolves it to a hashed build URL.
        image: z.string().optional(),
        // One hex for a flat card background, two to blend between them.
        brand: z.array(z.string()).min(1).max(2).optional(),
        order: z.number().default(99)
      })
    })
  }
})
