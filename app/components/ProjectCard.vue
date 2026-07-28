<script setup lang="ts">
defineProps<{
  path: string;
  title: string;
  tag: string;
  summary: string;
  stack: string[];
}>();

const emit = defineEmits<{ open: [] }>();

function onClick(e: MouseEvent) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  if (e.button !== 0) return;

  e.preventDefault();
  emit("open");
}
</script>

<template>
  <NuxtLink :to="path" custom>
    <template #default="{ href }">
      <a
        :href="href"
        data-nav
        class="block rounded-xl border border-line bg-surface p-6 outline-none transition-colors hover:border-ice/55"
        @click="onClick"
      >
        <span
          class="mb-3 block font-mono text-[10.5px] tracking-[.14em] text-ice uppercase"
          >{{ tag }}</span
        >
        <h3 class="display wdth-110 mb-2 text-[21px] tracking-tight">
          {{ title }}
        </h3>
        <p class="mb-4 text-[14.5px] leading-relaxed text-muted">
          {{ summary }}
        </p>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="t in stack"
            :key="t"
            class="rounded border border-line bg-surface-2 px-2 py-1 font-mono text-[10.5px] text-muted"
            >{{ t }}</span
          >
        </div>
      </a>
    </template>
  </NuxtLink>
</template>
