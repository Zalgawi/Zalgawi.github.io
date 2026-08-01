<script setup lang="ts">
const { data: projects } = await useAsyncData("work", () =>
  queryCollection("work").order("order", "ASC").all(),
);

const active = ref<{ title: string; tag: string; path: string } | null>(null);

const pillars = [
  {
    h: "Component architecture",
    p: "Building component libraries that other developers actually enjoy using. Typed APIs, Storybook documentation and migration strategies that keep large codebases moving.",
  },
  {
    h: "Accessibility",
    p: "WCAG-compliant components, real keyboard paths, and media controls that work for people who never touch a mouse. Built in from the start, not audited in at the end.",
  },
  {
    h: "Cross-platform delivery",
    p: "Performance isn't an option, it's the standard. Years of shipping multi-platform applications has made me extra picky when it comes to maximising performance for even the worst and oldest of devices.",
  },
];

const roles = [
  {
    when: "May 2023 — now",
    title: "Front-End Developer",
    org: "Convatec",
    body: "Design system migration, multi-region consent compliance, and accessibility work on a global medical products platform.",
  },
  {
    when: "Jul 2020 — Mar 2023",
    title: "Mid-Level Front-End Developer",
    org: "FX Digital",
    body: "Shipped web and Connected TV apps for global clients. Led retrospectives, ran technical interviews, and onboarded new joiners onto projects.",
  },
  {
    when: "Feb — Apr 2020",
    title: "Junior Web Developer",
    org: "Esperus",
    body: "REST APIs in .NET Core, Razor views, and early custom CMS features.",
  },
  {
    when: "Sep — Dec 2019",
    title: "Software Developer, Intern",
    org: "Transforming Systems",
    body: "React and SASS interfaces, plus API integration work.",
  },
  {
    when: "2016 — 2019",
    title: "BSc Computing, 2:1",
    org: "University of Greenwich",
    body: "Dissertation on modernising patient care with responsive web techniques.",
  },
];

const platforms = [
  "Apple tvOS",
  "Android TV",
  "Samsung Tizen",
  "LG webOS",
  "Xbox",
  "PlayStation",
  "Amazon Fire TV",
  "TCL",
  "Comcast",
];

const now = [
  { k: "Status", v: "Open to mid–senior front-end roles", dot: true },
  { k: "Location", v: "Manchester, UK" },
  {
    k: "Working in",
    v: "TypeScript, Vue, Nuxt, Tailwind, React, React Native and LightningJS",
  },
  {
    k: "Off the clock",
    v: "Bouldering,  Martial Arts, Graphic design, Gaming and all things geeky",
  },
];

const base = useRuntimeConfig().app.baseURL;
const cvHref = (base.endsWith("/") ? base : base + "/") + "zayd-algawi-cv.pdf";

const shell = "mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-18";
const section = `${shell} border-t border-line py-14 md:py-24`;
const eyebrow =
  "eyebrow mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[.18em] text-muted uppercase";
</script>

<template>
  <main>
    <section
      :class="[shell, 'pt-16 pb-12 md:pt-24 md:pb-20 lg:pt-30']"
      data-section
    >
      <p :class="eyebrow">Front-end developer · Manchester</p>
      <h1
        class="display wdth-125 m-0 mb-7 text-[clamp(48px,12vw,132px)] leading-[.86] tracking-tight uppercase"
      >
        Zayd<br />Algawi
      </h1>
      <p
        class="mb-4 max-w-[24ch] text-[clamp(19px,2.4vw,26px)] leading-snug font-medium"
      >
        I build front-ends that
        <strong class="font-semibold text-ice">hold up</strong>.
      </p>

      <p class="mb-9 max-w-[54ch] text-[15.5px] text-muted">
        For the last six years I've been building products that have to work on
        everything - from web to mobile to Connected TV applications running on
        low-powered hardware. I care about delivering the best performance,
        accessibility and intuitive UI's that feel effortless to use.
      </p>
      <div class="flex flex-wrap gap-2.5">
        <a
          href="#work"
          data-nav
          class="rounded-md border border-ice bg-ice px-4.5 py-3 font-mono text-[13px] font-medium text-bg"
          >See the work</a
        >
        <a
          href="#contact"
          data-nav
          class="rounded-md border border-line bg-surface px-4.5 py-3 font-mono text-[13px]"
          >Get in touch</a
        >
        <a
          :href="cvHref"
          target="_blank"
          rel="noopener"
          data-nav
          class="rounded-md border border-line bg-surface px-4.5 py-3 font-mono text-[13px]"
          >Download CV</a
        >
      </div>
    </section>

    <section
      id="about"
      :class="[shell, 'border-t border-line py-8']"
      data-section
    >
      <p :class="eyebrow">Currently</p>
      <dl
        class="m-0 flex flex-wrap gap-6 rounded-xl border border-line bg-surface p-6"
      >
        <div v-for="n in now" :key="n.k" class="flex-1 basis-50">
          <dt
            class="mb-1.5 font-mono text-[10.5px] tracking-[.14em] text-muted uppercase"
          >
            {{ n.k }}
          </dt>
          <dd class="m-0 text-[15px]">
            <span
              v-if="n.dot"
              class="mr-2 inline-block size-1.5 rounded-full bg-emerald-400 align-middle"
            />{{ n.v }}
          </dd>
        </div>
      </dl>
    </section>

    <section :class="section" data-section>
      <p :class="eyebrow">What I do</p>
      <div class="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(p, i) in pillars"
          :key="p.h"
          class="rounded-xl border border-line bg-surface p-6"
          :class="i === 2 && 'sm:col-span-2 lg:col-span-1'"
        >
          <h3 class="display wdth-110 mb-2.5 text-[19px]">{{ p.h }}</h3>
          <p class="text-[14.5px] leading-relaxed text-muted">{{ p.p }}</p>
        </div>
      </div>
    </section>

    <section id="work" :class="section" data-section>
      <p :class="eyebrow">Selected work</p>
      <div class="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="p in projects"
          :key="p.path"
          :path="p.path"
          :title="p.title"
          :tag="p.tag"
          :summary="p.summary"
          :stack="p.stack"
          :image="p.image"
          :brand="p.brand"
          @open="active = { title: p.title, tag: p.tag, path: p.path }"
        />
      </div>
    </section>

    <section id="experience" :class="section" data-section>
      <p :class="eyebrow">Experience</p>
      <div class="border-t border-line">
        <div
          v-for="r in roles"
          :key="r.org"
          class="grid gap-1.5 border-b border-line py-6 sm:grid-cols-[150px_1fr] sm:items-baseline sm:gap-x-7"
        >
          <span class="font-mono text-xs tracking-wide text-muted">{{
            r.when
          }}</span>
          <div>
            <p class="display wdth-110-sm m-0 mb-1.5 text-[18px]">
              {{ r.title }} <em class="not-italic text-ice">· {{ r.org }}</em>
            </p>
            <p class="m-0 text-[14.5px] text-muted">{{ r.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <ProjectModal :project="active" @close="active = null" />
  </main>
</template>
