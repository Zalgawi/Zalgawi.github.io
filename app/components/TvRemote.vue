<script setup lang="ts">
import { spatialNavKey } from "~/composables/useSpatialNav";

const nav = inject(spatialNavKey)!;
const colorMode = useColorMode();

const closed = ref(true);
const hintOpen = ref(false);
const hintRetired = ref(false);
let hintTimer: ReturnType<typeof setTimeout> | null = null;

const isDark = computed(() => colorMode.value === "dark");
const pressed = ref<string | null>(null);
const missed = ref<string | null>(null);

function showHint(delay: number) {
  if (hintRetired.value) return;
  if (hintTimer) clearTimeout(hintTimer);
  hintTimer = setTimeout(() => {
    if (hintRetired.value || !closed.value) return;
    hintOpen.value = true;
    hintTimer = setTimeout(() => (hintOpen.value = false), 7000);
  }, delay);
}

function retireHint() {
  hintRetired.value = true;
  hintOpen.value = false;
  if (hintTimer) clearTimeout(hintTimer);
}

function setDock(open: boolean) {
  if (open) retireHint();
  else showHint(600);
  closed.value = !open;
}

function flash(id: string, ok: boolean) {
  if (ok) pressed.value = id;
  else missed.value = id;
  setTimeout(() => {
    pressed.value = null;
    missed.value = null;
  }, 170);
}

function press(id: string) {
  let ok = true;
  if (id === "enter") {
    ok = !!nav.current.value;
    nav.current.value?.click();
  } else if (id === "up" || id === "down" || id === "left" || id === "right") {
    ok = nav.move(id);
  } else if (id === "back") {
    ok = !!nav.current.value;
    nav.exit();
  } else if (id === "home") {
    nav.exit();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else if (id === "prev") {
    ok = nav.jumpSection(-1);
  } else if (id === "next") {
    ok = nav.jumpSection(1);
  } else if (id === "theme") {
    colorMode.preference = isDark.value ? "light" : "dark";
  }
  flash(id, ok);
}

function scrollToTop() {
  nav.exit();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function cls(id: string) {
  return [pressed.value === id && "is-lit", missed.value === id && "is-dead"];
}

function onKey(e: KeyboardEvent) {
  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
    retireHint();
}

onMounted(() => {
  showHint(1400);
  window.addEventListener("keydown", onKey);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  if (hintTimer) clearTimeout(hintTimer);
});
</script>

<template>
  <div
    class="dock fixed right-4 bottom-4 z-[70] sm:right-6 sm:bottom-6"
    :class="[closed && 'is-closed', nav.current.value && 'is-live']"
  >
    <div
      class="remote rem-body w-29 rounded-[30px] border px-3 pt-3 pb-4"
      role="group"
      aria-label="Navigation remote"
    >
      <div class="mb-2.5 flex h-4.5 items-center justify-between px-1">
        <span class="led rem-line size-1.5 rounded-full transition-all" />
        <button
          type="button"
          aria-label="Hide the navigation remote"
          class="grid size-4.5 place-items-center rounded-full text-[11px] leading-none text-muted hover:text-ink"
          @click="setDock(false)"
        >
          ✕
        </button>
      </div>

      <div
        class="rem-key mx-auto grid size-23 grid-cols-[1fr_36px_1fr] grid-rows-[1fr_36px_1fr] overflow-hidden rounded-full border"
      >
        <button
          type="button"
          aria-label="Move focus up"
          class="pad-btn col-span-3 grid items-end justify-items-center pb-1 text-[9px] text-muted hover:text-ink"
          :class="cls('up')"
          @pointerdown.prevent
          @click="press('up')"
        >
          ▲
        </button>
        <button
          type="button"
          aria-label="Move focus left"
          class="pad-btn grid items-center justify-items-end pr-1 text-[9px] text-muted hover:text-ink"
          :class="cls('left')"
          @pointerdown.prevent
          @click="press('left')"
        >
          ◀
        </button>
        <button
          type="button"
          aria-label="Select focused item"
          class="rem-ok grid place-items-center rounded-full font-mono text-[9px] text-muted hover:text-ink"
          :class="cls('enter')"
          @pointerdown.prevent
          @click="press('enter')"
        >
          OK
        </button>
        <button
          type="button"
          aria-label="Move focus right"
          class="pad-btn grid items-center justify-items-start pl-1 text-[9px] text-muted hover:text-ink"
          :class="cls('right')"
          @pointerdown.prevent
          @click="press('right')"
        >
          ▶
        </button>
        <button
          type="button"
          aria-label="Move focus down"
          class="pad-btn col-span-3 grid items-start justify-items-center pt-1 text-[9px] text-muted hover:text-ink"
          :class="cls('down')"
          @pointerdown.prevent
          @click="press('down')"
        >
          ▼
        </button>
      </div>

      <div class="mt-3 flex justify-center gap-2">
        <button
          type="button"
          aria-label="Clear focus"
          class="rem-key grid size-8.5 place-items-center rounded-full border text-xs text-muted hover:text-ink"
          :class="cls('back')"
          @pointerdown.prevent
          @click="press('back')"
        >
          ↩
        </button>
        <button
          type="button"
          aria-label="Back to top"
          class="rem-key grid size-8.5 place-items-center rounded-full border text-xs text-muted hover:text-ink"
          :class="cls('home')"
          @pointerdown.prevent
          @click="press('home')"
        >
          ⌂
        </button>
      </div>

      <div
        class="rem-key mx-auto mt-3 w-8.5 overflow-hidden rounded-full border"
        role="group"
        aria-label="Jump between sections"
      >
        <button
          type="button"
          aria-label="Previous section"
          class="pad-btn grid h-7.5 w-full place-items-center text-[11px] text-muted hover:text-ink"
          :class="cls('prev')"
          @pointerdown.prevent
          @click="press('prev')"
        >
          ⌃
        </button>
        <div class="rem-line h-px" />
        <button
          type="button"
          aria-label="Next section"
          class="pad-btn grid h-7.5 w-full place-items-center text-[11px] text-muted hover:text-ink"
          :class="cls('next')"
          @pointerdown.prevent
          @click="press('next')"
        >
          ⌄
        </button>
      </div>

      <div class="mt-3 flex justify-center">
        <ClientOnly>
          <button
            type="button"
            :aria-label="
              isDark ? 'Switch to light theme' : 'Switch to dark theme'
            "
            class="rem-key grid size-8.5 place-items-center rounded-full border text-xs text-muted hover:text-ink"
            :class="cls('theme')"
            @pointerdown.prevent
            @click="press('theme')"
          >
            {{ isDark ? "☾" : "☀" }}
          </button>
        </ClientOnly>
      </div>

      <p
        class="mt-3.5 text-center font-mono text-[8px] tracking-[.22em] text-muted/40"
      >
        ZA
      </p>
    </div>

    <div
      class="hint pointer-events-none absolute right-[60px] bottom-[3px] z-[2] w-max max-w-37 rounded-[10px] bg-amber px-3 py-2.5 text-[#0A0F18] shadow-lg after:absolute after:-right-1 after:bottom-[18px] after:size-2.5 after:rotate-45 after:rounded-[1px] after:bg-amber after:content-['']"
      :class="hintOpen && 'is-open'"
      aria-hidden="true"
    >
      <b class="display wdth-110 block text-[13px] leading-tight"
        >Pass the remote!</b
      >
    </div>

    <div class="absolute right-0 bottom-0 flex flex-col items-center gap-2">
      <button
        type="button"
        aria-label="Scroll to top"
        class="fab rem-body grid size-11.5 place-items-center rounded-full border text-muted hover:text-amber"
        @click="scrollToTop"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Show the navigation remote"
        :aria-expanded="!closed"
        class="fab rem-body grid size-11.5 place-items-center rounded-full border text-muted hover:text-amber"
        @click="setDock(true)"
      >
        <svg
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linejoin="round"
        >
          <path d="M9.5 3h5v6.5H21v5h-6.5V21h-5v-6.5H3v-5h6.5z" />
        </svg>
      </button>
    </div>
  </div>
</template>
