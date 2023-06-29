import { request } from '@/request'
import type { Card, Blog, BlogType } from '@/types'

export function getAllBlogs(ps = 10, pn = 1) {
  return request<{ cards: Card[]; hasNext: boolean }>({
    method: 'GET',
    url: '/blogs',
    params: {
      ps,
      pn,
    },
  })
}

export function getRecommend(visitorId: string) {
  return request<Card[]>({
    method: 'GET',
    url: '/blogs/recommend',
    params: {
      visitorId,
    },
  })
}

// export function getNotes(ps = 10, pn = 1) {
//   return request<Card[]>({
//     method: 'GET',
//     url: '/blogs',
//     params: {
//       type: 'note',
//       ps,
//       pn,
//     },
//   })
// }

// export function getEssays() {
//   return request<Card[]>({
//     method: 'GET',
//     url: '/blogs',
//     params: {
//       type: 'essay',
//     },
//   })
// }

export function getBlogsByType(type: string) {
  return request<{ cards: Card[]; hasNext: boolean }>({
    method: 'GET',
    url: '/blogs',
    params: {
      type,
    },
  })
}

export function getBlogById(id: string, visitorId?: string) {
  return request<Blog>({
    method: 'POST',
    url: `/blogs/article/${id}`,
    params: {
      visitorId,
    },
  })
}
