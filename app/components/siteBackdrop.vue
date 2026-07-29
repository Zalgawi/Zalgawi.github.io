<script setup lang="ts">
let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty(
      "--scroll-y",
      String(window.scrollY),
    );
    ticking = false;
  });
}

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  window.addEventListener("scroll", onScroll, { passive: true });
});

onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <!-- Class names are prefixed b-* deliberately: `ring` is a real Tailwind
       utility and would have painted a 1px box-shadow on every circle. -->
  <div class="backdrop" aria-hidden="true">
    <i class="b-rect s1 f-ice" />
    <i class="b-round s2 f-amb" />
    <i class="b-round s3 f-ice" />
    <i class="b-pill s4 f-neu" />

    <i class="b-round s5 f-ice2" />
    <i class="b-round s6 f-amb" />
    <i class="b-rect s7 f-neu" />
    <i class="b-round s8 f-ice" />

    <i class="b-rect s9 f-ice2" />
    <i class="b-round s10 f-amb" />
    <i class="b-pill s11 f-neu" />
    <i class="b-round s12 f-ice" />
  </div>
</template>
