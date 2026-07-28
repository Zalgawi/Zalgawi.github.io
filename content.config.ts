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
        order: z.number().default(99)
      })
    })
  }
})
