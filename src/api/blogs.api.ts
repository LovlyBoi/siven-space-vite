import { request } from '@/request'
import type { Card, Blog } from '@/types'

export function getAllBlogs(ps = 10, pn = 1) {
  return request<Card[]>({
    method: 'GET',
    url: '/blogs',
    params: {
      ps,
      pn,
    },
  })
}

export function getNotes(ps = 10, pn = 1) {
  return request<Card[]>({
    method: 'GET',
    url: '/blogs',
    params: {
      type: 'note',
      ps,
      pn,
    },
  })
}

export function getEssays() {
  return request<Card[]>({
    method: 'GET',
    url: '/blogs',
    params: {
      type: 'essay',
    },
  })
}

export function getBlogById(id: string) {
  return request<Blog>({
    method: 'GET',
    url: `/blogs/${id}`,
  })
}
