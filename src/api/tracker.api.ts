import { request } from '@/request'
import { VisitorInfo } from '@/types'

export function getVisitorId() {
  return request<VisitorInfo>({
    url: '/tracker/getId',
    method: 'GET',
  })
}

export function getPv() {
  return request({
    url: '/tracker/getPv',
    method: 'GET',
  })
}
