export interface VisitorInfo {
  id: string
  ip: string
  ipInfo: IpInfo
}

interface IpInfo {
  area: number
  city: string
  country: string
  eu: string
  ll: [number, number]
  metro: number
  range: [number, number]
  region: string
  timezone: string
}
