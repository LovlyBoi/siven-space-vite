import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  timeout: 60 * 1000,
  baseURL: import.meta.env.VITE_AXIOS_BASEURL,
})

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  const { data } = await instance.request<T>(config)
  return data
}

export { request }
