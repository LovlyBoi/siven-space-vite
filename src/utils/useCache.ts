export function getChache<T>(key: string, session = false): T {
  const storage = session ? sessionStorage : localStorage
  const value = storage.getItem(key)
  return value && JSON.parse(value)
}

export function setCache<T>(key: string, value: T, session = false) {
  const storage = session ? sessionStorage : localStorage
  const jsonValue = JSON.stringify(value)
  storage.setItem(key, jsonValue)
}
