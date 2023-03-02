interface Card {
  id: string
  title: string
  author: string
  type: BlogType
  tag: { name: string; color: TagColor }
  publishDate: string
  updateDate: string
  pictures: string[]
}

type TagColor = 'yellow' | 'pink' | 'green' | 'indigo'

enum BlogType {
  'meat-dish' = 1,
  'vegetable-dish',
  'staple',
  'dessert',
  'drink',
  'soup',
}

interface OutlineItem {
  anchor: string
  depth: number
  title: string
}

// 大纲
type Outline = OutlineItem[]

interface ParsedHtml {
  outline: Outline
  html: string
}

interface Blog extends Card {
  parsed: ParsedHtml
}

export { BlogType }
export type { Card, TagColor, OutlineItem, Outline, ParsedHtml, Blog }
