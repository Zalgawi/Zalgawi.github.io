<script setup lang="ts">
const open = ref(false);
const colorMode = useColorMode();

const links = [
  { to: "/#about", label: "About" },
  { to: "/#work", label: "Work" },
  { to: "/#experience", label: "Experience" },
  { to: "/#contact", label: "Contact" },
];

const isDark = computed(() => colorMode.value === "dark");
function toggleTheme() {
  colorMode.preference = isDark.value ? "light" : "dark";
}

onMounted(() => {
  const mq = window.matchMedia("(min-width: 768px)");
  const close = (e: MediaQueryListEvent) => {
    if (e.matches) open.value = false;
  };
  mq.addEventListener("change", close);
  onUnmounted(() => mq.removeEventListener("change", close));
});
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-lg"
  >
    <div
      class="mx-auto flex max-w-[1180px] items-center gap-3 px-5 py-3.5 sm:px-8 lg:px-18"
    >
      <NuxtLink
        to="/"
        class="display wdth-125 rounded-md border border-line px-2 py-1 text-[17px]"
      >
        ZA
      </NuxtLink>

      <nav class="ml-auto hidden md:flex md:gap-0.5">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="rounded-md px-3 py-1.5 text-sm text-muted hover:bg-surface-2 hover:text-ink"
        >
          {{ l.label }}
        </NuxtLink>
      </nav>

      <ClientOnly>
        <button
          type="button"
          :aria-label="
            isDark ? 'Switch to light theme' : 'Switch to dark theme'
          "
          class="ml-auto grid size-9.5 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-[15px] text-ink hover:border-ice md:ml-0"
          @click="toggleTheme"
        >
          {{ isDark ? "☾" : "☀" }}
        </button>
        <template #fallback>
          <div
            class="ml-auto size-9.5 shrink-0 rounded-lg border border-line bg-surface-2 md:ml-0"
          />
        </template>
      </ClientOnly>

      <button
        type="button"
        :aria-label="open ? 'Close menu' : 'Open menu'"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        class="grid size-9.5 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-ink hover:border-ice md:hidden"
        @click="open = !open"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path v-if="open" d="M6 6l12 12M18 6L6 18" />
          <path v-else d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>

    <nav
      v-show="open"
      id="mobile-menu"
      class="border-t border-line bg-bg md:hidden"
    >
      <div class="mx-auto flex max-w-[1180px] flex-col px-5 py-2 sm:px-8">
        <NuxtLink
          v-for="(l, i) in links"
          :key="l.to"
          :to="l.to"
          class="py-3 text-[15px] text-muted hover:text-ink"
          :class="i < links.length - 1 && 'border-b border-line/60'"
          @click="open = false"
        >
          {{ l.label }}
        </NuxtLink>
      </div>
    </nav>
  </header>
</template>
