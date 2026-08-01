export const CONTACT_EMAIL = "zaydkalgawi@gmail.com";

// A bare mailto: dies silently on any machine with no registered mail handler —
// the browser opens a blank tab and that's it. Callers keep the mailto href so
// people who do have a mail client get the native behaviour; the copy is the
// fallback for everyone else, and `copied` is what tells them it happened.
export function useContactEmail() {
  const copied = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      // Denied clipboard permission or an insecure origin. The mailto still
      // fires, so there's nothing useful to say here.
      return;
    }
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 2000);
  }

  onBeforeUnmount(() => clearTimeout(timer));

  return { email: CONTACT_EMAIL, copied, copyEmail };
}
