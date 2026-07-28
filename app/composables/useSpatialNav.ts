/**
 * Geometric focus navigation — the same shape of logic a TV focus engine
 * uses. Instead of following DOM order like Tab does, it picks the nearest
 * element in the direction you actually pressed.
 *
 * Any element carrying `data-nav` joins the graph. Native focus is left
 * intact so Tab, screen readers and Enter all behave normally; the ring is
 * a decoration that follows focus rather than replacing it.
 */

type Direction = 'up' | 'down' | 'left' | 'right'

/** Off-axis drift is penalised so a near-straight neighbour wins over a
 *  closer diagonal one. Tuned by feel — raise it to make travel stricter. */
const OFF_AXIS_PENALTY = 2.4

/** Ignore candidates within this many px on the travel axis, so elements
 *  that merely share an edge aren't treated as being "in that direction". */
const AXIS_DEADZONE = 12

export function useSpatialNav() {
  const current = shallowRef<HTMLElement | null>(null)
  const ringEl = shallowRef<HTMLElement | null>(null)
  const isBlocked = shallowRef(false)

  const reduceMotion = () =>
    import.meta.client &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function items(): HTMLElement[] {
    if (!import.meta.client) return []
    return Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav]')
    ).filter((el) => {
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    })
  }

  function place(animate = false) {
    const ring = ringEl.value
    if (!ring) return

    const el = current.value
    if (!el) {
      ring.classList.remove('is-on')
      return
    }

    const r = el.getBoundingClientRect()
    ring.classList.toggle('is-animated', animate)
    ring.style.width = `${r.width + 10}px`
    ring.style.height = `${r.height + 10}px`
    ring.style.transform = `translate(${r.left - 5}px, ${r.top - 5}px)`
    ring.classList.add('is-on')
  }

  function focusEl(el: HTMLElement | null, animate = false): boolean {
    if (!el) return false
    current.value = el
    el.focus({ preventScroll: true })

    const r = el.getBoundingClientRect()
    if (r.top < 90 || r.bottom > window.innerHeight - 30) {
      el.scrollIntoView({
        block: 'center',
        behavior: reduceMotion() ? 'auto' : 'smooth'
      })
    }
    place(animate)
    return true
  }

  function nextInDirection(from: HTMLElement, dir: Direction) {
    const a = from.getBoundingClientRect()
    const ax = a.left + a.width / 2
    const ay = a.top + a.height / 2

    let best: HTMLElement | null = null
    let bestScore = Infinity

    for (const el of items()) {
      if (el === from) continue

      const b = el.getBoundingClientRect()
      const dx = b.left + b.width / 2 - ax
      const dy = b.top + b.height / 2 - ay

      let along: number
      let off: number

      if (dir === 'right') {
        if (dx < AXIS_DEADZONE) continue
        along = dx; off = Math.abs(dy)
      } else if (dir === 'left') {
        if (dx > -AXIS_DEADZONE) continue
        along = -dx; off = Math.abs(dy)
      } else if (dir === 'down') {
        if (dy < AXIS_DEADZONE) continue
        along = dy; off = Math.abs(dx)
      } else {
        if (dy > -AXIS_DEADZONE) continue
        along = -dy; off = Math.abs(dx)
      }

      const score = along + off * OFF_AXIS_PENALTY
      if (score < bestScore) {
        bestScore = score
        best = el
      }
    }
    return best
  }

  function move(dir: Direction): boolean {
    if (isBlocked.value) return false

    const list = items()
    if (!list.length) return false

    const el = current.value
    if (!el || !list.includes(el)) {
      const entry = list.find((n) => n.getBoundingClientRect().top > 60) ?? list[0]
      return focusEl(entry ?? null, false)
    }
    return focusEl(nextInDirection(el, dir), true)
  }

  function exit() {
    current.value?.blur()
    current.value = null
    place(false)
  }

  function jumpSection(delta: 1 | -1): boolean {
    const list = Array.from(
      document.querySelectorAll<HTMLElement>('[data-section]')
    )
    if (!list.length) return false

    let idx = list.findIndex((s) => s.getBoundingClientRect().top > 80)
    if (idx === -1) idx = list.length

    const target = delta > 0 ? idx : idx - 2
    if (target < 0 || target >= list.length) return false

    list[target]!.scrollIntoView({
      behavior: reduceMotion() ? 'auto' : 'smooth',
      block: 'start'
    })
    return true
  }

  const KEYS: Record<string, Direction> = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right'
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      exit()
      return
    }
    const dir = KEYS[e.key]
    if (!dir || e.metaKey || e.ctrlKey || e.altKey) return

    // Only swallow the key if focus actually moved, so the page still
    // scrolls normally when there's nothing in that direction.
    if (move(dir)) e.preventDefault()
  }

  function onFocusIn(e: FocusEvent) {
    const t = e.target as HTMLElement
    if (t?.hasAttribute?.('data-nav')) {
      current.value = t
      place(true)
    }
  }

  function onPointerDown(e: PointerEvent) {
    const t = e.target as HTMLElement
    if (t.closest('.dock, [data-nav], dialog, header')) return
    exit()
  }

  let ticking = false
  function onScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      place(false)
      ticking = false
    })
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown)
    document.removeEventListener('focusin', onFocusIn)
    document.removeEventListener('pointerdown', onPointerDown)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
  })

  return { current, ringEl, isBlocked, move, exit, jumpSection, place, focusEl }
}

export type SpatialNav = ReturnType<typeof useSpatialNav>

/** Injection key so the remote and the page drive the *same* nav instance.
 *  Module-scope singletons would leak between requests under SSR. */
export const spatialNavKey = Symbol('spatialNav') as InjectionKey<SpatialNav>
