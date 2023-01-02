import axios, { AxiosHeaders } from 'axios'

const headers = new AxiosHeaders()
headers.set('X-Custom-Header', 'foobar')

const config = {
  baseURL: 'https://mockbin.org/',
  timeout: 10000,
  headers,
}

const instance = axios.create(config)

async function get(path: string) {
  return instance.get(path)
}

export const HttpService = {
  get,
}
