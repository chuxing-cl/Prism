import { onBeforeUnmount, ref } from "vue"

export function useAutoRefresh(callback: () => void, interval: number) {
  const timer = ref<ReturnType<typeof setInterval> | null>(null)

  function start() {
    stop()
    timer.value = setInterval(callback, interval)
  }

  function stop() {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  onBeforeUnmount(() => stop())

  return { start, stop }
}
