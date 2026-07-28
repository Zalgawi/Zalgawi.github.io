<script setup lang="ts">
import { spatialNavKey } from '~/composables/useSpatialNav'

const nav = useSpatialNav()
provide(spatialNavKey, nav)

// The ring is rendered here and positioned imperatively by the composable,
// so hand it over as soon as the template ref resolves.
const ring = useTemplateRef<HTMLElement>('ring')
watchEffect(() => {
  nav.ringEl.value = ring.value ?? null
})
</script>

<template>
  <div>
    <AppHeader />
    <NuxtPage />
    <AppFooter />

    <div ref="ring" class="focus-ring" aria-hidden="true" />
    <TvRemote />
  </div>
</template>
