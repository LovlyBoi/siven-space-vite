interface CardType {
  tag: { name: string; color: TagColor }
  author: string
  publishDate: string
  updateDate: string
  title: string
  pictures: string[]
  id: number
}

type TagColor = 'yellow' | 'blueGreen' | 'green' | 'orange'

export type { CardType, TagColor }
