import { BloomFilter } from 'bloomfilter'

const filter = new BloomFilter(1000 * 20, 8)

export function useBloomFilter() {
  return filter
}
