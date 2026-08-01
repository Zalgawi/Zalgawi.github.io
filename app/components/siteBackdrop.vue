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

    <i class="b-round s13 f-amb" />
    <i class="b-pill s14 f-ice2" />
    <i class="b-rect s15 f-neu" />
    <i class="b-round s16 f-ice" />

    <i class="b-round s17 f-ice2" />
    <i class="b-rect s18 f-amb" />
    <i class="b-round s19 f-neu" />
    <i class="b-pill s20 f-ice" />

    <i class="b-round s21 f-amb" />
    <i class="b-rect s22 f-ice2" />
    <i class="b-round s23 f-neu" />
    <i class="b-rect s24 f-ice" />

    <i class="b-round s25 f-ice" />
    <i class="b-pill s26 f-amb" />
    <i class="b-rect s27 f-ice2" />
    <i class="b-round s28 f-neu" />

    <i class="b-round s29 f-amb" />
    <i class="b-rect s30 f-ice" />
    <i class="b-pill s31 f-neu" />
    <i class="b-round s32 f-ice2" />

    <i class="b-round s33 f-ice" />
    <i class="b-rect s34 f-amb" />
    <i class="b-round s35 f-neu" />
    <i class="b-pill s36 f-ice2" />
  </div>
</template>
