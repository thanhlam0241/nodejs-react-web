import axios from 'axios'
import { baseUrl } from './url'

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

export default instance
