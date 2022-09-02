export default function (): () => void {
  const rootEl = document.querySelector('html')
  if (rootEl) {
    rootEl.style.overflow = 'hidden'
  }
  return function () {
    if (rootEl) {
      rootEl.style.overflow = 'auto'
    }
  }
}
