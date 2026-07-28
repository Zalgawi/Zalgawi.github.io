<script setup lang="ts">
import { spatialNavKey } from '~/composables/useSpatialNav'

const props = defineProps<{
  project: { title: string; tag: string; path: string } | null
}>()
const emit = defineEmits<{ close: [] }>()

const nav = inject(spatialNavKey)!
const dialog = useTemplateRef<HTMLDialogElement>('dialog')
let opener: HTMLElement | null = null

watch(
  () => props.project,
  (p) => {
    const el = dialog.value
    if (!el) return
    if (p) {
      opener = document.activeElement as HTMLElement
      // <dialog> inerts the background, so stop arrow keys driving it too.
      nav.isBlocked.value = true
      el.showModal()
    } else if (el.open) {
      el.close()
    }
  }
)

function onClose() {
  nav.isBlocked.value = false
  emit('close')
  // Hand focus back to the card they came from.
  if (opener?.isConnected) nav.focusEl(opener, false)
  opener = null
}
</script>

<template>
  <!-- showModal() gives Esc, focus trapping and background inerting for free. -->
  <dialog
    ref="dialog"
    aria-labelledby="modal-title"
    class="m-auto w-[min(560px,calc(100vw-2rem))] rounded-2xl border border-line bg-surface p-0 text-ink"
    @close="onClose"
    @click.self="dialog?.close()"
  >
    <div v-if="project" class="p-6 sm:p-8">
      <div class="mb-5 flex items-start justify-between gap-4">
        <div>
          <span class="mb-2 block font-mono text-[10.5px] tracking-[.14em] text-ice uppercase">{{ project.tag }}</span>
          <h2 id="modal-title" class="display wdth-110 m-0 text-[24px] tracking-tight">{{ project.title }}</h2>
        </div>
        <button
          type="button"
          aria-label="Close"
          class="grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-muted hover:text-ink"
          @click="dialog?.close()"
        >✕</button>
      </div>

      <div class="grid min-h-45 place-items-center rounded-xl border border-dashed border-line">
        <p class="m-0 font-mono text-[11px] tracking-[.14em] text-muted uppercase">Case study — coming soon</p>
      </div>
    </div>
  </dialog>
</template>
