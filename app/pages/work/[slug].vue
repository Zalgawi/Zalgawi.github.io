<script setup lang="ts">
const route = useRoute()

const { data: project } = await useAsyncData(`work-${route.params.slug}`, () =>
  queryCollection('work').path(`/work/${route.params.slug}`).first()
)

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case study not found', fatal: true })
}

useSeoMeta({
  title: `${project.value.title} — Zayd Algawi`,
  description: project.value.summary
})
</script>

<template>
  <main v-if="project" class="mx-auto max-w-[760px] px-5 py-14 sm:px-8 md:py-24">
    <NuxtLink to="/#work" data-nav class="mb-8 inline-block font-mono text-[12px] text-muted hover:text-ice">
      ← Back to work
    </NuxtLink>

    <span class="mb-3 block font-mono text-[10.5px] tracking-[.14em] text-ice uppercase">{{ project.tag }}</span>
    <h1 class="display wdth-110 mb-4 text-[clamp(30px,6vw,46px)] tracking-tight">{{ project.title }}</h1>
    <p class="mb-6 text-[17px] text-muted">{{ project.summary }}</p>

    <div class="mb-10 flex flex-wrap gap-1.5">
      <span v-for="t in project.stack" :key="t" class="rounded border border-line bg-surface-2 px-2 py-1 font-mono text-[10.5px] text-muted">{{ t }}</span>
    </div>

    <article class="prose-invert max-w-none [&_h2]:display [&_h2]:wdth-110 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-[22px] [&_p]:mb-4 [&_p]:text-[15.5px] [&_p]:text-muted">
      <ContentRenderer :value="project" />
    </article>
  </main>
</template>
