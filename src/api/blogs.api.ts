import { Card } from '@components/CardMasonry/type'
import { request } from '@/request'

function getAllBlogs() {
  return request<Card[]>({
    method: 'GET',
    url: '/blogs',
  })
}

function getNotes() {
  return request<Card[]>({
    method: 'GET',
    url: '/blogs',
    params: {
      type: 'note',
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

export { getAllBlogs, getNotes, getEssays }
