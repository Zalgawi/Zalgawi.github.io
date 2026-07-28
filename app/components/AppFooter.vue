<template>
  <footer class="border-t border-line pt-8 pb-32">
    <div
      class="mx-auto flex max-w-[1180px] flex-wrap justify-between gap-4 px-5 font-mono text-xs text-muted sm:px-8 lg:px-18"
    >
      <span>© {{ new Date().getFullYear() }} Zayd Algawi </span>
      <nav id="contact" class="flex gap-4">
        <a href="mailto:zaydkalgawi@gmail.com" data-nav class="hover:text-ice"
          >Email</a
        >
        <a
          href="https://github.com/Zalgawi"
          target="_blank"
          rel="noopener"
          data-nav
          class="hover:text-ice"
          >GitHub</a
        >
        <a
          href="https://linkedin.com/in/zaydalgawi"
          target="_blank"
          rel="noopener"
          data-nav
          class="hover:text-ice"
          >LinkedIn</a
        >
      </nav>
    </div>
  </footer>
</template>
