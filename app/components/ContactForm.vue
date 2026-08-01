<script setup lang="ts">
const { email, copied, copyEmail } = useContactEmail();

const form = reactive({
  name: "",
  email: "",
  company: "",
  message: "",
});

const mailtoHref = computed(() => {
  const body = [
    `Name: ${form.name}`,
    form.company && `Company: ${form.company}`,
    `Email: ${form.email}`,
    "",
    form.message,
  ]
    .filter(Boolean)
    .join("\n");

  const q = new URLSearchParams({
    subject: "Zayd A. Portfolio Enquiry",
    body,
  });
  return `mailto:${email}?${q.toString().replace(/\+/g, "%20")}`;
});

function sendMessage() {
  window.location.href = mailtoHref.value;
}

const fieldLabel =
  "mb-1.5 block font-mono text-[10.5px] tracking-[.14em] text-muted uppercase";
const field =
  "w-full rounded-md border border-line bg-surface-2 px-3.5 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-ice";
</script>

<template>
  <form
    class="rounded-xl border border-line bg-surface p-6 md:p-8"
    @submit.prevent="sendMessage"
  >
    <div class="mb-4 grid gap-4 sm:grid-cols-2">
      <div>
        <label :class="fieldLabel" for="cf-name">Your name</label>
        <input
          id="cf-name"
          v-model="form.name"
          required
          autocomplete="name"
          placeholder="Daniel Saint"
          data-nav
          :class="field"
        />
      </div>
      <div>
        <label :class="fieldLabel" for="cf-email">Email</label>
        <input
          id="cf-email"
          v-model="form.email"
          type="email"
          required
          autocomplete="email"
          placeholder="dan@company.com"
          data-nav
          :class="field"
        />
      </div>
    </div>

    <div class="mb-4">
      <label :class="fieldLabel" for="cf-company"
        >Company <span class="text-muted/70">(optional)</span></label
      >
      <input
        id="cf-company"
        v-model="form.company"
        autocomplete="organization"
        placeholder="Apple"
        data-nav
        :class="field"
      />
    </div>

    <div class="mb-6">
      <label :class="fieldLabel" for="cf-message">Your message</label>
      <textarea
        id="cf-message"
        v-model="form.message"
        required
        rows="6"
        placeholder="Talk to me..."
        data-nav
        :class="[field, 'resize-y']"
      />
    </div>

    <button
      type="submit"
      data-nav
      class="w-full rounded-md border border-ice bg-ice px-4.5 py-3.5 font-mono text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
    >
      Send message →
    </button>
    <p class="mt-3 text-center font-mono text-[11px] text-muted">
      Opens in your mail app. No mail app?
      <a
        :href="`mailto:${email}`"
        data-nav
        class="text-ice underline underline-offset-2"
        @click="copyEmail"
        >{{ copied ? "Email copied" : "Copy my address" }}</a
      >
    </p>
  </form>
</template>
