import { CardType } from '@components/CardMasonry/type'
import { request } from '@/request'

function getAllBlogs() {
  return request<CardType[]>({
    method: 'GET',
    url: '/blogs'
  })
}

export {
  getAllBlogs,
}
