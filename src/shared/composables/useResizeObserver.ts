import { ref, onMounted, onBeforeUnmount } from "vue"

export function useResizeObserver(elRef: import("vue").Ref<HTMLElement | null>) {
  const width = ref(0)
  const height = ref(0)

  let observer: ResizeObserver | null = null

  onMounted(() => {
    if (!elRef.value) return
    const rect = elRef.value.getBoundingClientRect()
    width.value = rect.width
    height.value = rect.height

    observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width.value = entry.contentRect.width
        height.value = entry.contentRect.height
      }
    })
    observer.observe(elRef.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  return { width, height }
}
