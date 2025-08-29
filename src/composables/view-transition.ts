export function safelyStartViewTransition(callback: () => void) {
  if (document.startViewTransition) {
    document.startViewTransition(callback)
  }
  else {
    callback()
  }
}
