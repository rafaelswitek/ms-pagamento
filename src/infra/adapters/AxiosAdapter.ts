import axios from 'axios'
import HttpClient from '../../domain/interfaces/HttpClient'

export default class AxiosAdapter implements HttpClient {
  async get(url: string, config?: any): Promise<any> {
    const response = await axios.get(url, config)
    return response.data
  }

  async post(url: string, body: any, config?: any): Promise<any> {
    const response = await axios.post(url, body, config)
    return response.data
  }
}
