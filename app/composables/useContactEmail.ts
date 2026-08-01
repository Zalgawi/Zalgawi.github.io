export const CONTACT_EMAIL = "zaydkalgawi@gmail.com";

export function useContactEmail() {
  const copied = ref(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      return;
    }
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 2000);
  }

  onBeforeUnmount(() => clearTimeout(timer));

  return { email: CONTACT_EMAIL, copied, copyEmail };
}
