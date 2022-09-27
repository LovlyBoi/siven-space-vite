import { request } from '@/request'
import type { Card, Blog } from '@/types'

function getAllBlogs(ps = 10, pn = 1) {
  return request<Card[]>({
    method: 'GET',
    url: '/blogs',
    params: {
      ps,
      pn,
    },
  })
}

function getNotes(ps = 10, pn = 1) {
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

function getEssays() {
  return request<Card[]>({
    method: 'GET',
    url: '/blogs',
    params: {
      type: 'essay',
    },
  })
}

function getBlogById(id: string) {
  return request<Blog>({
    method: 'GET',
    url: `/blogs/${id}`,
  })
}

export { getAllBlogs, getNotes, getEssays, getBlogById }
