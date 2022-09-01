import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  timeout: 200,
  baseURL: import.meta.env.VITE_AXIOS_BASEURL,
})

// instance.interceptors.response.use((response) => response.data)

async function request<T>(config: AxiosRequestConfig): Promise<T> {
  // try {
  //   const { data } = await instance.request<T>(config)
  //   return data
  // } catch(e) {
  //   return e
  // }
  const { data } = await instance.request<T>(config)
  return data
}

export { request }
