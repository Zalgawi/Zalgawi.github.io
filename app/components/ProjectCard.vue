<script setup lang="ts">
const props = defineProps<{
  path: string;
  title: string;
  tag: string;
  summary: string;
  stack: string[];
  image?: string;
  brand?: string[];
}>();

const emit = defineEmits<{ open: [] }>();

const assets = import.meta.glob<string>(
  "../assets/*.{jpg,jpeg,png,webp,avif,svg}",
  { eager: true, query: "?url", import: "default" },
);

const imageUrl = computed(() => {
  if (!props.image) return null;
  const hit = Object.entries(assets).find(([p]) =>
    p.endsWith(`/${props.image}`),
  );
  return hit?.[1] ?? null;
});

const isMark = computed(() => !!props.image?.toLowerCase().endsWith(".svg"));
const isPhoto = computed(() => !!imageUrl.value && !isMark.value);

const bgImage = computed(() =>
  imageUrl.value ? `url("${imageUrl.value}")` : undefined,
);

const brandBg = computed(() => {
  const b = props.brand;
  if (!b?.length) return undefined;
  const fill =
    b.length === 1
      ? b[0]
      : `linear-gradient(135deg, ${b[0]} 22%, ${b[1]} 138%)`;
  return `linear-gradient(rgb(3 26 16 / 0.5), rgb(3 26 16 / 0.5)), ${fill}`;
});

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
        class="project-card group relative isolate block overflow-hidden rounded-xl border border-line bg-surface p-6 outline-none transition-colors hover:border-ice/55"
        :class="[brandBg && 'card-brand', isPhoto && 'card-photo']"
        :style="brandBg ? { background: brandBg } : undefined"
        @click="onClick"
      >
        <span
          v-if="isMark && imageUrl"
          class="card-mark absolute inset-0 -z-10 bg-center bg-no-repeat opacity-30 transition-[opacity,scale] duration-900 group-hover:scale-150 group-hover:opacity-45"
          :style="{ backgroundImage: bgImage, backgroundSize: '65% auto' }"
        />
        <template v-else-if="imageUrl">
          <span
            class="card-photo-img absolute inset-0 -z-10 scale-100 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            :style="{ backgroundImage: bgImage }"
          />
          <span class="card-scrim absolute inset-0 -z-10" />
        </template>
        <span
          class="card-tag mb-3 block font-mono text-[10.5px] tracking-[.14em] text-ice uppercase"
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
            class="card-chip rounded border border-line bg-surface-2 px-2 py-1 font-mono text-[10.5px] text-muted"
            >{{ t }}</span
          >
        </div>
      </a>
    </template>
  </NuxtLink>
</template>
