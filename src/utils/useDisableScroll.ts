export default function () {
  const rootEl = document.querySelector('html')
  if (rootEl) {
    rootEl.style.overflow = 'hidden'
  }
  return function () {
    if (rootEl) {
      rootEl.style.overflow = 'visible'
    }
  }
}
