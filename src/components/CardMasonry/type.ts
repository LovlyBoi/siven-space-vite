interface CardType {
  tag: { name: string; color: TagColor }
  author: string
  publishDate: string
  updateDate: string
  title: string
  pictures: string[]
  id: number
}

type TagColor = 'yellow' | 'pink' | 'green' | 'indigo'

export type { CardType, TagColor }
