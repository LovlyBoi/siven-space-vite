import Masonry from 'masonry-layout'

interface MasonryOptions {
  itemSelector?: string
  columnWidth?: number
  gutter?: number
  fitWidth?: boolean
}

export function useMasonry(selector: string, payload: MasonryOptions = {}) {
  new Masonry(selector, payload)
}