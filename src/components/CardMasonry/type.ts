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
  'note' = 1,
  'essay' = 2,
}

export type { Card, TagColor, BlogType }
